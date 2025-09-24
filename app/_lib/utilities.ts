export function addDays(date: Date, days: number): Date {
  /**
   * Add days to the current date
   */
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

export function getEndOfYear(years: number): Date {
  /**
   * Get an offset of the current year ending on December 31st
   */
  const currentYear = new Date().getFullYear();
  return new Date(currentYear + years, 11, 31);
}

type Interval = {
  from: Date;
  to: Date;
};

export function datesOverlap(range1: Interval, range2: Interval): boolean {
  return range1.from <= range2.to && range1.to >= range2.from;
}

type BookedDates = { from: Date; to: Date }[];

export function getBookedDatesByMonth(
  startMonth: number,
  endMonth: number,
  bookedDates: BookedDates
) {
  /**
   * @param {number} month - Zero based indexing (0 = January)
   */

  const relevantDates = bookedDates.flatMap((range) => {
    if (
      range.from.getMonth() === startMonth ||
      range.to.getMonth() === endMonth
    ) {
      return range;
    } else {
      return [];
    } // Do not add element to array if conditions are not met
  });

  return relevantDates;
}

export function removeTimezone(date: Date): string {

  if (!(date instanceof Date)) {
    return new Date(date).toISOString().split(".")[0].replace("T", " ")
  } else {
    return date.toISOString().split(".")[0].replace("T", " ")
  }
}