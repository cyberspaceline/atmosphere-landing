"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GlassCard } from "./card";

export function WhatIsAtmosphere() {
  return (
    <div id="what-is-atmosphere" className="relative -mx-12 mt-32 h-screen">
      <div className="flex flex-col items-center text-center gap-6 px-12 pt-24">
        <h2>The Atmosphere is an ecosystem</h2>
        <div className="flex flex-col gap-3">
          <p className="large-text">
            Real people, friends, and neighbors, <br />
            and a network of social apps connecting them.
          </p>
          <p className="large-text">Connecting you.</p>
        </div>
      </div>

      <div className="townWrapper absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none ">
        <div className="townImages relative w-[60vw] max-w-[900px] aspect-[2004/1648] mt-32">
          <Image
            src="/what-is-atmosphere/town-bg.png"
            alt=""
            fill
            sizes="60vw"
            className="townBG object-contain object-bottom select-none pointer-events-none"
            priority
          />

          <Image
            src="/what-is-atmosphere/town-fg.png"
            alt=""
            fill
            sizes="60vw"
            className="townFG object-contain object-bottom select-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}

export function InterconnectedAtmosphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    let snapTimer: ReturnType<typeof setTimeout> | null = null;
    let snapReleaseTimer: ReturnType<typeof setTimeout> | null = null;
    let isSnapping = false;

    const measure = () => {
      const el = containerRef.current;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return null;
      return {
        p: -rect.top / total,
        total,
        sectionTopDoc: window.scrollY + rect.top,
      };
    };

    const update = () => {
      const m = measure();
      if (!m) return;
      setProgress(Math.max(0, Math.min(1, m.p)));
    };

    const ADVANCE = 1 / 60;

    const trySnap = () => {
      const m = measure();
      if (!m) return;
      if (m.p < -0.05) return;

      let target: number;
      if (m.p < ADVANCE) target = 0;
      else if (m.p < 1 / 3 + ADVANCE) target = 1 / 3;
      else if (m.p < 2 / 3 + ADVANCE) target = 2 / 3;
      else return;

      const targetY = Math.round(m.sectionTopDoc + target * m.total);
      if (Math.abs(targetY - window.scrollY) <= 2) return;

      isSnapping = true;
      window.scrollTo({ top: targetY, behavior: "smooth" });
      if (snapReleaseTimer) clearTimeout(snapReleaseTimer);
      snapReleaseTimer = setTimeout(() => {
        isSnapping = false;
      }, 700);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
      if (isSnapping) return;
      if (snapTimer) clearTimeout(snapTimer);
      snapTimer = setTimeout(trySnap, 180);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      if (snapTimer) clearTimeout(snapTimer);
      if (snapReleaseTimer) clearTimeout(snapReleaseTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const p1 = Math.min(1, progress * 3);
  const p2 = Math.max(0, Math.min(1, progress * 3 - 1));

  const skyOpacity = p1 * (1 - p2);
  const skyTranslate = (1 - p1) * 12 + p2 * -12;

  const forestOpacity = p2;
  const forestTranslate = (1 - p2) * 12;

  return (
    <div
      id="what-is-atmosphere"
      ref={containerRef}
      className="relative -mx-12 mt-32"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="flex flex-col items-center text-center gap-3 px-12 pt-24">
          <h2>
            In the Atmosphere, the world is always changing,
            <br /> but you will always be you
          </h2>
          <p className="large-text">
            Finally making social life on the internet
            <br />
            as seamless and fluid as the real world
          </p>
        </div>

        <div className="townWrapper absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none ">
          <div className="townImages relative w-[60vw] max-w-[900px] aspect-[2004/1648] mt-32">
            <Image
              src="/what-is-atmosphere/town-bg.png"
              alt=""
              fill
              sizes="60vw"
              className="townBG object-contain object-bottom select-none pointer-events-none"
              priority
            />
            {forest(forestOpacity, forestTranslate)}

            <Image
              src="/what-is-atmosphere/town-fg.png"
              alt=""
              fill
              sizes="60vw"
              className="townFG object-contain object-bottom select-none pointer-events-none"
            />
            {sky(skyOpacity, skyTranslate)}
          </div>
        </div>
      </div>
    </div>
  );
}
function sky(skyOpacity: number, skyTranslate: number) {
  return (
    <div className="sky absolute inset-0 ">
      <Image
        src="/what-is-atmosphere/sky.png"
        alt=""
        fill
        sizes="60vw"
        className="object-contain object-bottom select-none pointer-events-none"
        style={{
          opacity: skyOpacity,
          transform: `translateY(${skyTranslate}%)`,
          willChange: "opacity, transform",
        }}
      />
      <div
        className="absolute -top-[4px] right-[182px] z-50"
        style={{
          opacity: skyOpacity,
          transform: `translateY(${skyTranslate}%)`,
          willChange: "opacity, transform",
        }}
      >
        <GlassCard>
          <p className="text-center">Blacksky Content Here </p>
        </GlassCard>
      </div>
      <div
        className="absolute top-[143px] left-[110px] z-50"
        style={{
          opacity: skyOpacity,
          transform: `translateY(${skyTranslate}%)`,
          willChange: "opacity, transform",
        }}
      >
        <GlassCard>
          {" "}
          <p className="text-center">Bluesky Content Here </p>
        </GlassCard>{" "}
      </div>
    </div>
  );
}

function forest(forestOpacity: number, forestTranslate: number) {
  return (
    <div className="forest absolute inset-0 ">
      <Image
        src="/what-is-atmosphere/forest.png"
        alt=""
        fill
        sizes="60vw"
        className="object-contain object-bottom select-none pointer-events-none"
        style={{
          opacity: forestOpacity,
          transform: `translateY(${forestTranslate}%)`,
          willChange: "opacity, transform",
        }}
      />
      <div
        className="absolute bottom-[180px] left-[205px] z-50"
        style={{
          opacity: forestOpacity,
          transform: `translateY(${forestTranslate}%)`,
          willChange: "opacity, transform",
        }}
      >
        <GlassCard>
          <p className="text-center">Leaflet Content Here </p>
        </GlassCard>{" "}
      </div>
      <div
        className="absolute bottom-[240px] right-[32px] z-50"
        style={{
          opacity: forestOpacity,
          transform: `translateY(${forestTranslate}%)`,
          willChange: "opacity, transform",
        }}
      >
        <GlassCard>
          {" "}
          <p className="text-center">Pckt Content Here </p>
        </GlassCard>{" "}
      </div>
      <div
        className="absolute top-[6px] left-[156px] z-50"
        style={{
          opacity: forestOpacity,
          transform: `translateY(${forestTranslate}%)`,
          willChange: "opacity, transform",
        }}
      >
        <GlassCard>
          {" "}
          <p className="text-center">Offprint Content Here </p>
        </GlassCard>
      </div>
    </div>
  );
}
