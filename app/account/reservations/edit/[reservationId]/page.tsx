import { notFound } from "next/navigation";
import { Suspense } from "react";
import CabinInfo from "~/app/_components/CabinInfo";
import EditReservation from "~/app/account/reservations/edit/_components/EditReservation";
import Spinner from "~/app/_components/Spinner";
import {
  getBookedDatesByCabinId,
  getBookingById,
  getSettings,
} from "~/app/_lib/data-service";

export const metadata = {
  title: "Edit Reservation",
};

export default async function Page({
  params,
}: {
  params: Promise<{ reservationId: number }>;
}) {
  const { reservationId } = await params;

  const reservation = await getBookingById(reservationId);

  if (!reservation) {
    notFound();
  }

  const [bookedDates, settings] = await Promise.all([
    getBookedDatesByCabinId(reservation.cabin_id),
    getSettings(),
  ]);

  const { cabins: cabin } = reservation;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <CabinInfo cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Edit your reservation. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner text="Retrieving available dates..." />}>
          <EditReservation
            reservation={reservation}
            bookedDates={bookedDates}
            settings={settings}
          />
        </Suspense>
      </div>
    </div>
  );
}
