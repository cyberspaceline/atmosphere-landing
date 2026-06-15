import Image from "next/image";
import { AppGlassCard } from "../card";
import { Anisota, Blacksky, Bluesky, Leaflet } from "../logo";

export const BlueskyExample = () => {
  return (
    <AppGlassCard
      className="w-[384px]"
      description="Microblogging for everyone on"
      logo={Bluesky}
      logoColor="white"
      appName="Bluesky"
      buttonClassName="bg-[#0a7aff] text-white"
    >
      <Image
        src="/friends/bluesky-post.png"
        alt="A post on Bluesky"
        width={356}
        height={385}
        className="w-full h-auto"
      />
    </AppGlassCard>
  );
};

export const BlackskyExample = () => {
  return (
    <AppGlassCard
      className="w-[384px]"
      description="Microblogging for the Black community on"
      logo={Blacksky}
      appName="Blacksky"
      buttonClassName="bg-black text-white"
    >
      <Image
        src="/friends/blacksky-post.png"
        alt="A post on Blacksky"
        width={356}
        height={385}
        className="w-full h-auto"
      />
    </AppGlassCard>
  );
};

export const AnisotaExample = () => {
  return (
    <AppGlassCard
      className="w-[293px]"
      description="Delightful Blogging on"
      logo={Anisota}
      logoColor="white"
      appName="Anisota"
      buttonClassName="bg-[#1e1e1e] text-white"
    >
      <Image
        src="/friends/anisota-post.png"
        alt="A post on Anisota"
        width={265}
        height={351}
        className="w-full h-auto"
      />
    </AppGlassCard>
  );
};

export const LeafletExample = () => {
  return (
    <AppGlassCard
      className="w-[407px]"
      description="Delightful Blogging on"
      logo={Leaflet}
      appName="Leaflet"
      buttonClassName="bg-[#d9ea72] text-[#639431]"
    >
      <Image
        src="/friends/leaflet-post.png"
        alt="A post on Leaflet"
        width={379}
        height={171}
        className="w-full h-auto"
      />
    </AppGlassCard>
  );
};
