import { AppCarousel } from "@/components/appCarousel";
import { AppGrid } from "@/components/appGrid";
import {
  InterconnectedAtmosphere,
  WhatIsAtmosphere,
} from "@/components/whatIsAtmosphere";
import Image from "next/image";
import { WhyAtmosphere } from "./whyAtmosphere";

export default function Home() {
  return (
    <div id="home-page" className="flex flex-col justify-center px-12 ">
      <div className="hero w-full h-full max-w-600 pt-36 ">
        <Image
          src="/hero-1.png"
          alt="Hero"
          width={2800}
          height={1539}
          priority
        />
      </div>

      <div className="flex flex-col justify-center text-center gap-18 pt-24">
        <h2 className="text-center">
          Join the millions already connecting
          <br />
          via Atmosphere apps!
        </h2>
        <AppCarousel />
      </div>

      <WhatIsAtmosphere />

      <WhyAtmosphere />
      <InterconnectedAtmosphere />

      <div className="flex flex-col justify-center text-center gap-6 pt-32">
        <h3 className="text-center text-[1.5rem]">
          Join a future built for the people
        </h3>
        <AppGrid />
      </div>

      <div className="h-24 w-full" />
    </div>
  );
}
