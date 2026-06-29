import type { ComponentType } from "react";
import type { LogoProps } from "@/components/logos/types";
import {
  Anisota,
  Bluesky,
  Blento,
  Eurosky,
  Grain,
  Leaflet,
  Margin,
  Offprint,
  Pckt,
  Popfeed,
  Semble,
  Spark,
  Streamplace,
  Surf,
  Tangled,
} from "@/components/logos";

export type App = {
  name: string;
  logo: ComponentType<LogoProps>;
  description: string;
};

const placeholder = "app description placeholder here";

export const apps: App[] = [
  { name: "bluesky", logo: Bluesky, description: placeholder },
  { name: "anisota", logo: Anisota, description: placeholder },
  { name: "grain", logo: Grain, description: placeholder },
  { name: "blento", logo: Blento, description: placeholder },
  { name: "semble", logo: Semble, description: placeholder },
  { name: "spark", logo: Spark, description: placeholder },
  { name: "eurosky", logo: Eurosky, description: placeholder },
  { name: "pckt", logo: Pckt, description: placeholder },
  { name: "offprint", logo: Offprint, description: placeholder },
  { name: "leaflet", logo: Leaflet, description: placeholder },
  { name: "streamplace", logo: Streamplace, description: placeholder },
  { name: "surf", logo: Surf, description: placeholder },
  { name: "tangled", logo: Tangled, description: placeholder },
  { name: "popfeed", logo: Popfeed, description: placeholder },
  { name: "margin", logo: Margin, description: placeholder },
];
