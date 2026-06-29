import Image from "next/image";
import { PopoverArrow } from "../PopoverArrow";

export const OffprintPost = () => {
  return (
    <div className="relative w-60 opacity-90">
      <Image
        src="/conclusion/publishers/offprint.png"
        alt="An article written on Offprint"
        width={300}
        height={222}
        className="w-full h-auto"
      />
      <div className="absolute right-1/2 translate-x-1/2 -mt-px">
        <PopoverArrow fill="white" stroke="#E9ECF3" />
      </div>
    </div>
  );
};

export const PcktPost = () => {
  return (
    <div className="w-60 relative  opacity-90">
      <Image
        src="/conclusion/publishers/pckt.png"
        alt="A post written on pckt"
        width={300}
        height={234}
        className="w-full h-auto"
      />
      <div className="absolute right-1/2 translate-x-1/2 -mt-px">
        <PopoverArrow fill="white" stroke="#E9ECF3" />
      </div>
    </div>
  );
};

export const LeafletPost = () => {
  return (
    <div className="w-56 relative opacity-90">
      <Image
        src="/conclusion/publishers/leaflet.png"
        alt="A publication written on Leaflet"
        width={240}
        height={263}
        className="w-full h-auto"
      />
      <div className="absolute right-1/2 translate-x-1/2 -mt-px">
        <PopoverArrow fill="white" stroke="#E9ECF3" />
      </div>
    </div>
  );
};
