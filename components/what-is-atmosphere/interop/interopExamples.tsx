import { Anisota, Leaflet, Margin, Sill } from "../../logos";
import { Card } from "../../card";

export const LeafletExample = () => {
  return (
    <Card
      className="w-96 flex-col-reverse! items-start!"
      description="Write a blog on"
      logo={Leaflet}
      appName="Leaflet"
      buttonBg="#639431"
      buttonText="#ffffff"
      src="/interop/leaflet-example.png"
      bottom="23%"
      left="11%"
      floatDuration="5s"
      floatDelay="0s"
    />
  );
};

export const AnisotaExample = () => {
  return (
    <Card
      className="w-72  flex-col-reverse! items-start!"
      description="Share it on"
      logo={Anisota}
      appName="Anisota"
      buttonBg="#1e1e1e"
      buttonText="#ffffff"
      src="/interop/anisota-example.png"
      bottom="29%"
      left="34%"
      floatDuration="6.5s"
      floatDelay="-2s"
    />
  );
};

export const MarginExample = () => {
  return (
    <Card
      className="w-102"
      description="Annotate it on"
      logo={Margin}
      appName="Margin"
      buttonBg="#027BFF"
      buttonText="#ffffff"
      src="/interop/margin-example.png"
      bottom="66%"
      left="64%"
      floatDuration="4.5s"
      floatDelay="-1s"
    />
  );
};

export const SillExample = () => {
  return (
    <Card
      className="w-88"
      description="Discover it with"
      logo={Sill}
      appName="Sill"
      buttonBg="#FFFAB0"
      buttonText="#A06E00"
      src="/interop/sill-example.png"
      bottom="36%"
      left="80%"
      floatDuration="5.5s"
      floatDelay="-3s"
    />
  );
};
