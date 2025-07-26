"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import Link from "next/link";
import { useReservation } from "~/app/_context/ReservationContext";

function ReservationReminder() {
  const { reservation, clearDateRange } = useReservation();

  if (!reservation.dateRange?.from || !reservation.dateRange?.to) {
    return null;
  } else {
    return (
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 py-5 px-8 rounded-full
      bg-accent-500 text-primary-800 text font-semibold shadow-xl
      shadow-slate-900 flex gap-8 items-center`}
      >
        <Link
          href={`/cabins/${reservation.cabinId}`}
          className="hover:text-primary-500"
        >
          <span>👋</span> Do not forget to reserve your dates <br /> from{" "}
          {format(new Date(reservation.dateRange.from), "MMM dd yyyy")} to{" "}
          {format(new Date(reservation.dateRange.to), "MMM dd yyyy")}
        </Link>
        <button
          className="rounded-full p-1 hover:bg-accent-600 transition-all"
          onClick={clearDateRange}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    );
  }
}

export default ReservationReminder;
