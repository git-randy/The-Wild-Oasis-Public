import { auth } from "~/app/_lib/auth";
import { getBookingById } from "~/app/_lib/data-service";

export const metadata = {
  title: "Edit Reservation",
};

export default async function Page({
  params,
}: {
  params: Promise<{ reservationId: number }>;
}) {
  const {reservationId} = await params

  const booking = await getBookingById(reservationId)
  // If resuing Reservation component, get all necessary data first

  return <div className="max-w-6xl mx-auto mt-8">Edit Reservation page</div>;
}
