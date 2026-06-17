"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BUBBLES, GROUPS } from "./groups";
import { LinkButton } from "./linkPill";
import { SpeechBubble } from "./speechBubble";

/** How long each group stays fully visible before the next cross-fades in (ms). */
const CYCLE_INTERVAL = 3500;

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
    <>
      {/* example column: link pill + cross-fading example image */}
      <div ref={ref} className="absolute left-0 right-60 bottom-44">
        <div className="relative">
          {GROUPS.map((g, i) => {
            const visible = i === active;
            return (
              <div
                key={g.key}
                aria-hidden={!visible}
                className={`flex flex-col items-end gap-2 transition-opacity duration-700 ${
                  visible ? "" : "pointer-events-none absolute inset-0"
                }`}
                style={{ opacity: visible ? 1 : 0 }}
              >
                <div className="relative flex w-full justify-end">
                  <LinkButton
                    link={g.link}
                    interactive={visible}
                    onHoverChange={setPaused}
                  />
                </div>

                <div
                  className="relative aspect-3/2 h-auto w-full overflow-hidden rounded-[10px] border-2"
                  style={{ borderColor: g.example.border }}
                >
                  <Image
                    src={g.example.src}
                    alt={g.example.alt}
                    fill
                    className="select-none object-cover"
                  />
                </div>
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
    </>
  );
}
