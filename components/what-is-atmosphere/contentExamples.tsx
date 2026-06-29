import { Anisota, Blacksky, Bluesky, Leaflet } from "../logos";
import { Card } from "../card";

export const BlueskyExample = () => {
  return (
    <Card
      className="w-88"
      description="Share with everyone on"
      logo={Bluesky}
      appName="Bluesky"
      buttonBg="#0a7aff"
      buttonText="#ffffff"
      src="/your-community/bluesky-post.png"
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
      src="/your-community/blacksky-post.png"
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
      src="/your-community/anisota-post.png"
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
      src="/your-community/leaflet-post.png"
      bottom="20%"
      left="13%"
      floatDuration="5.5s"
      floatDelay="-3s"
    />
  );
};
