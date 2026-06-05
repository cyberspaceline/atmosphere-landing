import type { LogoProps } from "./types";

export const Margin = ({
  size = 20,
  color,
  className,
  ...props
}: LogoProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <g id="logo - margin">
    <path id="margin" d="M47.518 20.5424H36.0103V32.0502H43.6821L47.518 35.8861V58.7352H1.25452V5.2648H47.518V20.5424ZM62.7455 5.2648V58.7352H51.2377V55.0675H59.0258V9.03669H51.2377V5.2648H62.7455Z" fill={color ?? "#027BFF"}/>
    </g>
  </svg>
);
