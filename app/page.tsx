import { AppCarousel } from "@/components/appCarousel";
import { AppGrid } from "@/components/appGrid";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center px-12 ">
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

      <div
        id="what-is-atmosphere"
        className="flex flex-col justify-center text-center gap-6 pt-32"
      >
        <h2 className="text-center">The Atmosphere is an Social Scene</h2>
        <div className="flex flex-col gap-3">
          <p className="large-text">
            Real people, friends, and neighbors, <br />
            and a network of social apps connecting them.
          </p>
          <p className="large-text">Connecting you.</p>
          <div className="h-80 w-full bg-[#1A2C0A]" />
        </div>
      </div>

      <div className="sticky-house-group relative grid -mx-12 mt-32 text-[#1a2c0a]">
        <div className="row-start-1 col-start-1 sticky top-0 h-screen bg-[#d0dade] flex items-end justify-center overflow-hidden pointer-events-none z-0">
          <Image
            src="/sections/house.png"
            alt=""
            width={1128}
            height={928}
            className="w-[60vw] max-w-[900px] h-auto"
            priority
          />
        </div>

        <div className="row-start-1 col-start-1 relative z-10">
          <section className="snap-section h-screen relative px-12">
            <div className="absolute top-16 right-12 max-w-[560px] text-right">
              <h2>One account everywhere</h2>
              <p className="large-text mt-4">
                One account signs you into every Atmosphere app.
              </p>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[28vh]">
              <Image
                src="/sections/section-1-card.png"
                alt="Eva Khoury profile card"
                width={213}
                height={193}
                className="w-[220px] h-auto"
              />
            </div>
          </section>

          <section className="snap-section h-screen relative px-12">
            <div className="absolute top-16 right-12 max-w-[460px] text-right">
              <h2>With everyone you&rsquo;ve ever met</h2>
              <p className="large-text mt-6">
                Try out new experiences, never start from scratch.
              </p>
              <p className="mt-4">
                Your content, your friends and followers are already waiting for
                you in every atmosphere app
              </p>
            </div>
            <Image
              src="/sections/section-2-1.png"
              alt="Grain photo sharing"
              width={329}
              height={576}
              className="absolute left-[4%] bottom-[16vh] w-[240px] h-auto"
            />
            <Image
              src="/sections/section-2-2.png"
              alt="Sill reading"
              width={457}
              height={576}
              className="absolute left-[22%] bottom-[12vh] w-[340px] h-auto"
            />
            <Image
              src="/sections/section-2-3.png"
              alt="Margin annotations"
              width={457}
              height={374}
              className="absolute left-[48%] bottom-[26vh] w-[340px] h-auto"
            />
          </section>

          <section className="snap-section h-screen relative px-12">
            <div className="absolute top-16 right-12 max-w-[460px] text-right">
              <h2>and everything you&rsquo;ve ever made</h2>
              <p className="large-text mt-6">
                Leverage all your content, posts, and feeds across The
                Atmosphere
              </p>
              <p className="mt-4">
                Create and connect seamlessly between your many worlds
              </p>
            </div>
            <Image
              src="/sections/section-3-1.png"
              alt="Bluesky"
              width={386}
              height={481}
              className="absolute left-[5%] bottom-[18vh] w-[280px] h-auto"
            />
            <Image
              src="/sections/section-3-2.png"
              alt="Blacksky"
              width={386}
              height={481}
              className="absolute left-[22%] bottom-[12vh] w-[280px] h-auto"
            />
            <Image
              src="/sections/section-3-3.png"
              alt="Anisota"
              width={299}
              height={484}
              className="absolute left-[40%] bottom-[16vh] w-[220px] h-auto"
            />
          </section>
        </div>
      </div>

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
