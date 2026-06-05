import Image from "next/image";
import { AppGlassCard } from "./card";
import { Grain, Margin, Sill } from "./logo";

export const GrainExample = () => {
  return (
    <div className="relative inline-block">
      <div className="absolute -top-[65px] left-[270px] h-[228px] w-[171px] overflow-hidden rounded-xl border border-[#206609]">
        <Image
          src="/friends/grain-ss.png"
          alt="A photo shared on Grain"
          fill
          className="object-cover pointer-events-none select-none"
        />
      </div>
      <AppGlassCard
        className="relative z-10 w-[358px]"
        description="Share and comment on photos on"
        logo={Grain}
        logoColor="white"
        appName="Grain"
        buttonClassName="bg-[#090b12] text-white"
      >
        <Image
          src="/friends/grain-comments.png"
          alt="Comments on a Grain photo"
          width={330}
          height={324}
          className="w-full h-auto"
        />
      </AppGlassCard>
    </div>
  );
};

export const MarginExample = () => {
  return (
    <div className="relative inline-block">
      <div className="absolute -top-[52px] -left-[29px] h-[130px] w-[233px] overflow-hidden rounded-xl border border-[#206609]">
        <Image
          src="/friends/margin-ss.png"
          alt="A webpage annotated with Margin"
          fill
          className="object-cover pointer-events-none select-none"
        />
      </div>
      <AppGlassCard
        className="relative z-10 w-[288px]"
        description="Annotate the internet together with"
        logo={Margin}
        logoColor="white"
        appName="Margin"
        buttonClassName="bg-[#006eff] text-white"
      >
        <Image
          src="/friends/margin-annotation.png"
          alt="An annotation thread in Margin"
          width={688}
          height={612}
          className="w-full h-auto"
        />
      </AppGlassCard>
    </div>
  );
};

export const SillExample = () => {
  return (
    <div className="relative inline-block">
      <div className="absolute -top-[79px] -left-[64px] h-[149px] w-[265px] overflow-hidden rounded-xl border border-[#206609]">
        <Image
          src="/friends/sill-ss.png"
          alt="A community feed on Sill"
          fill
          className="object-cover pointer-events-none select-none"
        />
      </div>
      <AppGlassCard
        className="relative z-10 w-[316px]"
        description="Find out what everyone’s reading on"
        logo={Sill}
        appName="Sill"
        buttonClassName="bg-[#a96b00] text-[#fffab0]"
      >
        <Image
          src="/friends/sill-share.png"
          alt="Friends sharing a read on Sill"
          width={1028}
          height={160}
          className="w-full h-auto"
        />
      </AppGlassCard>
    </div>
  );
};
