"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BUBBLES, GROUPS } from "./groups";
import { LinkPill } from "./linkPill";
import { SpeechBubble } from "./speechBubble";

/** How long each group stays fully visible before the next cross-fades in (ms). */
const CYCLE_INTERVAL = 4500;

/**
 * The linked app groups that float above the town. They cross-fade in sequence
 * while the section is in view, pausing whenever the user hovers a link pill.
 * The avatars and bubbles hold their positions — only the example image, link
 * pill, and bubble copy change between groups.
 */
export function FriendGroups() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Track when the section is on screen so the sequence only plays in view.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Advance through the groups while in view; hovering a link pill pauses it.
  useEffect(() => {
    if (!inView || paused) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % GROUPS.length),
      CYCLE_INTERVAL,
    );
    return () => clearInterval(id);
  }, [inView, paused]);

  return (
    <div
      ref={ref}
      className="absolute right-[3vw] top-[14%] z-30 aspect-[796/593] w-[min(49.75rem,58vw)] pointer-events-none"
    >
      {/* example column: link pill + cross-fading example image */}
      <div className="absolute left-0 top-0 flex w-[74%] flex-col items-end gap-2">
        <div className="relative flex h-[30px] w-full justify-end">
          {GROUPS.map((g, i) => {
            const visible = i === active;
            return (
              <div
                key={g.key}
                aria-hidden={!visible}
                className="absolute right-0 top-0 transition-opacity duration-700"
                style={{ opacity: visible ? 1 : 0 }}
              >
                <LinkPill
                  link={g.link}
                  interactive={visible}
                  onHoverChange={setPaused}
                />
              </div>
            );
          })}
        </div>

        <div className="relative aspect-[589/394] w-full">
          {GROUPS.map((g, i) => {
            const visible = i === active;
            return (
              <div
                key={g.key}
                aria-hidden={!visible}
                className="absolute inset-0 overflow-hidden rounded-[10px] border-2 transition-opacity duration-700"
                style={{ opacity: visible ? 1 : 0, borderColor: g.example.border }}
              >
                <Image
                  src={g.example.src}
                  alt={g.example.alt}
                  fill
                  sizes="(max-width: 768px) 74vw, 600px"
                  className="select-none object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* the three fixed bubbles, each cross-fading its own copy */}
      {BUBBLES.map((bubble) => (
        <SpeechBubble
          key={bubble.key}
          bubble={bubble}
          groups={GROUPS}
          active={active}
        />
      ))}
    </div>
  );
}
