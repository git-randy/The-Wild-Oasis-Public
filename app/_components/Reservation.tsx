import { CabinAPIData } from "~/app/_blueprints.ts/cabin";
import DateSelector from "~/app/_components/DateSelector";
import ReservationForm from "~/app/_components/ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "~/app/_lib/data-service";

async function Reservation({ cabin }: { cabin: CabinAPIData }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px] w-full">
      <DateSelector
        settings={settings}
        bookings={bookedDates}
        cabin={cabin}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default Reservation;
