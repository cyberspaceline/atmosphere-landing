import { useState, type ComponentType, type ReactNode } from "react";
import Image from "next/image";
import type { Group } from "./what-is-atmosphere/yourCommunity/groups";
import type { LogoProps } from "./logos/types";
import { FLOAT_CLASS, floatStyle } from "@/lib/float";

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

export const GoToPageIcon = ({ className }: { className?: string }) => (
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

export const Card = ({
  appName,
  description,
  logo: Logo,
  buttonBg: pillBg,
  buttonText: pillText,
  src,
  className = "",
  bottom,
  left,
  floatDuration = "5s",
  floatDelay = "0s",
}: {
  appName: string;
  description: string;
  logo: ComponentType<LogoProps>;
  buttonBg: string;
  buttonText: string;
  src: string;
  className?: string;
  bottom: string;
  left: string;
  floatDuration?: string;
  floatDelay?: string;
}) => {
  return (
    <div
      className={`${className} ${FLOAT_CLASS} absolute -translate-x-1/2 z-30 transition duration-300 group-hover/content-cards:blur-sm hover:blur-none! hover:z-50 hover:-translate-y-2 flex flex-col items-end gap-2`}
      style={{
        bottom,
        left,
        ...floatStyle({ duration: floatDuration, delay: floatDelay }),
      }}
    >
      <Image
        src={src}
        loading="eager"
        alt="A post on Leaflet"
        width={400}
        height={600}
        className="w-full h-auto rounded-xl border border-gray-300"
      />

      <LinkButton
        link={{
          text: description,
          appName,
          logo: Logo,
          logoColor: pillText,
          pillBg,
          pillText,
        }}
        interactive={true}
        onHoverChange={() => {}}
      />
    </div>
  );
};
