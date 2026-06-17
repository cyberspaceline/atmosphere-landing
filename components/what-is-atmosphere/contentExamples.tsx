import Image from "next/image";
import { Anisota, Blacksky, Bluesky, Leaflet } from "../logo";
import type { ComponentType, ReactNode } from "react";
import { LogoProps } from "../logo/types";
import { LinkButton } from "../your-friends/linkPill";

export const BlueskyExample = () => {
  return (
    <Card
      className="w-88"
      description="Share with everyone on"
      logo={Bluesky}
      appName="Bluesky"
      buttonBg="#0a7aff"
      buttonText="#ffffff"
      src="/friends/bluesky-post.png"
      bottom="48%"
      left="70%"
    />
  );
};

export const BlackskyExample = () => {
  return (
    <Card
      className="w-88"
      description="Share with your community on"
      logo={Blacksky}
      appName="Blacksky"
      buttonBg="#000000"
      buttonText="#ffffff"
      src="/friends/blacksky-post.png"
      bottom="38%"
      left="50%"
    />
  );
};

export const AnisotaExample = () => {
  return (
    <Card
      className="w-66"
      description="Stumble upon it in"
      logo={Anisota}
      appName="Anisota"
      buttonBg="#1e1e1e"
      buttonText="#ffffff"
      src="/friends/anisota-post.png"
      bottom="28%"
      left="34%"
    />
  );
};

export const LeafletExample = () => {
  return (
    <Card
      className="w-96"
      description="Write your blog on"
      logo={Leaflet}
      appName="Leaflet"
      buttonBg="#639431"
      buttonText="#ffffff"
      src="/friends/leaflet-post.png"
      bottom="23%"
      left="13%"
    />
  );
};

const Card = ({
  appName,
  description,
  logo: Logo,
  buttonBg: pillBg,
  buttonText: pillText,
  src,
  className = "",
  bottom,
  left,
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
}) => {
  return (
    <div
      className={`${className} absolute -translate-x-1/2 z-30 transition duration-300 group-hover/content-cards:blur-sm hover:blur-none! hover:z-50 hover:-translate-y-2 flex flex-col items-end gap-2`}
      style={{ bottom, left }}
    >
      <Image
        src={src}
        loading="eager"
        alt="A post on Leaflet"
        width={400}
        height={600}
        className="w-full h-auto"
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
        interactive={false}
        onHoverChange={() => {}}
      />
    </div>
  );
};
