"use client";

import { useState } from "react";
// import { isWithinInterval } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { BookedDatesAPIData } from "~/app/_blueprints.ts/booking";
import { CabinAPIData } from "~/app/_blueprints.ts/cabin";
import { SettingsAPIData } from "~/app/_blueprints.ts/settings";

type DateSelectorProps = {
  settings: SettingsAPIData;
  bookings: BookedDatesAPIData[];
  cabin: CabinAPIData;
};

function DateSelector({ settings, bookings, cabin }: DateSelectorProps) {
  const [range, setRange] = useState<DateRange | undefined>();
  const { min_booking_length, max_booking_length } = settings;
  const { regular_price, discount } = cabin;

  console.log(`Min and max booking length: ${min_booking_length}, ${max_booking_length}`)

  const cabinPrice = 23;
  const num_nights = 15;

  const disabledDates = [
    { before: new Date() },
    ...bookings.map((booking) => {
      return {
        from: new Date(booking.start_date),
        to: new Date(booking.end_date),
      };
    }),
  ];

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={(range) => {console.log(range);setRange(range)}}
        selected={range}
        disabled={disabledDates}
        min={min_booking_length}
        max={max_booking_length}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
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

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => setRange({ from: undefined, to: undefined })}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
