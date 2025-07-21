import { CabinAPIData } from "~/app/_blueprints/cabin";
import CabinCard from "~/app/_components/CabinCard";
import { getCabins, getCabinsByCapacity } from "~/app/_lib/data-service";
// import { unstable_noStore as noStore } from "next/cache";

export default async function CabinList({filter}: {filter: string}) {
  // Opt out of caching for this component
  // noStore();
  let cabins: CabinAPIData[]
  if (filter === "any" || Number.isNaN(Number(filter))) {
    cabins = await getCabins();
  } else {
    cabins = await getCabinsByCapacity(Number(filter))
  }

  if (cabins.length === 0) {
    return <p>There are no cabins available for booking</p>;
  } else {
    return (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {cabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
    );
  }
}
