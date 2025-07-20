"use client";

import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { BookedDatesAPIData } from "~/app/_blueprints/booking";
import { CabinAPIData } from "~/app/_blueprints/cabin";
import { SettingsAPIData } from "~/app/_blueprints/settings";
import { useReservation } from "~/app/_context/ReservationContext";
import { datesOverlap, getBookedDatesByMonth } from "~/app/_lib/utilities";

type DateSelectorProps = {
  settings: SettingsAPIData;
  bookings: BookedDatesAPIData[];
  cabin: CabinAPIData;
};

function DateSelector({ settings, bookings, cabin }: DateSelectorProps) {
  const { dateRange, setDateRange, clearDateRange } = useReservation();
  const { min_booking_length, max_booking_length } = settings;
  const { regular_price, discount } = cabin;

  const currentDate = new Date();
  const farthestReservationDate = new Date(
    currentDate.getFullYear() + 2,
    currentDate.getMonth()
  );
  const bookedDates = [
    ...bookings.map((booking) => {
      return {
        from: new Date(booking.start_date),
        to: new Date(booking.end_date),
      };
    }),
  ];
  const cabinPrice = 23;
  const num_nights = 15;

  const disabledDates = [{ before: new Date() }, ...bookedDates];

  const handleOnSelect = (range: DateRange | undefined) => {
    // Get only booked dates in the relevant month(s) the user has selected
    if (range?.from && range?.to) {
      const relevantDates = getBookedDatesByMonth(
        range.from.getMonth(),
        range.to.getMonth(),
        bookedDates
      );

      if (relevantDates.length > 0) {
        const overlaps = relevantDates.map((bookedRange) => {
          // Don't know why typescript complains about range.<property> possibly
          // being undefined since it has to be defined to get past the
          // previous if statement
          return datesOverlap(
            { from: range.from!, to: range.to! },
            bookedRange!
          );
        });
        // react day picker will include disabled dates if using range mode.
        // If overlaps, reset user selection to the last picked date as start date
        if (overlaps.includes(true)) {
          setDateRange({ from: range.to, to: undefined });
          return;
        }
      }
    }

    setDateRange(range);
  };

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={handleOnSelect}
        selected={dateRange}
        disabled={disabledDates}
        min={min_booking_length}
        max={max_booking_length}
        startMonth={currentDate}
        endMonth={farthestReservationDate}
        captionLayout="dropdown-years"
        numberOfMonths={2}
        styles={{
          months: { width: "30rem" },
          day: { width: "32px", height: "32px" },
          day_button: { width: "30px", height: "30px" },
        }}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regular_price - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regular_price}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regular_price}</span>
            )}
            <span className="">/night</span>
          </p>
          {num_nights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{num_nights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {dateRange?.from || dateRange?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={clearDateRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
