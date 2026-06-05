import Image from "next/image";
import { LinkGlassCard } from "./card";

export const OffprintPost = () => {
  return (
    <LinkGlassCard
      className="w-[328px]"
      label="Written on Offprint"
      labelColor="#000000"
    >
      <Image
        src="/publishers/offprint.png"
        alt="An article written on Offprint"
        width={300}
        height={222}
        className="w-full h-auto"
      />
    </LinkGlassCard>
  );
};

export const PcktPost = () => {
  return (
    <LinkGlassCard
      className="w-[328px]"
      label="Written on pckt"
      labelColor="#ff5d5c"
    >
      <Image
        src="/publishers/pckt.png"
        alt="A post written on pckt"
        width={300}
        height={234}
        className="w-full h-auto"
      />
    </LinkGlassCard>
  );
};

export const LeafletPost = () => {
  return (
    <LinkGlassCard
      className="w-[268px]"
      label="Written on Leaflet"
      labelColor="#749100"
    >
      <Image
        src="/publishers/leaflet.png"
        alt="A publication written on Leaflet"
        width={240}
        height={263}
        className="w-full h-auto"
      />
    </LinkGlassCard>
  );
};
