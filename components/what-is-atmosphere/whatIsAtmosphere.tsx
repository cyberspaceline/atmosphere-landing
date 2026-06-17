"use client";

import { FadeIn } from "@/components/fadeIn";
import { TownWrapper } from "@/components/townWrapper";
import Image from "next/image";
import { GlassCard } from "@/components/card";
import { FriendGroups } from "@/components/your-friends/friendGroups";

export function WhatIsAtmosphere() {
  return (
    <>
      <div
        id="section-what-is-atmosphere"
        className="w-screen h-screen snap-always snap-center relative z-0"
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
            className="townBG object-contain object-bottom select-none pointer-events-none"
            priority
          />
        </TownWrapper>
      </div>
      <FadeIn
        as="section"
        id="account"
        className="snap-always snap-center h-screen w-screen relative z-20"
      >
        <div className="absolute top-12 left-12 ">
          <h2>
            This is <em>your</em> account.
          </h2>
          <p className="large-text mt-3">
            It comes with you to every
            <br />
            Atmosphere app you use
          </p>
        </div>
        <TownWrapper>
          <div className="relative w-full h-full">
            <div className="absolute inset-0">
              <Image
                src="/town/house-self.png"
                alt=""
                fill
                className="object-contain object-bottom select-none pointer-events-none"
              />
            </div>
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
        </TownWrapper>
      </FadeIn>

      <FadeIn
        as="section"
        id="your-content"
        className="snap-always snap-center h-screen w-screen relative z-20"
      >
        <div className="absolute top-12 left-12 ">
          <h2>It remembers all the things you’ve made</h2>
          <p className="large-text mt-3">
            So you can build your content, posts, and feeds anywhere
            <br /> and access them everywhere
          </p>
        </div>
        <TownWrapper>
          <div className="relative w-full h-full">
            <div className="absolute inset-0">
              <Image
                src="/town/house-content.png"
                alt=""
                fill
                className="object-contain object-bottom select-none pointer-events-none"
              />
            </div>

            {/*<div className="absolute -top-[12%] left-[54%] z-10 hover:z-50">
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
            </div>*/}
          </div>
        </TownWrapper>
      </FadeIn>
      <FadeIn
        as="section"
        id="your-friends"
        className="snap-always snap-center h-screen w-screen relative z-20"
      >
        <div className="absolute top-12 left-12">
          <h2>
            And the people
            <br /> and places you love
          </h2>

          <p className="mt-3 large-text">
            Keeping your friends and community with you
            <br /> across all Atmosphere apps
          </p>
        </div>

        <FriendGroups />

        <TownWrapper>
          <div className="relative w-full h-full">
            <div className="absolute inset-0">
              <Image
                src="/town/house-friend.png"
                alt=""
                fill
                className="object-contain object-bottom select-none pointer-events-none"
              />
              <div className="absolute inset-0">
                <Image
                  src="/town/houses.png"
                  alt=""
                  fill
                  className="object-contain object-bottom select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
        </TownWrapper>
      </FadeIn>
    </>
  );
}
