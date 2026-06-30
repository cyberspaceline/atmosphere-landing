"use client";

import { FadeIn } from "@/components/fadeIn";
import { TownWrapper } from "@/components/townWrapper";
import Image from "next/image";
import {
  BlueskyExample,
  PlyrfmExample,
  StreamplaceExample,
  TangledExample,
} from "./contentExamples";

export function YourContent() {
  return (
    <FadeIn
      as="section"
      id="your-content"
      className="snap-always snap-center h-screen w-full max-w-[1400px] mx-auto relative z-20"
    >
      <div className="absolute top-16 left-16 ">
        <h2>Anything and everything, all in one place</h2>
        <p className="large-text mt-3">
          Use Atmosphere apps to make all sorts of content,
          <br />
          and store it all in your Atmosphere account
        </p>
      </div>
      <TownWrapper>
        <div className="relative w-full h-full">
          <div className="absolute inset-0">
            <Image
              src="/town/house-content.png"
              alt=""
              fill
              className="object-contain object-bottom select-none pointer-events-none"
            />
          </div>
          <div className="contents group/content-cards">
            <BlueskyExample />
            <TangledExample />
            <PlyrfmExample />
            <StreamplaceExample />
          </div>
        </div>
      </TownWrapper>
    </FadeIn>
  );
}
