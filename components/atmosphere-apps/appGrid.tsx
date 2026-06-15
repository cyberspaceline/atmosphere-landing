import { apps } from "./apps";

export const AppGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-x-9 gap-y-4 mx-auto pt-6">
      {apps.map((app) => {
        const Logo = app.logo;
        return (
          <div
            key={app.name}
            className="flex gap-4 items-center py-2 px-3 hover:animate- hover:bg-[#E2F2F9] hover:animate-wobble rounded-lg max-w-xs"
          >
            <Logo className="shrink-0" size={40} />{" "}
            <div className="flex flex-col text-left grow">
              <p className="font-bold">{app.name}</p>
              <p className="text-[1rem]">{app.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
