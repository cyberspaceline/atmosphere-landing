import { AppCarousel } from "@/components/appCarousel";
import { AtmosphereHero } from "@/components/atmosphereHero";
import { AppGrid } from "@/components/appGrid";
import { FadeIn } from "@/components/fadeIn";
import { NoEnshittification } from "@/components/noEnshittification";
import { InterconnectedAtmosphere } from "@/components/whatIsAtmosphere";
import Image from "next/image";
import { GlassCard } from "@/components/card";
import { GrainExample, MarginExample, SillExample } from "@/components/friends";
import {
  AnisotaExample,
  BlackskyExample,
  BlueskyExample,
  LeafletExample,
} from "@/components/contentExamples";

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

      {/* positioned house */}
      <div className="relative w-screen">
        <div className="sticky z-40 top-0 h-screen pointer-events-none">
          <div className="house absolute right-12 bottom-12  max-h-[45rem] w-[70vw] max-w-[54.72rem] max-w-[54.72rem] aspect-[2004/1648]">
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

            <div className="townWrapper absolute right-12 bottom-12 max-h-[45rem] w-[70vw] max-w-[54.72rem] aspect-[2004/1648] mt-32 flex items-center justify-center z-50 overflow-hidden pointer-events-none">
              <Image
                src="/what-is-atmosphere/town.png"
                alt=""
                fill
                className="townBG object-contain object-bottom select-none pointer-events-none"
                priority
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
            <div className="placeholder absolute right-12 bottom-12 max-h-[45rem] w-[70vw] max-w-[54.72rem] aspect-[2004/1648]">
              <div className="relative w-full h-full">
                <div className="absolute right-[28%] -translate-x-1/2 translate-y-1/2 bottom-[38%]">
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
              </div>
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
            <div className="placeholder absolute right-12 bottom-12  max-h-[45rem] w-[70vw] max-w-[54.72rem] aspect-[2004/1648]">
              <div className="relative w-full h-full">
                <div className="absolute top-[10%] left-[53%] z-10 hover:z-50">
                  <GrainExample />
                </div>

                <div className="absolute top-[19%] left-[16%] z-20 hover:z-50">
                  <MarginExample />
                </div>
                <div className="absolute top-[62%] -left-[16%] z-30 hover:z-50">
                  <SillExample />
                </div>
              </div>
            </div>
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
            <div className="placeholder absolute right-12 bottom-12  max-h-[45rem] w-[70vw] max-w-[54.72rem] aspect-[2004/1648]">
              <div className="relative w-full h-full">
                <div className="absolute -top-[12%] left-[54%] z-10 hover:z-50">
                  <BlueskyExample />
                </div>
                <div className="absolute top-[2%] left-[37%] z-20 hover:z-50">
                  <BlackskyExample />
                </div>
                <div className="absolute top-[9%] left-[14%] z-30 hover:z-50">
                  <AnisotaExample />
                </div>
                <div className="absolute top-[30%] -left-[22%] z-40 hover:z-50">
                  <LeafletExample />
                </div>
              </div>
            </div>
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
