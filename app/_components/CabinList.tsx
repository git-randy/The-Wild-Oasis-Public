import { CabinAPIData } from "~/app/_blueprints.ts/cabin";
import CabinCard from "~/app/_components/CabinCard";
import { getCabins } from "~/app/_lib/data-service";

export default async function CabinList() {
  const cabins: CabinAPIData[] = await getCabins();

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
