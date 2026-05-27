"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function WhatIsAtmosphere() {
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
      return { p: -rect.top / total, total, sectionTopDoc: window.scrollY + rect.top };
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

        <div className="absolute inset-x-0 bottom-0 top-[40vh]">
          <Image
            src="/what-is-atmosphere/town-bg.png"
            alt=""
            fill
            sizes="100vw"
            className="object-contain object-bottom select-none pointer-events-none"
            priority
          />
          <Image
            src="/what-is-atmosphere/forest.png"
            alt=""
            fill
            sizes="100vw"
            className="object-contain object-bottom select-none pointer-events-none"
            style={{
              opacity: forestOpacity,
              transform: `translateY(${forestTranslate}%)`,
              willChange: "opacity, transform",
            }}
          />
          <Image
            src="/what-is-atmosphere/town-fg.png"
            alt=""
            fill
            sizes="100vw"
            className="object-contain object-bottom select-none pointer-events-none"
          />
          <Image
            src="/what-is-atmosphere/sky.png"
            alt=""
            fill
            sizes="100vw"
            className="object-contain object-bottom select-none pointer-events-none"
            style={{
              opacity: skyOpacity,
              transform: `translateY(${skyTranslate}%)`,
              willChange: "opacity, transform",
            }}
          />
        </div>
      </div>
    </div>
  );
}
