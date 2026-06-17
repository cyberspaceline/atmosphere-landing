import type { CSSProperties } from "react";

/** Class that drives the shared `app-float` keyframe (see globals.css). */
export const FLOAT_CLASS = "app-float";

/**
 * Style props for the gentle up/down float animation. Pair with `FLOAT_CLASS`
 * on the same element. `distance` is the peak offset (negative = upward).
 * Vary `duration`/`delay` per element so neighbours drift out of sync.
 */
export function floatStyle({
  distance = "-8px",
  duration = "5s",
  delay = "0s",
}: {
  distance?: string;
  duration?: string;
  delay?: string;
} = {}): CSSProperties {
  return {
    ["--float-distance" as string]: distance,
    animationDuration: duration,
    animationDelay: delay,
  } as CSSProperties;
}
