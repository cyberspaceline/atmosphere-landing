import { useState } from "react";
import { GoToPageIcon } from "../card";
import type { Group } from "../community/groups";

/**
 * The "<description> on <App>" label that sits above each example. Hovering the
 * pill pauses the cycling sequence, so the avatar/bubble layout holds still.
 */
export function LinkButton({
  link,
  interactive,
  onHoverChange,
}: {
  link: Group["link"];
  /** Only the active group's pill should be hoverable. */
  interactive: boolean;
  onHoverChange: (hovered: boolean) => void;
}) {
  const { text, appName, logo: Logo, logoColor, pillBg, pillText } = link;
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className={`flex items-center justify-center gap-2 rounded-lg px-2 py-1  outline-2 outline-offset-1   ${
        interactive
          ? "pointer-events-auto cursor-pointer"
          : "pointer-events-none"
      }`}
      style={{
        backgroundColor: pillBg,
        color: pillText,
        outlineColor: hovered ? pillBg : "transparent",
      }}
      onMouseEnter={() => {
        if (!interactive) return;
        setHovered(true);
        onHoverChange(true);
      }}
      onMouseLeave={() => {
        if (!interactive) return;
        setHovered(false);
        onHoverChange(false);
      }}
    >
      <p className={`whitespace-nowrap text-[16px] text-inherit`}>{text}</p>
      <div className="flex gap-1 items-center">
        <Logo color={logoColor} className="size-4" />
        <span className="text-[16px] font-semibold leading-none">
          {appName}
        </span>
      </div>
      <GoToPageIcon className="w-4 h-4" />
    </span>
  );
}
