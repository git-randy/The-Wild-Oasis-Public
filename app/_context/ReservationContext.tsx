"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";
import { DateRange } from "react-day-picker";

const initialDateRange: DateRange = {
  to: undefined,
  from: undefined,
};

export type Reservation = {
  cabinId: number;
  cabinName: string;
  guests: number;
  observations: string;
  totalPrice: number;
  dateRange: DateRange | undefined;
  numNights: number;
  extrasPrice?: number;
  hasBreakfast?: boolean;
  cabinPrice: number;
  guestId?: number;
};

const initalState: Reservation = {
  cabinId: 0,
  cabinName: "",
  guests: 0,
  observations: "",
  totalPrice: 0,
  dateRange: initialDateRange,
  extrasPrice: 0,
  cabinPrice: 0,
  numNights: 0,
  hasBreakfast: false,
  guestId: undefined
};

type ReservationContextType = {
  reservation: Reservation;
  clearDateRange: () => void;
  setDateRange: (arg1: DateRange | undefined) => void;
  setCabinName: (arg1: string) => void;
  setGuests: (arg1: number) => void;
  setObservations: (arg1: string) => void;
  setTotalPrice: (arg1: number) => void;
  setCabinId: (arg1: number) => void;
  setNumNights: (arg1: number) => void;
};

const ReservationContext = createContext<ReservationContextType>({
  reservation: initalState,
  clearDateRange: () => {},
  setDateRange: () => {},
  setCabinName: () => {},
  setGuests: () => {},
  setObservations: () => {},
  setTotalPrice: () => {},
  setCabinId: () => {},
  setNumNights: () => {}
});

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [reservation, setReservation] = useState<Reservation>(initalState);

  const setDateRange = (dateRange: DateRange | undefined) => {
    setReservation(prev => ({...prev, dateRange}))
  }

  const clearDateRange = () => {
    setReservation(prev => ({...prev, dateRange: initialDateRange}));
  };

  const setCabinName = (cabinName: string) => {
    setReservation((prev) => ({ ...prev, cabinName }));
  };

  const setCabinId = (cabinId: number) => {
    setReservation((prev) => ({ ...prev, cabinId }));
  };

  const setGuests = (guests: number) => {
    setReservation((prev) => ({ ...prev, guests }));
  };

  const setObservations = (observations: string) => {
    setReservation((prev) => ({ ...prev, observations }));
  };

  const setTotalPrice = (totalPrice: number) => {
    setReservation((prev) => ({ ...prev, totalPrice }));
  };

  const setNumNights = (numNights: number) => {
    setReservation((prev) => ({ ...prev, numNights }));
  };

  return (
    <ReservationContext.Provider
      value={{
        reservation,
        clearDateRange,
        setDateRange,
        setCabinName,
        setGuests,
        setObservations,
        setTotalPrice,
        setCabinId,
        setNumNights,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);

  if (!context)
    throw new Error("Context was used outside of ReservationProvider");

  return context;
}

export { ReservationProvider, useReservation };
