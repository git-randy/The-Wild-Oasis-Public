"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "~/app/_components/SpinnerMini";
import { deleteReservation } from "~/app/_lib/actions";

function DeleteReservation({ bookingId }: { bookingId: number }) {
  const [isPending, startTranstion] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you wantt to delete this reservation?")) {
      startTranstion(() => deleteReservation(bookingId));
    }
  };

  return (
    <button
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
      onClick={handleDelete}
      disabled={isPending}
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
