import { GlassCard } from "@/components/card";
import Image from "next/image";

export const WhyAtmosphere = () => {
  return (
    <div>
      <div className="sticky-house-group relative grid -mx-12 mt-32">
        <div className="row-start-1 col-start-1 sticky top-0 h-screen flex items-center justify-center overflow-hidden pointer-events-none z-0">
          <Image
            src="/why-atmosphere/house.png"
            alt=""
            width={1128}
            height={928}
            className="w-[60vw] max-w-[900px] h-auto mt-24"
            priority
          />
        </div>

        <div className="row-start-1 col-start-1 relative z-10">
          <section className="snap-section h-screen w-screen flex items-center justify-center">
            <div className=" w-[60vw] max-w-[900px] bg-pink aspect-6/5 relative  mx-auto mt-24">
              <div className="absolute -top-16 -right-12  text-right">
                <h2>This is your account.</h2>
                <p className="large-text mt-4">
                  This one account signs you into every Atmosphere app.
                </p>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 bottom-36">
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
          </section>

          <section className="snap-section h-screen w-screen flex items-center justify-center">
            <div className=" w-[60vw] max-w-[900px] bg-pink aspect-6/5 relative  mx-auto mt-24">
              <div className="absolute -top-16 -right-12 text-right">
                <h2>
                  It remembers
                  <br /> everyone you&rsquo;ve ever met
                </h2>

                <p className="mt-3 large-text">
                  Keep your content, your friends and followers
                  <br /> between Atmosphere apps
                </p>
              </div>
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
            </div>
          </section>

          <section className="snap-section h-screen w-screen flex items-center justify-center">
            <div className=" w-[60vw] max-w-[900px] bg-pink aspect-6/5 relative  mx-auto mt-24">
              {" "}
              <div className="absolute -top-16 -right-12  text-right">
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
                className="absolute left-[5%] bottom-[18vh] w-[280px] h-auto"
              />
              <Image
                src="/why-atmosphere/section-3-2.png"
                alt="Blacksky"
                width={386}
                height={481}
                className="absolute left-[22%] bottom-[12vh] w-[280px] h-auto"
              />
              <Image
                src="/why-atmosphere/section-3-3.png"
                alt="Anisota"
                width={299}
                height={484}
                className="absolute left-[40%] bottom-[16vh] w-[220px] h-auto"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
