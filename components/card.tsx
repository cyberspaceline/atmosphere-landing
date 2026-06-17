import type { ReactNode } from "react";

const radialTint =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 203.42 233.02' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.4'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(8.2253 19.541 -27.613 25.864 48.478 142.34)'><stop stop-color='rgba(212,215,206,1)' offset='0.11846'/><stop stop-color='rgba(255,255,255,1)' offset='0.75857'/></radialGradient></defs></svg>\")";

export const GlassCard = ({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`relative  max-w-48 py-6 pl-4 pr-5 rounded-2xl shadow-[1px_2px_3px_0px_rgba(0,0,0,0.4),2px_6px_4px_0px_rgba(0,0,0,0.25)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit] backdrop-blur-[6px]"
        style={{ backgroundImage: radialTint }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_-0.1px_-0.5px_3px_0.5px_rgba(255,255,255,0.6),inset_1px_1px_2px_0px_rgba(255,255,255,0.9),inset_-2px_-4px_6px_1px_rgba(12,39,94,0.51)]"
      />
      <div className="relative">{children}</div>
    </div>
  );
};

const GoToPageIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M3 8h9M8.5 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * A glass card with an image and a right-aligned "View/Written on X →" link.
 * Used for content/publisher examples (see microblogging.tsx, publishers.tsx).
 */
export const LinkGlassCard = ({
  children,
  label,
  labelColor,
  className = "",
}: {
  children?: ReactNode;
  /** The call-to-action text, e.g. "View on Bluesky". */
  label: string;
  /** Color for the label and arrow. Defaults to the inherited text color. */
  labelColor?: string;
  className?: string;
}) => {
  return (
    <GlassCard
      className={`!max-w-none !pt-3 !pb-4 !pl-3 !pr-4 ${className} hover:z-50`}
    >
      <div className="flex flex-col items-end gap-1">
        {children}
        <div
          className="flex items-center gap-1 text-base font-semibold"
          style={labelColor ? { color: labelColor } : undefined}
        >
          <span className="whitespace-nowrap">{label}</span>
          <GoToPageIcon className="size-4 shrink-0" />
        </div>
      </div>
    </GlassCard>
  );
};
