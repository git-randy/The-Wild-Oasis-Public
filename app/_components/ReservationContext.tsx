"use client"

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

type ReservationContextType = {
  dateRange: DateRange | undefined;
  setDateRange: Dispatch<SetStateAction<DateRange | undefined>>
  clearDateRange: () => void
}

const ReservationContext = createContext<ReservationContextType>({
  dateRange: undefined,
  setDateRange: () => {},
  clearDateRange: () => {}
})

function ReservationProvider({children}: {children: React.ReactNode}) {

  const initialState = {from: undefined, to: undefined}
  const [dateRange, setDateRange] = useState<DateRange | undefined>(initialState);

  const clearDateRange = () => {
    setDateRange({from: undefined, to: undefined})
  }

  return <ReservationContext.Provider value={{dateRange, setDateRange, clearDateRange}}>
    {children}
  </ReservationContext.Provider>
}

function useReservation() {
  const context = useContext(ReservationContext)

  if (!context) throw new Error("Context was used outside provider")

  return context
}

export {ReservationProvider, useReservation}