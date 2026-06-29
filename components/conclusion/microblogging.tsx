import Image from "next/image";
import { PopoverArrow } from "../PopoverArrow";

export const BlueskyPost = () => {
  return (
    <div className="w-72 relative">
      <Image
        src="/conclusion/microblogging/bluesky.png"
        alt="A post on Bluesky"
        width={296}
        height={120}
        className="w-full h-auto rounded border border-[#dce2ea]"
      />
      <div className="absolute right-1/2 translate-x-1/2 -mt-px">
        <PopoverArrow fill="white" stroke="#E9ECF3" />
      </div>
    </div>
  );
};

export const BlackskyPost = () => {
  return (
    <div className="w-72 relative">
      <Image
        src="/conclusion/microblogging/blacksky.png"
        alt="A post on Blacksky"
        width={298}
        height={122}
        className="w-full h-auto rounded border border-[#e0e1e1]"
      />
      <div className="absolute right-1/2 translate-x-1/2 -mt-px">
        <PopoverArrow fill="white" stroke="#E9ECF3" />
      </div>
    </div>
  );
};
