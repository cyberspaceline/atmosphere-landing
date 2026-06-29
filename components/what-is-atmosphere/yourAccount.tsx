"use client";

import { FadeIn } from "@/components/fadeIn";
import { TownWrapper } from "@/components/townWrapper";
import Image from "next/image";
import { PopoverArrow } from "../PopoverArrow";
import { FLOAT_CLASS, floatStyle } from "@/lib/float";

export function YourAccount() {
  return (
    <FadeIn
      as="section"
      id="account"
      className="snap-always snap-center h-screen w-full max-w-[1400px] mx-auto relative z-20"
    >
      <div className="absolute top-16 left-16 ">
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
          <div
            className={`${FLOAT_CLASS} absolute -translate-x-1/2 left-[42%]  bottom-[22%]`}
            style={floatStyle()}
          >
            <div className="max-w-fit! rounded-lg  bg-[rgba(255,255,255,.6)] p-4 py-5 border border-[#CFDDE0]">
              <div className="flex flex-col justify-center text-center mx-auto gap-1">
                <Image
                  src="/your-account/eva.png"
                  alt="Eva Khoury's profile image"
                  width={64}
                  height={64}
                  className="overflow-hidden rounded-full mx-auto mb-4"
                />
                <h3>Eva Khoury</h3>
                <p>@evakhoury.bsky.social</p>
              </div>
            </div>
            <div className="absolute -translate-x-1/2 -bottom-[15px] left-1/2">
              <PopoverArrow fill="rgba(255, 255, 255, .6)" stroke="#CFDDE0" />
            </div>
          </div>
        </div>
      </TownWrapper>
    </FadeIn>
  );
}
