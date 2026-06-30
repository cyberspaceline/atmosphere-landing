import { Anisota, Bluesky, Streamplace, Tangled } from "../../logos";
import { Card } from "../../card";

export const BlueskyExample = () => {
  return (
    <Card
      className="w-80"
      description="Microblog on"
      logo={Bluesky}
      appName="Bluesky"
      buttonBg="#0a7aff"
      buttonText="#ffffff"
      src="/your-content/bluesky.png"
      bottom="45%"
      left="70%"
      floatDuration="5s"
      floatDelay="0s"
    />
  );
};

export const TangledExample = () => {
  return (
    <Card
      className="w-96"
      description="Share your code with"
      logo={Tangled}
      appName="Tangled"
      buttonBg="#000000"
      buttonText="#ffffff"
      src="/your-content/tangled.png"
      bottom="35%"
      left="50%"
      floatDuration="6.5s"
      floatDelay="-2s"
    />
  );
};

export const PlyrfmExample = () => {
  return (
    <Card
      className="w-72"
      description="Make music on "
      logo={Anisota}
      appName="plyr.fm"
      buttonBg="#1e1e1e"
      buttonText="#ffffff"
      src="/your-content/plyrfm.png"
      bottom="25%"
      left="34%"
      floatDuration="4.5s"
      floatDelay="-1s"
    />
  );
};

export const StreamplaceExample = () => {
  return (
    <Card
      className="w-104"
      description="Host a stream on "
      logo={Streamplace}
      appName="Streamplace"
      buttonBg="#F663D3"
      buttonText="#ffffff"
      src="/your-content/streamplace.png"
      bottom="20%"
      left="13%"
      floatDuration="5.5s"
      floatDelay="-3s"
    />
  );
};
