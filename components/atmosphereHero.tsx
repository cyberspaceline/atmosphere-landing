"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Proximity tuning — easy to adjust.
 * The closer the mouse gets to a letter's center, the more it (and its
 * shadow) move. At/over ACTIVATION_RADIUS away the glyph sits at rest;
 * at zero distance it reaches its maximum displacement.
 */
const ACTIVATION_RADIUS = 200; // px from the letter center where movement starts
const MAX_LETTER_LIFT = 48; // px the letter rises at zero distance
const MAX_SHADOW_SHIFT = 27; // px the shadow slides (x & y) at zero distance
// Ease-in exponent: higher keeps the shift subtle out near the edge of the
// radius and ramps it up sharply as the pointer closes on the center.
const SHIFT_FALLOFF = 2.2;
// Per-frame approach toward the target (0..1). Lower = smoother & laggier,
// higher = snappier. This is what restores smoothness without CSS transitions.
const SMOOTHING = 0.18;

// Idle float: while the pointer is away, each letter drifts gently up and down
// within 0..FLOAT_MAX px (the shadow follows by the usual lift ratio). The
// float fades out as the pointer's proximity lift takes over.
const FLOAT_MAX = 12; // px, idle vertical drift range for a letter
const FLOAT_SPEED = 0.6; // base angular speed — higher bobs faster

// Manual nudge added to EVERY measured center (hero %: x of width, y of
// height). The measured centers are the opaque bounding-box midpoints, which
// don't always match the perceived visual center — this one control shifts
// all letters together to land on the visual center.
const CENTER_OFFSET = { x: 0, y: -7 };

/**
 * Animated "ATMOSPHERE" hero. Each glyph ships as two full-frame assets — the
 * 3D letter and its cast shadow — painted in place on a transparent
 * 3567×1823 canvas that matches the whole composition. Because every asset is
 * the full canvas, the layers simply stack on top of each other: no cropping,
 * no per-glyph positioning, so a letter can never be clipped.
 */
type Glyph = {
  id: string;
  letterSrc: string;
  shadowSrc: string;
};

const GLYPHS: Glyph[] = [
  { id: "S", letterSrc: "/atmosphere/letter-S.png", shadowSrc: "/atmosphere/shadow-S.png" },
  { id: "O", letterSrc: "/atmosphere/letter-O.png", shadowSrc: "/atmosphere/shadow-O.png" },
  { id: "M", letterSrc: "/atmosphere/letter-M.png", shadowSrc: "/atmosphere/shadow-M.png" },
  { id: "T", letterSrc: "/atmosphere/letter-T.png", shadowSrc: "/atmosphere/shadow-T.png" },
  { id: "A", letterSrc: "/atmosphere/letter-A.png", shadowSrc: "/atmosphere/shadow-A.png" },
  { id: "E2", letterSrc: "/atmosphere/letter-E2.png", shadowSrc: "/atmosphere/shadow-E2.png" },
  { id: "R", letterSrc: "/atmosphere/letter-R.png", shadowSrc: "/atmosphere/shadow-R.png" },
  { id: "E1", letterSrc: "/atmosphere/letter-E1.png", shadowSrc: "/atmosphere/shadow-E1.png" },
  { id: "H", letterSrc: "/atmosphere/letter-H.png", shadowSrc: "/atmosphere/shadow-H.png" },
  { id: "P", letterSrc: "/atmosphere/letter-P.png", shadowSrc: "/atmosphere/shadow-P.png" },
];

// Two detuned sine waves per glyph (deterministic from index) so each letter
// bobs on its own gentle, non-repeating-looking rhythm.
const FLOAT_PARAMS = GLYPHS.map((_, i) => ({
  f1: FLOAT_SPEED * (0.85 + 0.06 * i),
  f2: FLOAT_SPEED * (1.23 + 0.05 * i),
  p1: i * 1.7,
  p2: i * 2.6 + 0.9,
}));

// Idle vertical drift for glyph i at time t (seconds), in 0..FLOAT_MAX px.
function idleFloat(i: number, t: number): number {
  const fp = FLOAT_PARAMS[i];
  const n = (Math.sin(t * fp.f1 + fp.p1) + Math.sin(t * fp.f2 + fp.p2)) / 2; // -1..1
  return (n * 0.5 + 0.5) * FLOAT_MAX; // 0..FLOAT_MAX
}

// Pointer position relative to the hero, plus the hero's pixel size so we
// can convert each glyph's percentage center into a pixel center.
type Pointer = { x: number; y: number; w: number; h: number };

// Visual center of each glyph in hero % (x of width, y of height), measured
// from the opaque bounding box of each full-canvas letter PNG. Used for the
// proximity math. Regenerate if the letter assets change.
const CENTERS: Record<string, { x: number; y: number }> = {
  S: { x: 73.423, y: 17.937 },
  O: { x: 58.971, y: 24.52 },
  M: { x: 39.123, y: 31.679 },
  T: { x: 27.362, y: 44.185 },
  A: { x: 16.933, y: 45.639 },
  E2: { x: 90.244, y: 45.612 },
  R: { x: 77.937, y: 44.048 },
  E1: { x: 65.587, y: 52.441 },
  H: { x: 50.266, y: 52.441 },
  P: { x: 38.295, y: 64.098 },
};

// Measured center plus the shared manual offset (hero %).
function centerOf(g: Glyph): { x: number; y: number } {
  const c = CENTERS[g.id];
  return { x: c.x + CENTER_OFFSET.x, y: c.y + CENTER_OFFSET.y };
}

/**
 * 0..1 closeness of the pointer to a glyph's center: 1 at zero distance,
 * ramping linearly down to 0 once the pointer is ACTIVATION_RADIUS away.
 */
function proximity(g: Glyph, p: Pointer | null): number {
  if (!p) return 0;
  const c = centerOf(g);
  const cx = (c.x / 100) * p.w;
  const cy = (c.y / 100) * p.h;
  const dist = Math.hypot(p.x - cx, p.y - cy);
  return Math.max(0, 1 - dist / ACTIVATION_RADIUS);
}

// Shape the linear proximity into an ease-in curve so the shift is barely
// noticeable far from the center and grows quickly as the mouse approaches.
function ease(t: number): number {
  return Math.pow(t, SHIFT_FALLOFF);
}

export function AtmosphereHero({ className = "" }: { className?: string }) {
  // Pointer + eased displacement live in refs so mouse motion drives the DOM
  // directly inside a rAF loop, with no per-frame React re-render.
  const targetRef = useRef<Pointer | null>(null);
  const currentRef = useRef<number[]>(GLYPHS.map(() => 0));
  const letterRefs = useRef<(HTMLImageElement | null)[]>([]);
  const shadowRefs = useRef<(HTMLImageElement | null)[]>([]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    targetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      w: rect.width,
      h: rect.height,
    };
  }

  useEffect(() => {
    let raf = 0;
    const SHADOW_RATIO = MAX_SHADOW_SHIFT / MAX_LETTER_LIFT;
    const tick = (ts: number) => {
      const t = ts / 1000; // seconds
      const p = targetRef.current;
      for (let i = 0; i < GLYPHS.length; i++) {
        const goal = ease(proximity(GLYPHS[i], p));
        const cur =
          currentRef.current[i] + (goal - currentRef.current[i]) * SMOOTHING;
        currentRef.current[i] = cur;

        // Hover lift plus the idle float, which fades out as the pointer nears.
        const lift = MAX_LETTER_LIFT * cur + idleFloat(i, t) * (1 - cur);

        const letter = letterRefs.current[i];
        if (letter) {
          letter.style.transform = `translateY(${-lift}px)`;
        }
        const shadow = shadowRefs.current[i];
        if (shadow) {
          const s = -lift * SHADOW_RATIO;
          shadow.style.transform = `translate(${s}px, ${s}px)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ aspectRatio: "3567 / 1823" }}
      aria-label="Atmosphere"
      role="img"
      onMouseMove={handleMove}
      onMouseLeave={() => {
        targetRef.current = null;
      }}
    >
      <div className="absolute -top-[1%] left-[9%] w-[42%]">
        <Image
          alt=""
          src="/atmosphere/the.png"
          aria-hidden
          width={400}
          height={300}
          className=""
        />
      </div>
      <h2 className="absolute bottom-[5%] right-[3%] text-[4rem] w-fit">
        The good vibes internet
      </h2>

      {/* Shadows — full-canvas layers behind every letter */}
      {GLYPHS.map((g, i) => (
        <img
          key={`shadow-${g.id}`}
          ref={(el) => {
            shadowRefs.current[i] = el;
          }}
          alt=""
          src={g.shadowSrc}
          className="absolute inset-0 h-full w-full select-none pointer-events-none"
          draggable={false}
        />
      ))}

      {/* Letters — full-canvas layers stacked on top */}
      {GLYPHS.map((g, i) => (
        <img
          key={`letter-${g.id}`}
          ref={(el) => {
            letterRefs.current[i] = el;
          }}
          alt=""
          src={g.letterSrc}
          className="absolute inset-0 z-10 h-full w-full select-none pointer-events-none"
          draggable={false}
        />
      ))}
    </div>
  );
}
