import Link from "next/link";
import ReservationCard from "@components/ReservationCard";
import { auth } from "~/app/_lib/auth";
import { BookingWithCabin } from "~/app/_blueprints/booking";
import { getBookings, getGuest } from "~/app/_lib/data-service";
import { GuestAPIData } from "~/app/_blueprints/guest";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session = await auth();
  const guest: GuestAPIData | null = session?.user?.email
    ? await getGuest(session.user.email)
    : null;
  const bookings: BookingWithCabin[] = guest?.id
    ? await getBookings(guest.id)
    : [];

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
