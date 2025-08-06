"use client";

import { useOptimistic } from "react";
import { BookingWithCabin } from "~/app/_blueprints/booking";
import ReservationCard from "~/app/_components/ReservationCard";
import { deleteReservation } from "~/app/_lib/actions";

function ReservationList({ bookings }: { bookings: BookingWithCabin[] }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId)
    }
  );

  const handleDelete = async (bookingId: number) => {
    // Immediately show what the UI looks like after deletion
    optimisticDelete(bookingId)
    // Run the actual deletion in the background and hope it succeeds
    await deleteReservation(bookingId)
  }


  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard booking={booking} key={booking.id} onDelete={handleDelete}/>
      ))}
    </ul>
  );
}

export default ReservationList;
