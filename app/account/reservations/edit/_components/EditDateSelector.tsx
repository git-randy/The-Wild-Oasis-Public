"use client";

import { differenceInDays } from "date-fns";
import { memo, useEffect } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { BookedDatesAPIData, BookingData } from "~/app/_blueprints/booking";
import { CabinAPIData } from "~/app/_blueprints/cabin";
import { SettingsAPIData } from "~/app/_blueprints/settings";
import { useEdit } from "~/app/_context/EditContext";
import { datesOverlap, getBookedDatesByMonth } from "~/app/_lib/utilities";
import "react-day-picker/dist/style.css";

type DateSelectorProps = {
  settings: SettingsAPIData;
  bookedDates: BookedDatesAPIData[];
  cabin: CabinAPIData;
  customerBooking: BookingData;
};

const EditDateSelector = memo(({
  settings,
  bookedDates,
  cabin,
  customerBooking,
}: DateSelectorProps) => {
  const { min_booking_length, max_booking_length } = settings;
  const { regular_price, discount } = cabin;
  const {
    editReservation: edit,
    setDateRange,
    clearDateRange,
    setNumNights,
  } = useEdit();

  const currentDate = new Date();
  const farthestReservationDate = new Date(
    currentDate.getFullYear() + 2,
    currentDate.getMonth()
  );

  const initialFromDate = new Date(customerBooking.start_date)
  const initialToDate = new Date(customerBooking.end_date)

  useEffect(() => {
    setDateRange({from: initialFromDate, to: initialToDate})
    setNumNights(differenceInDays(initialToDate, initialFromDate))
  }, [])

  const bookedDatesForDayPicker = bookedDates.map((booking) => {
    return {
      from: new Date(booking.start_date),
      to: new Date(booking.end_date),
    };
  });

  const disabledDates = [{ before: new Date() }, ...bookedDatesForDayPicker];

  const overlapsBookedDate = (fromDate: Date, toDate: Date) => {
    // Get only booked dates in the relevant month(s) the user has selected instead
    // of looping through all booked dates
    const relevantDates = getBookedDatesByMonth(
      fromDate.getMonth(),
      toDate.getMonth(),
      bookedDatesForDayPicker
    );
    if (relevantDates.length > 0) {
      const overlaps = relevantDates.map((bookedRange) => {
        return datesOverlap({ from: fromDate, to: toDate }, bookedRange);
      });
      // react day picker will include disabled dates if using range mode.
      // Reset user selection to the last picked date as start date
      if (overlaps.includes(true)) {
        return true;
      }
    }
    return false;
  };

  const handleClear = () => {
    clearDateRange();
    setNumNights(0);
  };

  const handleOnSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      if (overlapsBookedDate(range.from, range.to)) {
        setDateRange({ from: range.to, to: undefined });
        setNumNights(0);
        return;
      } else {
        setNumNights(differenceInDays(range.to, range.from));
      }
    }
    setDateRange(range);
  };

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-6 place-self-center"
        mode="range"
        onSelect={handleOnSelect}
        selected={edit.dateRange}
        disabled={disabledDates}
        min={min_booking_length}
        max={max_booking_length}
        startMonth={initialFromDate}
        endMonth={farthestReservationDate}
        captionLayout="dropdown-years"
        numberOfMonths={2}
        timeZone="America/New_York"
        styles={{
          months: { width: "32rem" },
          day: { width: "32px", height: "32px" },
          day_button: { width: "30px", height: "30px" },
        }}
        classNames={{
          disabled: "disabled-date",
        }}
        navLayout="around"

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
          {edit.numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{edit.numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">
                  ${(regular_price - discount) * edit.numNights}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {edit.dateRange?.from || edit.dateRange?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={handleClear}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
)

EditDateSelector.displayName = "EditDateSelector"

export default EditDateSelector;
