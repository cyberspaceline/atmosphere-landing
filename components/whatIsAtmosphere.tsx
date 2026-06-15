"use client";

import Image from "next/image";
import { GlassCard } from "./card";
import { FadeIn } from "./fadeIn";
import { LeafletPost, OffprintPost, PcktPost } from "./publishers";
import { BlackskyPost, BlueskyPost } from "./microblogging";

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
            src="/what-is-atmosphere/town.png"
            alt=""
            fill
            sizes="60vw"
            className="townImg object-contain object-bottom select-none pointer-events-none"
            priority
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
        <div className="townBG absolute right-12 bottom-12 max-h-[45rem] w-[70vw] max-w-[54.72rem] aspect-[2004/1648]">
          <Image
            src="/what-is-atmosphere/town.png"
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
      </div>

      <div className="w-screen h-screen snap-center snap-always" />
      {forest()}
      {sky()}
      {pond()}
    </>
  );
}
function sky() {
  return (
    <div className="w-screen h-screen relative snap-center snap-always">
      {/* backdrop: sits between townBG (z-0) and townFG (z-20) */}
      <FadeIn className="absolute inset-0 z-10">
        <div className="max-h-[45rem] w-[70vw] max-w-[54.72rem] aspect-[2004/1648] absolute right-12 bottom-12 ">
          <Image
            src="/what-is-atmosphere/town-cloud.png"
            alt=""
            fill
            className="object-contain object-bottom select-none pointer-events-none"
          />
        </div>
      </FadeIn>
      {/* content cards: sit above townFG (z-20) */}
      <FadeIn className="absolute inset-0 z-30">
        <div className="placeholder absolute right-12 bottom-12  max-h-[45rem] w-[70vw] max-w-[54.72rem] aspect-[2004/1648]">
          <div className="relative w-full h-full">
            <div className="absolute -top-[7%] right-[5%] z-50">
              <BlueskyPost />
            </div>
            <div className="absolute top-[41%] left-[17%] z-50">
              <BlackskyPost />
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

function forest() {
  return (
    <div className="w-screen h-screen relative snap-center snap-always">
      {/* backdrop: sits between townBG (z-0) and townFG (z-20) */}
      <FadeIn className="absolute inset-0 z-10">
        <div className="max-h-[45rem] w-[70vw] max-w-[54.72rem] aspect-[2004/1648] absolute right-12 bottom-12 ">
          <Image
            src="/what-is-atmosphere/town-forest.png"
            alt=""
            fill
            className="object-contain object-bottom select-none pointer-events-none"
          />
        </div>
      </FadeIn>
      {/* content cards: sit above townFG (z-20) */}
      <FadeIn className="absolute inset-0 z-30">
        <div className="placeholder absolute right-12 bottom-12  max-h-[45rem] w-[70vw] max-w-[54.72rem] aspect-[2004/1648] ">
          <div className="relative w-full h-full">
            <div className="absolute top-[1%] right-[0%] z-50">
              <PcktPost />
            </div>
            <div className="absolute top-[7%] left-[0%] z-50">
              <OffprintPost />
            </div>
            <div className="absolute top-[35%] right-[49%] z-50">
              <LeafletPost />
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

function pond() {
  return (
    <div className="w-screen h-screen relative snap-center snap-always">
      {/* backdrop: sits between townBG (z-0) and townFG (z-20) */}
      <FadeIn className="absolute inset-0 z-10">
        <div className="max-h-[45rem] w-[70vw] max-w-[54.72rem] aspect-[2004/1648] absolute right-12 bottom-12 ">
          <Image
            src="/what-is-atmosphere/town-pond.png"
            alt=""
            fill
            className="object-contain object-bottom select-none pointer-events-none"
          />
        </div>
      </FadeIn>
      {/* content cards: sit above townFG (z-20) */}
      <FadeIn className="absolute inset-0 z-30">
        <div className="placeholder absolute right-12 bottom-12  max-h-[45rem] w-[70vw] max-w-[54.72rem] aspect-[2004/1648]">
          <div className="relative w-full h-full">
            <div className="absolute -top-[7%] right-[5%] z-50">
              <BlueskyPost />
            </div>
            <div className="absolute top-[41%] left-[17%] z-50">
              <BlackskyPost />
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
