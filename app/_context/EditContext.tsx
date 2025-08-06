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

export type EditReservation = {
  id: number | null;
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

const initalState: EditReservation = {
  id: null,
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

type EditContextType = {
  editReservation: EditReservation;
  clearDateRange: () => void;
  setDateRange: (arg1: DateRange | undefined) => void;
  setCabinName: (arg1: string) => void;
  setGuests: (arg1: number) => void;
  setObservations: (arg1: string) => void;
  setTotalPrice: (arg1: number) => void;
  setCabinId: (arg1: number) => void;
  setNumNights: (arg1: number) => void;
};

const EditContext = createContext<EditContextType>({
  editReservation: initalState,
  clearDateRange: () => {},
  setDateRange: () => {},
  setCabinName: () => {},
  setGuests: () => {},
  setObservations: () => {},
  setTotalPrice: () => {},
  setCabinId: () => {},
  setNumNights: () => {}
});

function EditProvider({ children }: { children: React.ReactNode }) {
  const [editReservation, setEditReservation] = useState<EditReservation>(initalState);

  const setDateRange = (dateRange: DateRange | undefined) => {
    setEditReservation(prev => ({...prev, dateRange}))
  }

  const clearDateRange = () => {
    setEditReservation(prev => ({...prev, dateRange: initialDateRange}));
  };

  const setCabinName = (cabinName: string) => {
    setEditReservation((prev) => ({ ...prev, cabinName }));
  };

  const setCabinId = (cabinId: number) => {
    setEditReservation((prev) => ({ ...prev, cabinId }));
  };

  const setGuests = (guests: number) => {
    setEditReservation((prev) => ({ ...prev, guests }));
  };

  const setObservations = (observations: string) => {
    setEditReservation((prev) => ({ ...prev, observations }));
  };

  const setTotalPrice = (totalPrice: number) => {
    setEditReservation((prev) => ({ ...prev, totalPrice }));
  };

  const setNumNights = (numNights: number) => {
    setEditReservation((prev) => ({ ...prev, numNights }));
  };

  return (
    <EditContext.Provider
      value={{
        editReservation,
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
    </EditContext.Provider>
  );
}

function useEdit() {
  const context = useContext(EditContext);

  if (!context)
    throw new Error("Context was used outside of EditProvider");

  return context;
}

export { EditProvider, useEdit };
