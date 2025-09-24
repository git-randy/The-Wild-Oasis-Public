import { Suspense } from "react";
import AISupportChat from "~/app/_components/AISupportChat";
import CabinList from "~/app/_components/CabinList";
import Filter from "~/app/_components/Filter";
import ReservationReminder from "~/app/_components/ReservationReminder";
import Spinner from "~/app/_components/Spinner";

// Revalidate data every x seconds. Only applies to statically generated pages
// export const revalidate = 3600;
// Since searchParams was added, the page cannot know ahead of time what the
// value will be, so this page is now dynamic and revalidating is obsolete.

export const metadata = {
  title: "Cabins",
};

// Server components re-render whenever searchParams changes
// (when navigation changes).
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{[key: string]: string}>;
}) {
  const filter = (await searchParams)?.capacity ?? "any";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins located in the Stavanger region of Norway.
        Imagine waking up to beautiful views of the fjords, spending your days
        exploring the vast inlets around, or just relaxing in your private hot
        tub under the stars. Enjoy nature&apos;s beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation.
      </p>

      <div className="flex justify-end mb-8">
        {/* Filter changes navigation based on user input */}
        <Filter/>
      </div>

      {/*
        Suspense will only render the fallback on inital load.
        Assign the key prop a value which will make the fallback re-render
        whenever the value changes
      */}
      <Suspense
        name="SuspendedCabinList"
        fallback={<Spinner text="Loading cabins..." />}
        key={filter}
      >
        <CabinList filter={filter}/>
        <ReservationReminder/>
        <AISupportChat/>
      </Suspense>
    </div>
  );
}
