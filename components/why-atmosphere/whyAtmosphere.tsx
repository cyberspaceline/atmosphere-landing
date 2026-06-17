"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { TownWrapper } from "../townWrapper";
import { BlueskyPost, BlackskyPost } from "./microblogging";
import { PcktPost, OffprintPost, LeafletPost } from "./publishers";
import Image from "next/image";

/** How long each environment stays fully visible before the next fades in (ms). */
const CYCLE_INTERVAL = 3500;

/** Beat of empty town shown when the section enters view, before the sequence starts (ms). */
const INITIAL_DELAY = 1200;

type CardDef = {
  /** A glass-card post component. */
  Post: ComponentType;
  /** Absolute-position utility classes within the town wrapper. */
  pos: string;
};

type Environment = {
  key: string;
  /** Backdrop image layered over the town. */
  image: string;
  cards: CardDef[];
};

/**
 * The environments cycle over the always-present town — forest, cloud, and pond,
 * fading one into the next in sequence.
 */
const ENVIRONMENTS: Environment[] = [
  {
    key: "forest",
    image: "/town/town-forest.png",
    cards: [
      { Post: PcktPost, pos: "bottom-[55%] left-[86.5%]" },
      { Post: OffprintPost, pos: "bottom-[39%] left-[20%]" },
      { Post: LeafletPost, pos: "bottom-[8%] left-[47.5%]" },
    ],
  },
  {
    key: "cloud",
    image: "/town/town-cloud.png",
    cards: [
      { Post: BlueskyPost, pos: "-top-[7%] right-[5%]" },
      { Post: BlackskyPost, pos: "top-[41%] left-[17%]" },
    ],
  },
  // {
  //   key: "pond",
  //   image: "/town/town-pond.png",
  //   cards: [
  //     { Post: BlueskyPost, pos: "-top-[7%] right-[5%]" },
  //     { Post: BlackskyPost, pos: "top-[41%] left-[17%]" },
  //   ],
  // },
];

export function WhyAtmosphere() {
  // -1 means no environment is showing yet — just the empty town.
  const [active, setActive] = useState(-1);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Track when the town section is on screen.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // On entering view, hold on the empty town for a beat, then begin the sequence.
  // Leaving view resets back to the empty town so it replays on the next visit.
  useEffect(() => {
    if (!inView) {
      setActive(-1);
      return;
    }
    const start = setTimeout(() => setActive(0), INITIAL_DELAY);
    return () => clearTimeout(start);
  }, [inView]);

  // Advance through the environments once started; hovering a card pauses it.
  useEffect(() => {
    if (!inView || paused || active < 0) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % ENVIRONMENTS.length);
    }, CYCLE_INTERVAL);
    return () => clearInterval(id);
  }, [inView, paused, active]);

  return (
    <div
      ref={ref}
      className="w-screen h-screen relative snap-center snap-always"
    >
      <div className="absolute top-12 left-12 z-40 pointer-events-none">
        <h2>
          Here, the world is always changing,
          <br /> but you will always be you
        </h2>
        <p className="large-text mt-3">
          The Atmosphere is you and your community.
        </p>
        <p className="large-text mt-2">
          The Apps are your medium for
          <br />
          connecting, sharing, and evolving.
        </p>
      </div>

      {/* the town — always present, beneath every environment */}
      <TownWrapper className="townBG" z={0}>
        <Image
          src="/town/town.png"
          alt=""
          fill
          className="object-contain object-bottom select-none pointer-events-none"
          priority
        />
      </TownWrapper>

      {ENVIRONMENTS.map((env, i) => {
        const visible = i === active;
        return (
          <div key={env.key}>
            {/* backdrop: sits between townBG (z-0) and townFG (z-20) */}
            {env.image && (
              <div
                aria-hidden={!visible}
                className="absolute inset-0 z-10 transition-opacity duration-1000 ease-in-out"
                style={{ opacity: visible ? 1 : 0 }}
              >
                <TownWrapper>
                  <Image
                    src={env.image}
                    alt=""
                    fill
                    className="object-contain object-bottom select-none pointer-events-none"
                  />
                </TownWrapper>
              </div>
            )}

            {/* content cards: sit above townFG (z-20) */}
            {env.cards && (
              <div
                aria-hidden={!visible}
                className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-1000 ease-in-out"
                style={{ opacity: visible ? 1 : 0 }}
              >
                <TownWrapper>
                  <div className="relative w-full h-full">
                    {env.cards.map(({ Post, pos }, ci) => (
                      <div
                        key={ci}
                        className={`absolute ${pos} z-50 -translate-x-1/2 ${
                          visible
                            ? "pointer-events-auto"
                            : "pointer-events-none"
                        }`}
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                      >
                        <Post />
                      </div>
                    ))}
                  </div>
                </TownWrapper>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
