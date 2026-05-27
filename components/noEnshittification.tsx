import Image from "next/image";

export const NoEnshittification = () => {
  return (
    <div className="mt-32 mx-auto w-full max-w-[1040px]">
      <div className="bg-[#193315] rounded-2xl px-16 py-[69px] text-white">
        <h2 className="text-center text-[2.25rem]">
          And it cannot enshittify
        </h2>

        <div className="mt-16 flex items-center justify-between gap-8 max-w-[909px] mx-auto">
          <p className="large-text text-right max-w-[335px]">
            Normal social medias succeed by locking up your data.
          </p>
          <Image
            src="/no-enshittification/plant.png"
            alt=""
            width={755}
            height={821}
            className="w-[142px] h-auto shrink-0"
          />
          <p className="large-text max-w-[350px]">
            They hold it hostage to stop you from leaving, even if there&rsquo;s
            something better out there
          </p>
        </div>

        <hr className="my-12 border-t border-white/30" />

        <div className="relative w-full max-w-[934px] mx-auto h-[680px]">
          <p className="absolute top-0 right-0 w-[471px] large-text text-center">
            Atmosphere apps put all the data in the open.
            <br />
            It&rsquo;s a free resource, like air and water.
          </p>
          <Image
            src="/no-enshittification/island.png"
            alt=""
            width={1614}
            height={1103}
            className="absolute top-[68px] left-[19px] w-[847px] h-auto pointer-events-none select-none"
          />
          <p className="absolute top-[564px] left-0 w-[471px] large-text text-right">
            Apps that use this public resource
            <br />
            cannot own you or force you to stay.
            <br />
            <br />
            Instead, these apps succeed by working together for YOU.
          </p>
        </div>
      </div>
    </div>
  );
};
