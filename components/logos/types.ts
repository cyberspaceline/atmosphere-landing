import type { SVGProps } from "react";

export type LogoProps = Omit<SVGProps<SVGSVGElement>, "color"> & {
  /** Width and height in pixels (or any CSS length). Defaults to 20. */
  size?: number | string;
  /** Overrides the logo's default brand fill color. */
  color?: string;
};
