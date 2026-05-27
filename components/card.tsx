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
      className={`relative w-50 py-8 px-4 rounded-2xl shadow-[1px_2px_3px_0px_rgba(0,0,0,0.4),2px_6px_4px_0px_rgba(0,0,0,0.25)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit] backdrop-blur-[6px]"
        style={{ backgroundImage: radialTint }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_-0.1px_-0.5px_3px_0.5px_rgba(255,255,255,0.6),inset_1px_1px_2px_0px_rgba(255,255,255,0.9),inset_-2px_-4px_6px_1px_#618f33]"
      />
      <div className="relative">{children}</div>
    </div>
  );
};
