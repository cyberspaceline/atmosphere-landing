"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/** Scroll distance (px) between fully faded and fully visible. */
const FADE_DISTANCE = 64;

/** Walk up the DOM to find the nearest scrollable ancestor, if any. */
function getScrollParent(node: HTMLElement | null): HTMLElement | null {
  let el = node?.parentElement ?? null;
  while (el) {
    const overflowY = getComputedStyle(el).overflowY;
    if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

type FadeInProps = {
  children: ReactNode;
  className?: string;
  /** Element to render as. Defaults to a div. */
  as?: ElementType;
  /** Fade in once and stay visible — never fade back out. */
  noFadeOut?: boolean;
} & Record<string, unknown>;

export function FadeIn({
  children,
  className = "",
  as,
  noFadeOut = false,
  ...rest
}: FadeInProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect users who prefer reduced motion — show statically.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.style.opacity = "1";
      return;
    }

    // scroll-snap-align doesn't change, so resolve the snap edge once.
    const align = getComputedStyle(node).scrollSnapAlign.split(" ")[0];

    // Scrolling may happen on the window or on a scrollable ancestor
    // (e.g. an overflow-y-auto snap container). Listen to both.
    const scrollParent = getScrollParent(node);

    let frame = 0;
    let maxOpacity = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;

      // Distance (in scroll px) between the element and its snapped position.
      let distance: number;
      if (align === "start") {
        distance = Math.abs(rect.top);
      } else if (align === "end") {
        distance = Math.abs(rect.bottom - viewport);
      } else {
        distance = Math.abs(rect.top + rect.height / 2 - viewport / 2);
      }

      let opacity = Math.min(Math.max(1 - distance / FADE_DISTANCE, 0), 1);
      // Latch to the peak so the element fades in but never fades back out.
      if (noFadeOut) {
        maxOpacity = Math.max(maxOpacity, opacity);
        opacity = maxOpacity;
      }
      node.style.opacity = String(opacity);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    scrollParent?.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      scrollParent?.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Tag ref={ref} className={`fade-in-section ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
