"use client";

import {
  BookedDatesAPIData,
  BookingWithCabin,
} from "~/app/_blueprints/booking";
import { SettingsAPIData } from "~/app/_blueprints/settings";
import EditDateSelector from "~/app/account/reservations/edit/_components/EditDateSelector";
import EditReservationForm from "~/app/account/reservations/edit/_components/EditReservationForm";
import { EditProvider } from "~/app/_context/EditContext";

function EditReservation({
  reservation,
  bookedDates,
  settings,
}: {
  reservation: BookingWithCabin;
  bookedDates: BookedDatesAPIData[];
  settings: SettingsAPIData;
}) {
  const { cabins: cabin, ...booking } = reservation;

  const filteredBookedDates = bookedDates.filter((bookedDate) =>
    bookedDate.start_date !== booking.start_date &&
    bookedDate.end_date !== booking.end_date
      ? true
      : false
  );

  return (
    <EditProvider>
        <div className="grid grid-rows-2 border border-primary-800 min-h-[400px] w-full">
          <EditDateSelector
            settings={settings}
            bookedDates={filteredBookedDates}
            cabin={cabin}
            customerBooking={booking}
          />
          <EditReservationForm cabin={cabin} reservation={booking} />
        </div>
    </EditProvider>
  );
}

export default EditReservation;
