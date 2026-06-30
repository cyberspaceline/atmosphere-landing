import { AppCloud } from "@/components/atmosphere-apps/appCloud";
import { AtmosphereHero } from "@/components/atmosphereHero";
import { AppGrid } from "@/components/atmosphere-apps/appGrid";
import { FadeIn } from "@/components/fadeIn";
import { NoEnshittification } from "@/components/noEnshittification";
import { TownWrapper } from "@/components/townWrapper";
import { WhatIsAtmosphere } from "@/components/what-is-atmosphere/whatIsAtmosphere";
import Image from "next/image";
import { WhyAtmosphere } from "@/components/conclusion/Conclusion";
import MeshGradient from "@/components/MeshGradient";

export default function Home() {
  return (
    <div
      id="home-page"
      className="greenPage flex flex-col justify-center snap-y snap-mandatory"
    >
      {/*<CloudBackground className="dappledBG" />*/}
      <MeshGradient className="cloudBG " />

      <div className="relative hero w-full max-w-[1400px] mx-auto h-screen  flex items-center px-6  snap-start snap-always">
        <AtmosphereHero />
      </div>

      <div className="w-full max-w-[1400px] mx-auto h-screen flex flex-col items-center justify-center text-center gap-12 snap-center snap-always">
        <div className="">
          <h2>
            The Atmosphere is an ecosystem of apps
            <br /> built on a new kind of social network.
          </h2>
          <p className="text-center large-text mt-3">
            Join millions of people already connecting
            <br />
            via Atmosphere apps!
          </p>
        </div>
        <AppCloud />
      </div>
      <div className="w-screen h-screen snap-center snap-y snap-always snap-mandatory relative overflow-y-auto">
        <div className="sticky top-0 z-10 pointer-events-none h-screen -mb-[100vh] w-full max-w-[1400px] mx-auto">
          <TownWrapper className="house">
            <Image
              src="/town/house.png"
              alt=""
              fill
              className="object-contain object-bottom select-none pointer-events-none"
            />
          </TownWrapper>
        </div>

        <WhatIsAtmosphere />
        <WhyAtmosphere />
      </div>

      {/*<NoEnshittification />*/}

      <FadeIn className="w-full max-w-[1400px] h-screen mx-auto snap-end snap-always flex place-items-center justify-center">
        <div className="flex flex-col justify-center place-items-center text-center gap-2 ">
          <div className="relative h-48 w-48 mx-auto mb-3">
            <Image
              src="/no-enshittification/lil-guys.png"
              alt=""
              fill
              className="object-contain object-bottom select-none pointer-events-none"
            />
          </div>
          <h2 className="text-center ">Try the Atmosphere</h2>
          <p className="large-text">A future built for people, not platforms</p>
          <AppGrid />
        </div>
      </FadeIn>
    </div>
  );
}
