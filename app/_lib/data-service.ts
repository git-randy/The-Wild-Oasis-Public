import { supabase } from "@lib/supabase";
import {
  GuestAPIData,
  NewGuest,
  UpdateGuestData,
} from "~/app/_blueprints.ts/guest";
import {
  BookedDatesAPIData,
  BookingAPIData,
  NewBooking,
  UpdateBookingData,
} from "~/app/_blueprints.ts/booking";
import { CabinAPIData } from "~/app/_blueprints.ts/cabin";
import { SettingsAPIData } from "~/app/_blueprints.ts/settings";

/////////////
// GET

export async function getCabin(id: number): Promise<CabinAPIData> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getCabinPrice(id: number) {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export const getCabins = async function (): Promise<CabinAPIData[]> {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, max_capacity, regular_price, discount, image")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

export async function getCabinsByCapacity(
  capacity: number
): Promise<CabinAPIData[]> {
  const max = 10;

  if (capacity > max) return [];

  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, max_capacity, regular_price, discount, image")
    .eq("max_capacity", capacity)
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function getTableCount(table: string): Promise<number | null> {
  // When head is set to true, data will not be returned
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "estimated", head: true });

  if (error) {
    console.error(error);
    throw new Error("Unable to get number of cabins");
  }
  return count;
}

// Guests are uniquely identified by their email address
export async function getGuest(email: string): Promise<GuestAPIData> {
  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error(`Could not retrieve booking with id ${id}`);
  }

  return data;
}

export async function getBookings(guestId: number) {
  const { data, error } = await supabase
    .from("bookings")
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      "id, created_at, start_date, end_date, num_nights, num_guests, total_price, guest_id, cabin_id, cabins(name, image)"
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error(`Could not find booking with guest id ${guestId}`);
  }

  return data;
}

export async function getBookedDatesByCabinId(
  cabinId: number
): Promise<BookedDatesAPIData[]> {
  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);
  const today = currentDate.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("id, start_date, end_date, num_nights")
    .eq("cabin_id", cabinId)
    .gte("start_date", today);

  if (error) {
    console.error(error);
    throw new Error(`Could not get bookings for cabin id ${cabinId}`);
  }

  // Converting to actual dates to be displayed in the date picker

  return data;
}

export async function getSettings(): Promise<SettingsAPIData> {
  await new Promise((res) => setTimeout(res, 2000));

  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

type CountriesData = {
  name: string;
  flag: string;
  independent: boolean;
};

export async function getCountries(): Promise<CountriesData[]> {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

export async function createGuest(newGuest: NewGuest) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function createBooking(newBooking: NewBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(
  id: number,
  updatedFields: UpdateGuestData
): Promise<GuestAPIData> {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  return data;
}

export async function updateBooking(
  id: number,
  updatedFields: UpdateBookingData
): Promise<BookingAPIData> {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id: number): Promise<null> {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
