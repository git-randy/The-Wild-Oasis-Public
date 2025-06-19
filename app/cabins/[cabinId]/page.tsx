import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCabin } from "~/app/_lib/data-service";
import noImage from "~/public/no-image.jpg";

/*
  Fetch requests inside generateMetadata are memoized for the same data
  across generateMetadata.
  https://nextjs.org/docs/app/api-reference/functions/generate-metadata
*/
export async function generateMetadata({
  params,
}: {
  params: { cabinId: number };
}) {
  const cabin = await getCabin(params.cabinId);

  if (!cabin) notFound()

  return { title: `Cabin ${cabin.name}` };
}

export default async function Page({
  params,
}: {
  params: { cabinId: number };
}) {
  const cabin = await getCabin(params.cabinId);

  if (!cabin) {
    notFound()
  }

  const { name, max_capacity, image, description } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image
            src={image || noImage}
            fill
            className="object-cover"
            alt={`Cabin ${name}`}
          />
        </div>

        <div>
          <h3
            className="text-accent-100 font-black text-7xl mb-5
          bg-primary-950 pt-6 pb-1 pr-0 w-[150%] right-0"
          >
            Cabin {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">{description}</p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{max_capacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
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

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}
