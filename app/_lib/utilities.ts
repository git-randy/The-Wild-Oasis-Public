export function addDays(date: Date, days: number): Date {
  /**
   * Add days to the current date
   */
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days)
  return newDate
}

export function getEndOfYear(years: number): Date {
  /**
   * Get an offset of the current year ending on December 31st
   */
  const currentYear = new Date().getFullYear()
  return new Date(currentYear + years, 11, 31)
}