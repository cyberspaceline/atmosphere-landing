import Image from "next/image";
import { LinkGlassCard } from "./card";

export const BlueskyPost = () => {
  return (
    <LinkGlassCard
      className="w-[324px]"
      label="View on Bluesky"
      labelColor="#016bfe"
    >
      <Image
        src="/microblogging/bluesky.png"
        alt="A post on Bluesky"
        width={296}
        height={120}
        className="w-full h-auto rounded border border-[#dce2ea]"
      />
    </LinkGlassCard>
  );
};

export const BlackskyPost = () => {
  return (
    <LinkGlassCard
      className="w-[326px]"
      label="View on Blacksky"
      labelColor="#000000"
    >
      <Image
        src="/microblogging/blacksky.png"
        alt="A post on Blacksky"
        width={298}
        height={122}
        className="w-full h-auto rounded border border-[#e0e1e1]"
      />
    </LinkGlassCard>
  );
};
