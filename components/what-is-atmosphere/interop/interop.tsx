"use client";

import { FadeIn } from "@/components/fadeIn";
import { TownWrapper } from "@/components/townWrapper";
import Image from "next/image";
import {
  LeafletExample,
  AnisotaExample,
  MarginExample,
  SillExample,
} from "./interopExamples";

export const Interop = () => {
  return (
    <FadeIn
      as="section"
      id="interop"
      className="snap-always snap-center h-screen w-full max-w-[1400px] mx-auto relative z-20"
    >
      <div className="absolute top-16 left-16 ">
        <h2>Radically conntected content</h2>
        <p className="large-text mt-3">
          Mix and match apps to seamlessly <br />
          make, repost, and build on your content
        </p>
      </div>
      <TownWrapper>
        <div className="relative w-full h-full">
          <div className="absolute inset-0">
            <Image
              src="/town/house-interop.png"
              alt=""
              fill
              className="object-contain object-bottom select-none pointer-events-none"
            />
          </div>
          <div className="contents group/content-cards">
            <SillExample />
            <MarginExample />
            <AnisotaExample />
            <LeafletExample />
          </div>
        </div>
      </TownWrapper>
    </FadeIn>
  );
};
