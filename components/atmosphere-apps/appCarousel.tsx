import { apps } from "@/components/atmosphere-apps/apps";
import { GlassCard } from "@/components/card";

const CLOUD_WIDTH = 1040;
const CLOUD_HEIGHT = 480;

// Scattered, puffy-cloud arrangement for each app card. `float` tunes the
// gentle bob so neighbouring cards drift out of sync with one another.
const POSITIONS: Array<{
  x: number;
  y: number;
  /** Vertical drift in px (negative floats up). */
  distance: number;
  /** Seconds for one bob cycle. */
  duration: number;
  /** Negative offset so cards don't all start mid-air together. */
  delay: number;
}> = [
  { x: 60, y: 150, distance: -12, duration: 5.5, delay: -0.0 },
  { x: 210, y: 40, distance: -16, duration: 6.5, delay: -1.4 },
  { x: 180, y: 300, distance: -10, duration: 4.8, delay: -2.1 },
  { x: 360, y: 170, distance: -14, duration: 6.0, delay: -0.7 },
  { x: 380, y: 350, distance: -11, duration: 5.2, delay: -3.0 },
  { x: 430, y: 20, distance: -13, duration: 6.8, delay: -2.6 },
  { x: 560, y: 250, distance: -16, duration: 5.0, delay: -1.1 },
  { x: 600, y: 100, distance: -10, duration: 6.2, delay: -3.4 },
  { x: 580, y: 380, distance: -14, duration: 5.6, delay: -0.4 },
  { x: 740, y: 40, distance: -12, duration: 4.9, delay: -2.9 },
  { x: 760, y: 220, distance: -15, duration: 6.6, delay: -1.7 },
  { x: 770, y: 380, distance: -11, duration: 5.3, delay: -3.6 },
  { x: 910, y: 130, distance: -13, duration: 6.1, delay: -0.9 },
  { x: 930, y: 310, distance: -16, duration: 5.4, delay: -2.3 },
  { x: 80, y: 330, distance: -12, duration: 6.4, delay: -1.9 },
];

export const AppCloud = () => (
  <div
    className="relative w-full overflow-visible"
    style={{ height: CLOUD_HEIGHT }}
  >
    <div
      className="relative mx-auto"
      style={{ width: CLOUD_WIDTH, height: CLOUD_HEIGHT }}
    >
      {POSITIONS.map((pos, i) => {
        const app = apps[i];
        const Logo = app.logo;
        return (
          <div
            key={app.name}
            className="group absolute hover:z-50"
            style={{ left: pos.x, top: pos.y }}
          >
            <div
              className="app-float"
              style={{
                ["--float-distance" as string]: `${pos.distance}px`,
                animationDuration: `${pos.duration}s`,
                animationDelay: `${pos.delay}s`,
              }}
            >
              <div className="origin-center transition-transform duration-300 ease-out group-hover:scale-[1.18]">
                <GlassCard>
                  <div className="flex flex-col justify-center text-center">
                    <div className="mx-auto mb-1">
                      <Logo size={32} />
                    </div>
                    <h4 className=" font-bold">{app.name}</h4>
                    <p className="text-[.8rem] leading-snug">
                      {app.description}
                    </p>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export const AppCarousel = AppCloud;
