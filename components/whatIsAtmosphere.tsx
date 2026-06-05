"use client";

import Image from "next/image";
import { GlassCard } from "./card";
import { FadeIn } from "./fadeIn";

export function WhatIsAtmosphere() {
  return (
    <div id="what-is-atmosphere" className="relative -mx-12 mt-32 h-screen">
      <div className="flex flex-col items-center text-center gap-6 px-12 pt-24">
        <h2>The Atmosphere is an ecosystem</h2>
        <div className="flex flex-col gap-3">
          <p className="large-text">
            Real people, friends, and neighbors, <br />
            and a network of social apps connecting them.
          </p>
          <p className="large-text">Connecting you.</p>
        </div>
      </div>

      <div className="townWrapper absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none ">
        <div className="townImages relative w-[60vw] max-w-[900px] aspect-[2004/1648] mt-32">
          <Image
            src="/what-is-atmosphere/town-bg.png"
            alt=""
            fill
            sizes="60vw"
            className="townBG object-contain object-bottom select-none pointer-events-none"
            priority
          />

          <Image
            src="/what-is-atmosphere/town-fg.png"
            alt=""
            fill
            sizes="60vw"
            className="townFG object-contain object-bottom select-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}

export function InterconnectedAtmosphere() {
  return (
    <>
      <div className="sticky top-0 w-screen h-screen z-0 pointer-events-none">
        <div className="townBG absolute right-12 bottom-12 max-h-[90rem] w-[70vw] aspect-[2004/1648]">
          <Image
            src="/what-is-atmosphere/town-bg.png"
            alt=""
            fill
            className="object-contain object-bottom select-none pointer-events-none"
            priority
          />
        </div>
      </div>
      <div className="sticky top-0 w-screen h-screen z z-20 -mt-[100vh] pointer-events-none">
        <div className="absolute top-12 left-12 pointer-events-none">
          <h2>
            In the Atmosphere, the world is always changing,
            <br /> but you will always be you
          </h2>
          <p className="large-text">
            Finally making social life on the internet
            <br />
            as seamless and fluid as the real world
          </p>
        </div>
        <div className="townFG absolute right-12 bottom-12 max-h-[90rem] w-[70vw] aspect-[2004/1648]">
          <Image
            src="/what-is-atmosphere/town-fg.png"
            alt=""
            fill
            className="object-contain object-bottom select-none pointer-events-none"
          />
        </div>
      </div>

      <div className="w-screen h-screen snap-center snap-always" />
      {forest()}
      {sky()}
    </>
  );
}
function sky() {
  return (
    <FadeIn className="w-screen h-screen relative snap-center snap-always">
      <div className="max-h-[90rem] w-[70vw] aspect-[2004/1648] absolute right-12 bottom-12 ">
        <Image
          src="/what-is-atmosphere/sky.png"
          alt=""
          fill
          className="object-contain object-bottom select-none pointer-events-none"
        />
      </div>

      <div className="absolute -top-[4px] right-[182px] z-50">
        <GlassCard>
          <p className="text-center">Blacksky Content Here </p>
        </GlassCard>
      </div>
      <div className="absolute top-[143px] left-[110px] z-50">
        <GlassCard>
          <p className="text-center">Bluesky Content Here </p>
        </GlassCard>
      </div>
    </FadeIn>
  );
}

function forest() {
  return (
    <FadeIn className="w-screen h-screen relative snap-center snap-always">
      <div className="max-h-[90rem] w-[70vw] aspect-[2004/1648] absolute right-12 bottom-12 ">
        <Image
          src="/what-is-atmosphere/forest.png"
          alt=""
          fill
          className="object-contain object-bottom select-none pointer-events-none"
        />
      </div>
      <div className="absolute bottom-[180px] left-[205px] z-50">
        <GlassCard>
          <p className="text-center">Leaflet Content Here </p>
        </GlassCard>
      </div>
      <div className="absolute bottom-[240px] right-[32px] z-50">
        <GlassCard>
          <p className="text-center">Pckt Content Here </p>
        </GlassCard>
      </div>
      <div className="absolute top-[6px] left-[156px] z-50">
        <GlassCard>
          <p className="text-center">Offprint Content Here </p>
        </GlassCard>
      </div>
    </FadeIn>
  );
}
