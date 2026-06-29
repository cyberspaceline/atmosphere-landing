"use client";

import { useEffect, useState } from "react";
import { apps } from "@/components/atmosphere-apps/apps";
import { GlassCard } from "@/components/card";
import { FLOAT_CLASS, floatStyle } from "@/lib/float";

const CLOUD_HEIGHT = 480;
/** Cloud spans the page minus a 48px gutter each side, capped at 1400px. */
const MAX_CLOUD_WIDTH = 1400;
const PAGE_MARGIN = 48;

// Approximate card footprint, used to normalise spacing during layout.
const CARD_W = 192;
const CARD_H = 140;
/** How many random spots each card tries before settling on the best one. */
const CANDIDATES_PER_CARD = 25;

type Placement = {
  x: number;
  y: number;
  /** Vertical drift in px (negative floats up). */
  distance: number;
  /** Seconds for one bob cycle. */
  duration: number;
  /** Negative offset so cards don't all start mid-air together. */
  delay: number;
};

// Distance between two spots, measured in card-widths/-heights so the
// wider-than-tall cards end up evenly spaced in both axes rather than
// clumping horizontally.
function spacing(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = (a.x - b.x) / CARD_W;
  const dy = (a.y - b.y) / CARD_H;
  return Math.hypot(dx, dy);
}

// Mitchell's best-candidate sampling: for each card, throw several random
// darts and keep the one sitting farthest from every card placed so far.
// This yields blue-noise — random, but evenly spaced and organic rather than
// gridded. Each card also gets its own float so neighbours drift out of sync.
function buildPlacements(width: number): Placement[] {
  const maxX = Math.max(0, width - CARD_W);
  const maxY = Math.max(0, CLOUD_HEIGHT - CARD_H);
  const placed: Placement[] = [];

  for (let i = 0; i < apps.length; i++) {
    let best = { x: Math.random() * maxX, y: Math.random() * maxY };
    let bestNearest = -Infinity;

    for (let c = 0; c < CANDIDATES_PER_CARD; c++) {
      const candidate = { x: Math.random() * maxX, y: Math.random() * maxY };
      // Distance to the closest already-placed card (Infinity for the first).
      let nearest = Infinity;
      for (const p of placed) nearest = Math.min(nearest, spacing(candidate, p));
      if (nearest > bestNearest) {
        bestNearest = nearest;
        best = candidate;
      }
    }

    placed.push({
      ...best,
      distance: -(10 + Math.random() * 6),
      duration: 4.8 + Math.random() * 2,
      delay: -(Math.random() * 3.6),
    });
  }

  return placed;
}

export const AppCloud = () => {
  const [width, setWidth] = useState(0);
  const [placements, setPlacements] = useState<Placement[]>([]);

  // Resolve the cloud width from the viewport (client-only to avoid a
  // hydration mismatch from random/measured values).
  useEffect(() => {
    const measure = () =>
      setWidth(Math.min(MAX_CLOUD_WIDTH, window.innerWidth - PAGE_MARGIN * 2));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (width > 0) setPlacements(buildPlacements(width));
  }, [width]);

  return (
    <div
      className="relative w-full overflow-visible"
      style={{ height: CLOUD_HEIGHT }}
    >
      <div
        className="relative mx-auto"
        style={{ width: width || undefined, maxWidth: "100%", height: CLOUD_HEIGHT }}
      >
        {placements.map((pos, i) => {
          const app = apps[i];
          const Logo = app.logo;
          return (
            <div
              key={app.name}
              className="group absolute hover:z-50"
              style={{ left: pos.x, top: pos.y }}
            >
              <div
                className={FLOAT_CLASS}
                style={floatStyle({
                  distance: `${pos.distance}px`,
                  duration: `${pos.duration}s`,
                  delay: `${pos.delay}s`,
                })}
              >
                <div className="origin-center transition-transform duration-300 ease-out group-hover:scale-[1.18]">
                  <GlassCard>
                    <div className="flex flex-col justify-center text-center">
                      <div className="mx-auto mb-1">
                        <Logo size={32} />
                      </div>
                      <h4 className=" font-bold">{app.name}</h4>
                      <p className="text-[.8rem] leading-snug">
                        {app.description}
                      </p>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
