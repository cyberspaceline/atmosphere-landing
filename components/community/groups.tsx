import type { ComponentType, ReactNode } from "react";
import { Grain, Margin, Sill } from "@/components/logos";
import type { LogoProps } from "@/components/logos/types";

/**
 * The three commenters are the same people in every group, and each keeps a
 * fixed spot on the stage — only the words inside their bubble change as the
 * groups cycle. See {@link BUBBLES} for the geometry and {@link GROUPS} for the
 * per-group copy.
 */
export type BubbleKey = "cozy" | "max" | "eva";

/** A fixed bubble slot: the avatar and speech bubble never move. */
export type Bubble = {
  key: BubbleKey;
  handle: string;
  avatar: string;
  /** Box position as percentages of the 796×593 stage. */
  box: { left: string; bottom: string };
  /** Avatar position/size as percentages of the stage. */
  avatarPos: { left: string; bottom: string };
  /** Where the bubble's tail sits, relative to the box. */
  tailClass: string;
};

export const BUBBLES: Bubble[] = [
  {
    key: "cozy",
    handle: "@cozylittle.house",
    avatar: "/your-community/avatar-cozy.png",
    box: { left: "80%", bottom: "47%" },
    avatarPos: { left: "89%", bottom: "39%" },
    tailClass: "translate-y-[100%] -mt-px bottom-0 left-[50%]",
  },
  {
    key: "max",
    handle: "@maxbittker.bsky.social",
    avatar: "/your-community/avatar-max.png",
    box: { left: "70%", bottom: "16%" },
    avatarPos: { left: "64%", bottom: "8%" },
    tailClass: "translate-y-[100%] -mt-px bottom-0 left-[45%]",
  },
  {
    key: "eva",
    handle: "@evakhoury.bsky.social",
    avatar: "/your-community/avatar-eva.png",
    box: { left: "29%", bottom: "18%" },
    avatarPos: { left: "35%", bottom: "12%" },
    tailClass: "translate-y-[100%] -mt-px bottom-0 left-[40%]",
  },
];

export type Group = {
  key: string;
  link: {
    text: string;
    appName: string;
    logo: ComponentType<LogoProps>;
    logoColor: string;
    pillBg: string;
    pillText: string;
  };
  example: { src: string; alt: string; border: string };
  /** One body of copy per fixed bubble slot. */
  bodies: Record<BubbleKey, ReactNode>;
};

const mention = "text-[#253bff]";

export const GROUPS: Group[] = [
  {
    key: "grain",
    link: {
      text: "Share photos with friends on",
      appName: "Grain",
      logo: Grain,
      logoColor: "white",
      pillBg: "#000000",
      pillText: "#ffffff",
    },
    example: {
      src: "/your-community/grain-example.png",
      alt: "A mossy forest photo shared on Grain",
      border: "#000000",
    },
    bodies: {
      cozy: (
        <>
          Drew something new for my personal site! It’s giving petri-core
          <br />
          <br />
          (that’s a word of the day pun lol)
        </>
      ),
      max: "Where’d you take the base picture? Moss is really the best.",
      eva: (
        <>
          omg this is great. it’s totally me and{" "}
          <span className={mention}>@maxbittker.bsky.social</span> whenever we
          go literally anywhere
        </>
      ),
    },
  },
  {
    key: "sill",
    link: {
      text: "Find the links everyone’s reading on",
      appName: "Sill",
      logo: Sill,
      logoColor: "#fffab0",
      pillBg: "#a96b00",
      pillText: "#fffab0",
    },
    example: {
      src: "/your-community/sill-example.png",
      alt: "“Seeking Truths Through Fiction” shared on Sill",
      border: "#a96b00",
    },
    bodies: {
      cozy: "Such a great read!",
      max: (
        <>
          <span className={mention}>@adapalmer.bsky.social</span>’s Terra Ignota
          series changed my life!
        </>
      ),
      eva: "I honestly don’t read a lot of fiction, but I need to change that. This article has me thinking...",
    },
  },
  {
    key: "margin",
    link: {
      text: "Annotate the web together with",
      appName: "Margin",
      logo: Margin,
      logoColor: "white",
      pillBg: "#006eff",
      pillText: "#ffffff",
    },
    example: {
      src: "/your-community/margin-example.png",
      alt: "A blog post annotated together on Margin",
      border: "#3464ff",
    },
    bodies: {
      cozy: "This is going to enable some seriously fun social shenanigans!",
      max: "permissioned data is going to be super important to the protocol going forward.",
      eva: "saving this for later...",
    },
  },
];
