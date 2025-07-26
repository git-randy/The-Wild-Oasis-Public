import { CabinAPIData, CabinData } from "~/app/_blueprints/cabin";
import { GuestAPIData } from "~/app/_blueprints/guest";

export interface BookingAPIData {
  id: number;
  created_at: string;
  start_date: string;
  end_date: string;
  num_nights: number;
  total_price: number;
  num_guests: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  has_breakfast?: boolean;
  extras_price?: number;
  cabin_price?: number;
  is_paid?: boolean;
  observations?: string;
  cabins?: CabinAPIData;
  guests?: GuestAPIData;
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
  cabins: CabinData;
  guest_id: number;
  cabin_id: number;
}

export interface NewBooking
  extends Omit<BookingAPIData, "id" | "created_at" | "cabins" | "guests"> {
  cabin_id: number;
  guest_id: number;
}

export interface UpdateBookingData {
  start_date?: string;
  end_date?: string;
  num_nights?: number;
  total_price?: number;
  num_guests?: number;
  status?: "unconfirmed" | "checked-in" | "checked-out";
  cabin_id?: number;
  guest_id?: number;
}

export interface BookedDatesAPIData {
  id: number;
  start_date: string;
  end_date: string;
  num_nights: number;
};
