"use client";

import { FadeIn } from "@/components/fadeIn";
import { TownWrapper } from "@/components/townWrapper";
import Image from "next/image";
import { FriendGroups } from "@/components/what-is-atmosphere/yourCommunity/friendGroups";

export function YourCommunity() {
  return (
    <FadeIn
      as="section"
      id="your-friends"
      className="snap-always snap-center h-screen w-full max-w-[1400px] mx-auto relative z-20"
    >
      <div className="absolute top-16 left-16">
        <h2>And the people and places you love</h2>

        <p className="mt-3 large-text">
          Your friends, follows, and even your blocks are stored in your
          account.
          <br /> No matter what apps you use, you&apos;ll always have your
          community.
        </p>
      </div>

      <TownWrapper>
        <div className="relative w-full h-full">
          <FriendGroups />

          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="/town/house-friend.png"
              alt=""
              fill
              className="object-contain object-bottom select-none pointer-events-none"
            />
            <div className="absolute inset-0">
              <Image
                src="/town/houses.png"
                alt=""
                fill
                className="object-contain object-bottom select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </TownWrapper>
    </FadeIn>
  );
}
