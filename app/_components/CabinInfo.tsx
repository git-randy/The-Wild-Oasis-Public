import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { CabinData } from "~/app/_blueprints/cabin";
import TextExpander from "~/app/_components/TextExpander";
import noImage from "~/public/no-image.jpg";

function CabinInfo({ cabin }: { cabin: CabinData }) {
  const { max_capacity, image, name, description } = cabin;

  return (
    <div className="grid max-md:grid-rows-[1fr_1fr] gap-2 border border-primary-800 py-3 px-5 mb-12 md:grid-cols-[3.5fr_3fr] md:gap-8">
      <div className="relative scale-[1.0] lg:-translate-x-">
        <Image
          src={image || noImage}
          sizes="100dvh"
          fill
          className="object-cover"
          alt={`Cabin ${name}`}
          quality={50}
          priority
        />
      </div>

      <div>
        <h3
          className="text-accent-100 font-black text-3xl mb-2
          bg-primary-950 pt-6 pb-1 lg:text-7xl lg:mb-5"
        >
          Cabin {name}
        </h3>

        <p className="text-lg text-primary-300 mb-5 lg:mb-10">
          {description && <TextExpander description={description} />}
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{max_capacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of{" "}
              <span className="font-bold">Sognefjord</span> (Norway)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CabinInfo;
