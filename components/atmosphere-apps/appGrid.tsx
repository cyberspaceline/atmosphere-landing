import { apps } from "./apps";

export const AppGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-x-9 gap-y-4 mx-auto pt-6">
      {apps.map((app) => {
        const Logo = app.logo;
        return (
          <div key={app.name} className="group relative max-w-xs">
            {/* Hard-lined drop shadow — stays at the original footprint, appears instantly (no fade, no movement) */}
            <div className="absolute inset-0 rounded-lg bg-[#1F3A47] opacity-0 group-hover:opacity-100" />
            <div className="relative flex gap-4 items-center py-2 px-3 rounded-lg border border-transparent transition-transform duration-200 ease-out group-hover:bg-[#E2F2F9] group-hover:border-[#1F3A47] group-hover:-translate-x-[6px] group-hover:translate-y-[4px]">
              <Logo className="shrink-0" size={40} />{" "}
              <div className="flex flex-col text-left grow">
                <p className="font-bold">{app.name}</p>
                <p className="text-[1rem]">{app.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
