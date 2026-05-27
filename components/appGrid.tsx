import Image from "next/image";
import { apps } from "./apps";

export const AppGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-x-9 gap-y-4 mx-auto pt-6">
      {apps.map((app) => {
        return (
          <div
            key={app.name}
            className="flex gap-4 items-center p-3 hover:animate- hover:bg-[#39670F] hover:animate-wobble rounded-md"
          >
            <Image
              className="aspect-square shrink-0"
              src={app.logo}
              alt={`${app.name}'s logo`}
              width={48}
              height={32}
            />{" "}
            <div className="flex flex-col gap-1 text-left grow">
              <p className="font-bold ">{app.name}</p>
              <p className="text-[1rem]">{app.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
