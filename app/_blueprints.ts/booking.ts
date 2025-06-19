import { CabinAPIData } from "~/app/_blueprints.ts/cabin";
import { GuestAPIData } from "~/app/_blueprints.ts/guest";

export interface BookingAPIData {
  id: number;
  created_at: string;
  start_date: string;
  end_date: string;
  num_nights: number;
  total_price: number;
  num_guests: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  cabins?: CabinAPIData;
  guests?: GuestAPIData;
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
