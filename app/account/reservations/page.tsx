import { BookingAPIData } from "~/app/_blueprints.ts/booking";
import ReservationCard from "~/app/_components/ReservationCard";

export const metadata = {
  title: "Reservations"
}

export default function Page() {
  // CHANGE
  // const bookings: BookingAPIData[] = [{
  //   id: 1,
  //   created_at: "2025-04-19 00:06:01.641+00",
  //   start_date: "2025-05-09 00:00:00",
  //   end_date: "2025-05-16 00:00:00",
  //   num_guests: 4,
  //   num_nights: 7,
  //   total_price: 2000,
  //   status: "unconfirmed",
  //   guest_id: 1,
  //   cabins: {id: 1, name: "001", image:"", regularPrice: 2000, maxCapacity: 4}
  // }];

  const bookings: BookingAPIData[] = []

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
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
