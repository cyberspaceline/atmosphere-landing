import Image from "next/image";

export const NoEnshittification = () => {
  return (
    <div className="mt-32 mx-auto w-full max-w-[1040px]">
      <div className="bg-[#193315] rounded-2xl px-16 py-[69px] text-white">
        <h2 className="text-center text-[2.25rem]">And it cannot enshittify</h2>

        <div className="mt-16 flex items-center justify-center gap-4 max-w-[909px] mx-auto">
          <p className=" text-right max-w-[335px]">
            Normal social medias succeed
            <br /> by locking up your data.
          </p>
          <Image
            src="/no-enshittification/plant.png"
            alt=""
            width={755}
            height={821}
            className="w-[142px] h-auto shrink-0"
          />
          <p className="max-w-[350px]">
            They hold it hostage to stop you from leaving, even if there&rsquo;s
            something better out there
          </p>
        </div>

        <hr className="my-12 border-t border-white/30" />

        <div className="relative w-full max-w-[600px] mx-auto h-[500px]">
          <p className="absolute top-12 -right-8   text-center">
            Atmosphere apps put all the data in the open.
            <br />
            It&rsquo;s a free resource, like air and water.
          </p>
          <Image
            src="/no-enshittification/island.png"
            alt=""
            width={1614}
            height={1103}
            className="absolute top-[68px] left-[19px] w-[600px] h-auto pointer-events-none select-none"
          />
          <p className="absolute top-[380px] left-0  text-left pb-8">
            Apps that use this public resource
            <br />
            cannot own you or force you to stay.
            <br />
            <br />
            <strong>
              Instead, these apps succeed <br />
              by working together for YOU.
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};
