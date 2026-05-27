import { AppCarousel } from "@/components/appCarousel";
import { AppGrid } from "@/components/appGrid";
import { WhatIsAtmosphere } from "@/components/whatIsAtmosphere";
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

      {/*<div className="flex flex-col justify-center text-center gap-6 pt-32">
        <h2 className="text-center">Your content, shared across the apps</h2>
        <div className="flex flex-col gap-3">
          <p className="large-text">
            Your account, your friends, and your followers <br />
            across every Atmosphere app
          </p>
          <div className="relative h-200 pt-8">
            <Image
              className="absolute top-0 left-0"
              src="/your-content/leaflet.png"
              alt="leaflet"
              width={600}
              height={280}
            />
            <Image
              className="absolute top-12 left-64"
              src="/your-content/blacksky.png"
              alt="leaflet"
              width={500}
              height={2800}
            />{" "}
            <Image
              className="absolute top-24 left-120"
              src="/your-content/anisota.png"
              alt="leaflet"
              width={400}
              height={280}
            />
            <Image
              className="absolute top-36 left-196"
              src="/your-content/bluesky.png"
              alt="leaflet"
              width={500}
              height={280}
            />{" "}
          </div>
        </div>
      </div>*/}

      <div className="flex flex-col justify-center text-center gap-6 pt-32">
        <h2 className="text-center">Apps built for people, not platforms</h2>
        <div className="flex flex-col gap-3">
          <p className="large-text">An Atmosphere app will never enshittify.</p>

          <p>
            Normal social medias jealously hide and guard your data. This way,
            they can sell it AND they hold it hostage to stop you from leaving
            when things go south.{" "}
          </p>
          <p>
            Apps on the Atmosphere store all the data in the open. It&apos;s a
            free resource, like air and water. Anyone can build with it and
            improve on it, but no one can own or exploits it.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center text-center gap-6 pt-32">
        <h2 className="text-center">Join a future built for the people</h2>
        <AppGrid />{" "}
      </div>

      <div className="h-screen w-full" />
    </div>
  );
}
