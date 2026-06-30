import Image from "next/image";
import type { Bubble, BubbleKey, Group } from "./groups";
import {
  SpeeachBubbleArrow1,
  SpeeachBubbleArrow2,
  SpeeachBubbleArrow3,
} from "../../PopoverArrow";
import { FLOAT_CLASS, floatStyle } from "@/lib/float";

/** Per-bubble float timing so neighbouring bubbles drift out of sync. */
const BUBBLE_FLOAT: Record<BubbleKey, { duration: string; delay: string }> = {
  cozy: { duration: "5s", delay: "0s" },
  max: { duration: "6.5s", delay: "-2s" },
  eva: { duration: "4.5s", delay: "-1s" },
};

/**
 * One fixed bubble slot: the avatar and the white speech bubble stay put while
 * the group cycles — only the text inside cross-fades to the active group's copy.
 */
export function SpeechBubble({
  bubble,
  groups,
  active,
}: {
  bubble: Bubble;
  groups: Group[];
  active: number;
}) {
  return (
    <>
      {/* avatar — fixed in place across every group */}
      <div
        className="avatar absolute aspect-square z-20 -translate-x-1/2 w-16"
        style={{
          left: bubble.avatarPos.left,
          bottom: bubble.avatarPos.bottom,
        }}
      >
        <Image
          src={bubble.avatar}
          alt=""
          fill
          sizes="80px"
          className="select-none rounded-full object-cover"
        />
      </div>

      {/* white speech bubble — gently floats; its copy is what changes */}
      <div
        className={`${FLOAT_CLASS} absolute -translate-x-1/2 rounded-lg  bg-[rgba(255,255,255,.9)] p-3 pt-2 border border-[#CFDDE0] w-[264px]`}
        style={{
          left: bubble.box.left,
          bottom: bubble.box.bottom,
          ...floatStyle(BUBBLE_FLOAT[bubble.key]),
        }}
      >
        <div aria-hidden className={`absolute ${bubble.tailClass}`}>
          {bubble.key === "eva" ? (
            <SpeeachBubbleArrow1 />
          ) : bubble.key === "max" ? (
            <SpeeachBubbleArrow2 />
          ) : (
            <SpeeachBubbleArrow3 />
          )}
        </div>
        <p className="text-[14px]  font-bold">{bubble.handle}</p>
        <div className="relative font-light text-[#313A1D]">
          {groups.map((g, i) => {
            const visible = i === active;
            return (
              <p
                key={g.key}
                aria-hidden={!visible}
                className={`text-[14px] leading-4 transition-opacity duration-700 text-[#4A5A26] ${
                  visible ? "" : "pointer-events-none absolute inset-0"
                }`}
                style={{ opacity: visible ? 1 : 0 }}
              >
                {g.bodies[bubble.key]}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}
