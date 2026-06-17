import Image from "next/image";
import { FadeIn } from "./fadeIn";

export const NoEnshittification = () => {
  return (
    <FadeIn className="snap-start snap-always mt-32 mx-auto w-full px-6 max-w-[720px] h-screen  flex place-items-center">
      <div className="h-fit mx-auto text-center">
        <h2 className="text-center text-[2.25rem]">Built to only get better</h2>
        <div className="mx-auto max-w-150 h-auto px-6 py-6">
          <Image
            src="/no-enshittification/bench.png"
            alt=""
            width={1614}
            height={1103}
            className="mx-auto w-[600px] h-auto pointer-events-none select-none"
          />
        </div>
        <p className="flex flex-col gap-4 text-center text-pretty font-bold ">
          Atmosphere apps are like branches of a tree.
        </p>
        <div className="flex flex-col gap-4 text-[1.25rem] text-center text-pretty">
          <p>
            If it goes down, breaks, or just stops being good, you can climb a
            new branch, use a new app.
          </p>

          <p>
            All these apps use the same network, the same rich soil, so all the
            same content and connections are already seamlessly there. No
            migrating, no deleting, not even a new account.
          </p>
          <p>
            If Bluesky isn&apos;t for you, use Blacksky, Witchsky, Mu, or
            Anisota.You are free to choose the best option for <em>you.</em>
          </p>
        </div>
      </div>
    </FadeIn>
  );
};
