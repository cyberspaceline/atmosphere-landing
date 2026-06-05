import { AppCarousel } from "@/components/appCarousel";
import { AppGrid } from "@/components/appGrid";
import { FadeIn } from "@/components/fadeIn";
import { NoEnshittification } from "@/components/noEnshittification";
import {
  InterconnectedAtmosphere,
  WhatIsAtmosphere,
} from "@/components/whatIsAtmosphere";
import Image from "next/image";
import { WhyAtmosphere } from "./whyAtmosphere";
import { GlassCard } from "@/components/card";

export default function Home() {
  return (
    <div
      id="home-page"
      className="bluePage flex flex-col justify-center snap-y snap-mandatory"
    >
      <div className="hero w-full h-full max-w-600 pt-36 snap-start snap-always">
        <Image
          src="/hero-1.png"
          alt="Hero"
          width={2800}
          height={1539}
          priority
        />
      </div>

      <div className="flex flex-col justify-center text-center gap-18 pt-24 snap-center snap-always">
        <h2 className="text-center">
          Join the millions already connecting
          <br />
          via Atmosphere apps!
        </h2>
        <AppCarousel />
      </div>

      {/* positioned house */}
      <div className="relative w-screen">
        <div className="sticky z-40 top-0 h-screen">
          <div className="house absolute right-12 bottom-12 max-h-[80vh] max-h-[90rem] w-[70vw] aspect-[2004/1648]">
            <Image
              src="/why-atmosphere/house.png"
              alt=""
              fill
              className="object-contain object-bottom select-none pointer-events-none"
            />
          </div>
        </div>

        {/* scrolling content */}

        <div className="relative z-10 -mt-[100vh] snap-y snap-mandatory">
          <FadeIn
            id="section-what-is-atmosphere"
            className="w-screen h-screen snap-always snap-center relative"
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

            <div className="townWrapper absolute right-12 bottom-12 max-h-[90rem] w-[70vw] aspect-[2004/1648] mt-32 flex items-center justify-center z-50 overflow-hidden pointer-events-none">
              <Image
                src="/what-is-atmosphere/town-bg.png"
                alt=""
                fill
                className="townBG object-contain object-bottom select-none pointer-events-none"
                priority
              />

              <Image
                src="/what-is-atmosphere/town-fg.png"
                alt=""
                fill
                className="townFG object-contain object-bottom select-none pointer-events-none"
              />
            </div>
          </FadeIn>

          <FadeIn
            as="section"
            id="account"
            className="snap-always snap-center h-screen w-screen relative"
          >
            <div className="absolute top-12 left-12 ">
              <h2>This is your account.</h2>
              <p className="large-text mt-4">
                This one account signs you into every Atmosphere app.
              </p>
            </div>
            max-h-[80vh]
            <div className="absolute right-[24%] -translate-x-1/2 translate-y-1/2 bottom-[33%]">
              <GlassCard className="max-w-fit!">
                <div className="flex flex-col justify-center text-center mx-auto gap-1">
                  <Image
                    src="/why-atmosphere/eva.png"
                    alt="Eva Khoury's profile image"
                    width={64}
                    height={64}
                    className="overflow-hidden rounded-full mx-auto mb-4"
                  />
                  <h3>Eva Khoury</h3>
                  <p>@evakhoury.bsky.social</p>
                </div>
              </GlassCard>
            </div>
          </FadeIn>

          <FadeIn
            as="section"
            id="your-friends"
            className="snap-always snap-center h-screen w-screen relative"
          >
            <div className="absolute top-12 left-12">
              <h2>
                It&apos;s the sum of
                <br /> everyone you&rsquo;ve ever met
              </h2>

              <p className="mt-3 large-text">
                Keep your content, your friends and followers
                <br /> between Atmosphere apps
              </p>
            </div>
            max-h-[80vh]
            <Image
              src="/why-atmosphere/section-2-1.png"
              alt="Grain photo sharing"
              width={329}
              height={576}
              className="absolute left-[4%] bottom-[16vh] w-[240px] h-auto"
            />
            <Image
              src="/why-atmosphere/section-2-2.png"
              alt="Sill reading"
              width={457}
              height={576}
              className="absolute left-[22%] bottom-[12vh] w-[340px] h-auto"
            />
            <Image
              src="/why-atmosphere/section-2-3.png"
              alt="Margin annotations"
              width={457}
              height={374}
              className="absolute left-[48%] bottom-[26vh] w-[340px] h-auto"
            />
          </FadeIn>

          <FadeIn
            as="section"
            id="your-content"
            className="snap-always snap-center h-screen w-screen relative"
          >
            <div className="absolute top-12 left-12 ">
              <h2>And everything you&rsquo;ve ever made</h2>
              <p className="large-text mt-3">
                Access your content, posts, and feeds
                <br /> across the Atmosphere to create seamlessly
                <br />
                between your many worlds
              </p>
            </div>
            <Image
              src="/why-atmosphere/section-3-1.png"
              alt="Bluesky"
              width={386}
              height={481}
              className="absolute -left-[64px] bottom-[214px] w-[280px] h-auto"
            />
            <Image
              src="/why-atmosphere/section-3-2.png"
              alt="Blacksky"
              width={386}
              height={481}
              className="absolute left-[138px] bottom-[140px] w-[280px] h-auto"
            />
            <Image
              src="/why-atmosphere/section-3-3.png"
              alt="Anisota"
              width={299}
              height={484}
              className="absolute left-[12px] bottom-[102px] w-[220px] h-auto"
            />
            <Image
              src="/why-atmosphere/section-3-4.png"
              alt="Leaflet"
              width={382}
              height={230}
              className="absolute left-[374px] bottom-[161px] w-[320px] h-auto"
            />
          </FadeIn>
          <InterconnectedAtmosphere />
        </div>
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
