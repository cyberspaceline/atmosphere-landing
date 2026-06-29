"use client";

import { TownWrapper } from "@/components/townWrapper";
import Image from "next/image";
import { YourAccount } from "./yourAccount";
import { YourContent } from "./yourContent";
import { YourCommunity } from "./yourCommunity";

export function WhatIsAtmosphere() {
  return (
    <>
      <div
        id="section-what-is-atmosphere"
        className="w-full max-w-[1400px] mx-auto h-screen snap-always snap-center relative z-0"
      >
        <div className="flex flex-col gap-6 px-12 absolute top-12">
          <h2>The Atmosphere is an ecosystem</h2>
          <div className="flex flex-col gap-3">
            <p className="large-text">
              Real people, friends, and neighbors, <br />
              and a network of social apps connecting them.
            </p>
            <p className="large-text">Connecting you.</p>
          </div>
        </div>

        <TownWrapper
          className="mt-32 flex items-center justify-center overflow-hidden pointer-events-none"
          z={0}
        >
          <Image
            src="/town/town.png"
            alt=""
            fill
            className="town object-contain object-bottom select-none pointer-events-none"
            priority
          />
          <Image
            src="/town/town-default.png"
            alt=""
            fill
            className="townBG object-contain object-bottom select-none pointer-events-none"
            priority
          />
        </TownWrapper>
      </div>

      <YourAccount />
      <YourContent />
      <YourCommunity />
    </>
  );
}
