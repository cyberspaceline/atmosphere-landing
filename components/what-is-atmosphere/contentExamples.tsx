import Image from "next/image";
import { Anisota, Blacksky, Bluesky, Leaflet } from "../logo";
import type { ComponentType, ReactNode } from "react";
import { LogoProps } from "../logo/types";
import { LinkButton } from "../your-friends/linkButton";
import { FLOAT_CLASS, floatStyle } from "@/lib/float";

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
      bottom="45%"
      left="70%"
      floatDuration="5s"
      floatDelay="0s"
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
      bottom="35%"
      left="50%"
      floatDuration="6.5s"
      floatDelay="-2s"
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
      bottom="25%"
      left="34%"
      floatDuration="4.5s"
      floatDelay="-1s"
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
      bottom="20%"
      left="13%"
      floatDuration="5.5s"
      floatDelay="-3s"
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
