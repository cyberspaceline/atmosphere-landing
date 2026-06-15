import { AppCarousel } from "@/components/atmosphere-apps/appCarousel";
import { AtmosphereHero } from "@/components/atmosphereHero";
import { AppGrid } from "@/components/atmosphere-apps/appGrid";
import { FadeIn } from "@/components/fadeIn";
import { NoEnshittification } from "@/components/noEnshittification";
import { TownWrapper } from "@/components/townWrapper";
import { WhatIsAtmosphere } from "@/components/what-is-atmosphere/whatIsAtmosphere";
import Image from "next/image";
import { WhyAtmosphere } from "@/components/why-atmosphere/whyAtmosphere";

export default function Home() {
  return (
    <div
      id="home-page"
      className="greenPage flex flex-col justify-center snap-y snap-mandatory"
    >
      <div className="relative hero w-full h-screen max-w-600 flex items-center px-6  snap-start snap-always">
        <AtmosphereHero />
      </div>

      <div className="h-screen flex flex-col items-center justify-center text-center gap-12 snap-center snap-always">
        <h2 className="text-center">
          Join the millions already connecting
          <br />
          via Atmosphere apps!
        </h2>
        <AppCarousel />
      </div>

      <div className="relative w-screen  snap-y snap-mandatory">
        {/* sticky house */}

        <div className="sticky z-10 top-0 h-screen pointer-events-none">
          <TownWrapper className="house">
            <Image
              src="/town/house.png"
              alt=""
              fill
              className="object-contain object-bottom select-none pointer-events-none"
            />
          </TownWrapper>
        </div>

        {/* scrolling content */}
        <WhatIsAtmosphere />
        <WhyAtmosphere />
      </div>

      <NoEnshittification />

      <FadeIn className="snap-end snap-always flex flex-col justify-center text-center gap-6 pt-32">
        <h3 className="text-center text-[1.5rem]">
          Join a future built for the people
        </h3>
        <AppGrid />
        <div className="h-24 w-full" />
      </FadeIn>
    </div>
  );
}
