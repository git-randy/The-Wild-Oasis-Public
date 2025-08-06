import { CabinAPIData, CabinData } from "~/app/_blueprints/cabin";


export interface BookingData {
  id: number;
  created_at: string;
  start_date: string;
  end_date: string;
  num_nights: number;
  total_price: number;
  num_guests: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  has_breakfast: boolean;
  extras_price: number;
  cabin_price: number;
  is_paid: boolean;
  observations: string;
  cabin_id: number;
  guest_id: number;
}

export interface BookingWithCabins {
  id?: number;
  created_at: string;
  start_date: string;
  end_date: string;
  num_nights: number;
  total_price: number;
  num_guests: number;
  cabins: CabinData[];
  guest_id: number;
  cabin_id: number;
}

export interface BookingWithCabin {
  id: number;
  created_at: string;
  start_date: string;
  end_date: string;
  num_nights: number;
  total_price: number;
  num_guests: number;
  has_breakfast: boolean;
  extras_price: number;
  cabin_price: number;
  is_paid: boolean;
  status: "unconfirmed" | "checked-in" | "checked-out"
  observations: string;
  cabins: CabinAPIData;
  guest_id: number;
  cabin_id: number;
}

export type NewBooking = Omit<BookingData, "id" | "created_at">

export interface UpdateBookingData {
  id: number;
  start_date?: string;
  end_date?: string;
  num_nights?: number;
  total_price?: number;
  num_guests?: number;
  status?: "unconfirmed" | "checked-in" | "checked-out";
  cabin_id?: number;
  guest_id?: number;
  has_breakfast?: boolean;
  is_paid?: boolean;
  observations?: string;
  extras_price?: number;
  cabin_price?: number;
}

export interface BookedDatesAPIData {
  start_date: string;
  end_date: string;
};
