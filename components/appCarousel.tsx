import { apps } from "@/components/apps";
import { GlassCard } from "@/components/card";

const TRACK_WIDTH = 2100;
const TRACK_HEIGHT = 600;
const SCROLL_SECONDS = 16;

const POSITIONS: Array<{ x: number; y: number }> = [
  { x: 40, y: 70 },
  { x: 230, y: 230 },
  { x: 70, y: 380 },
  { x: 470, y: 10 },
  { x: 380, y: 220 },
  { x: 520, y: 340 },
  { x: 700, y: 100 },
  { x: 660, y: 290 },
  { x: 820, y: 380 },
  { x: 910, y: 50 },
  { x: 1010, y: 240 },
  { x: 1150, y: 380 },
  { x: 1340, y: 120 },
  { x: 1530, y: 290 },
  { x: 1820, y: 380 },
];

const Track = ({
  ariaHidden = false,
  left,
}: {
  ariaHidden?: boolean;
  left: number;
}) => (
  <div
    style={{
      position: "absolute",
      left,
      top: 0,
      width: TRACK_WIDTH,
      height: TRACK_HEIGHT,
    }}
    aria-hidden={ariaHidden || undefined}
  >
    {POSITIONS.map((pos, i) => {
      const app = apps[i];
      const Logo = app.logo;
      return (
        <div
          key={app.name}
          className="absolute"
          style={{ left: pos.x, top: pos.y }}
        >
          <GlassCard>
            <div className="flex flex-col justify-center text-center">
              <div className="mx-auto mb-3">
                <Logo size={48} />
              </div>
              <h3 className="pb-1">{app.name}</h3>
              <p>{app.description}</p>
            </div>
          </GlassCard>
        </div>
      );
    })}
  </div>
);

export const AppCarousel = () => (
  <div
    className="overflow-hidden w-screen -mx-12"
    style={{ height: TRACK_HEIGHT }}
  >
    <div
      style={{
        position: "relative",
        width: TRACK_WIDTH * 2,
        height: TRACK_HEIGHT,
        animation: `app-carousel-scroll ${SCROLL_SECONDS}s linear infinite`,
      }}
    >
      <Track left={0} />
      <Track ariaHidden left={TRACK_WIDTH} />
    </div>
  </div>
);
