import { FadeIn } from "../fadeIn";
import { TownWrapper } from "../townWrapper";
import { BlueskyPost, BlackskyPost } from "./microblogging";
import { PcktPost, OffprintPost, LeafletPost } from "./publishers";
import Image from "next/image";

export function WhyAtmosphere() {
  return (
    <>
      <div className="sticky top-0 w-screen h-screen z-0 pointer-events-none">
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
        <TownWrapper className="townBG">
          <Image
            src="/town/town.png"
            alt=""
            fill
            className="object-contain object-bottom select-none pointer-events-none"
            priority
          />
        </TownWrapper>
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
        <TownWrapper>
          <Image
            src="/town/town-cloud.png"
            alt=""
            fill
            className="object-contain object-bottom select-none pointer-events-none"
          />
        </TownWrapper>
      </FadeIn>
      {/* content cards: sit above townFG (z-20) */}
      <FadeIn className="absolute inset-0 z-30">
        <TownWrapper>
          <div className="relative w-full h-full">
            <div className="absolute -top-[7%] right-[5%] z-50">
              <BlueskyPost />
            </div>
            <div className="absolute top-[41%] left-[17%] z-50">
              <BlackskyPost />
            </div>
          </div>
        </TownWrapper>
      </FadeIn>
    </div>
  );
}

function forest() {
  return (
    <div className="w-screen h-screen relative snap-center snap-always">
      {/* backdrop: sits between townBG (z-0) and townFG (z-20) */}
      <FadeIn className="absolute inset-0 z-10">
        <TownWrapper>
          <Image
            src="/town/town-forest.png"
            alt=""
            fill
            className="object-contain object-bottom select-none pointer-events-none"
          />
        </TownWrapper>
      </FadeIn>
      {/* content cards: sit above townFG (z-20) */}
      <FadeIn className="absolute inset-0 z-30">
        <TownWrapper>
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
        </TownWrapper>
      </FadeIn>
    </div>
  );
}

function pond() {
  return (
    <div className="w-screen h-screen relative snap-center snap-always">
      {/* backdrop: sits between townBG (z-0) and townFG (z-20) */}
      <FadeIn className="absolute inset-0 z-10">
        <TownWrapper>
          <Image
            src="/town/town-pond.png"
            alt=""
            fill
            className="object-contain object-bottom select-none pointer-events-none"
          />
        </TownWrapper>
      </FadeIn>
      {/* content cards: sit above townFG (z-20) */}
      <FadeIn className="absolute inset-0 z-30">
        <TownWrapper>
          <div className="relative w-full h-full">
            <div className="absolute -top-[7%] right-[5%] z-50">
              <BlueskyPost />
            </div>
            <div className="absolute top-[41%] left-[17%] z-50">
              <BlackskyPost />
            </div>
          </div>
        </TownWrapper>
      </FadeIn>
    </div>
  );
}
