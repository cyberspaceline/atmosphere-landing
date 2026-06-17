import Image from "next/image";
import type { Bubble, Group } from "./groups";

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
        className="absolute aspect-square"
        style={{
          left: bubble.avatarPos.left,
          top: bubble.avatarPos.top,
          width: bubble.avatarPos.size,
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

      {/* white speech bubble — fixed; its copy is what changes */}
      <div
        className="absolute rounded-2xl bg-white px-3 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.14)]"
        style={{
          left: bubble.box.left,
          top: bubble.box.top,
          width: bubble.box.width,
        }}
      >
        <span
          aria-hidden
          className={`absolute size-3 rotate-45 bg-white ${bubble.tailClass}`}
        />
        <p className="text-[14px] font-medium text-black">{bubble.handle}</p>
        <div className="relative mt-1 text-[14px] font-light text-black">
          {groups.map((g, i) => {
            const visible = i === active;
            return (
              <p
                key={g.key}
                aria-hidden={!visible}
                className={`transition-opacity duration-700 ${
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
