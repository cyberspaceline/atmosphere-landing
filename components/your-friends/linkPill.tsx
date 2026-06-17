import type { Group } from "./groups";

/**
 * The "<description> on <App>" label that sits above each example. Hovering the
 * pill pauses the cycling sequence, so the avatar/bubble layout holds still.
 */
export function LinkPill({
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
  return (
    <div className="flex items-center gap-2">
      <p className="whitespace-nowrap text-[20px] text-[#757575]">{text}</p>
      <span
        className={`flex items-center justify-center gap-1 rounded-[4px] px-2 py-0.5 ${
          interactive ? "pointer-events-auto cursor-default" : "pointer-events-none"
        }`}
        style={{ backgroundColor: pillBg, color: pillText }}
        onMouseEnter={() => interactive && onHoverChange(true)}
        onMouseLeave={() => interactive && onHoverChange(false)}
      >
        <Logo color={logoColor} className="size-5" />
        <span className="text-[20px] font-semibold leading-none">{appName}</span>
      </span>
    </div>
  );
}
