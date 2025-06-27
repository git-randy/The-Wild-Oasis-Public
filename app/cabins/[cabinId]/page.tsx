import { notFound } from "next/navigation";
import { Suspense } from "react";
import CabinInfo from "~/app/_components/CabinInfo";
import Reservation from "~/app/_components/Reservation";
import Spinner from "~/app/_components/Spinner";
import { getCabin, getCabins } from "~/app/_lib/data-service";

/*
  Fetch requests inside generateMetadata are memoized for the same data
  across generateMetadata.
  https://nextjs.org/docs/app/api-reference/functions/generate-metadata
*/
export async function generateMetadata({
  params,
}: {
  params: Promise<{ cabinId: number }>;
}) {
  const { cabinId } = await params
  const cabin = await getCabin(cabinId);

  if (!cabin) notFound()

  return { title: `Cabin ${cabin.name}` };
}

// Since we know what and how many cabin ids there will be, generate known
// cabin ids as a list of objects. The key should be the same name as the
// dynamic segment (folder name wrapped in sqaure brackets) and the value
// as a string, then return. This will make these pages static instead of dynamic
export async function generateStaticParams() {
  const cabins = await getCabins();

  // [{cabinId: "79"},...]
  const ids = cabins.map((cabin) => ({cabinId: String(cabin.id)}))
  return ids
}

export default async function Page({
  params,
}: {
  params: Promise<{ cabinId: number }>;
}) {
  const { cabinId } = await params;

  const cabin = await getCabin(cabinId);

  if (!cabin) {
    notFound()
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <CabinInfo cabin={cabin}/>
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve Cabin {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner text="Retrieving available dates..."/>}>
          <Reservation cabin={cabin}/>
        </Suspense>
      </div>
    </div>
  );
}
