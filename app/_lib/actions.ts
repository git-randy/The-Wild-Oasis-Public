"use server";
// Actions that are only called on the server

import { auth, signIn, signOut } from "~/app/_lib/auth";
import { z } from "zod/mini";
import {
  bookingOwnedByGuest,
  createBooking,
  deleteBooking,
  updateGuest as updateGuestAPI,
} from "~/app/_lib/data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Reservation } from "~/app/_context/ReservationContext";
import { NewBooking } from "~/app/_blueprints/booking";
import { removeTimezone } from "~/app/_lib/utilities";

const updateGuestSchema = z.object({
  nationality: z.string().check(z.minLength(1, "A country must be selected")),
  national_id: z.string().check(z.minLength(6, "Too short!"), z.maxLength(12)),
  id: z.coerce.number(),
});

type FormState = {
  success: boolean;
  fields?: Record<string, string | number>;
  errors?: Record<string, string>;
};

async function validateAuthorization() {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  } else {
    return session;
  }
}

export async function updateGuestAction(
  _prevState: FormState,
  payload: FormData
): Promise<FormState> {
  await validateAuthorization();

  if (!(payload instanceof FormData)) {
    return {
      success: false,
      errors: { error: "Invalid form data" },
    };
  }

  const formData = Object.fromEntries(payload);

  const parsed = updateGuestSchema.safeParse(formData);

  if (!parsed.success) {
    console.error(parsed.error);
    return { success: false, errors: { error: parsed.error.message } };
  } else {
    const [country, flag] = parsed.data.nationality.split("%");

    await updateGuestAPI(parsed.data.id, {
      national_id: Number(parsed.data.national_id),
      nationality: country,
      country_flag: flag,
    });

    revalidatePath("/account/profile");

    return { success: true, fields: parsed.data };
  }
}

export async function createReservation(reservation: Reservation) {
  const session = await validateAuthorization()

  if (!reservation.dateRange?.from || !reservation.dateRange.to)
    throw new Error("A date range must be selected");

  const bookingObj: NewBooking = {
    start_date: removeTimezone(reservation.dateRange.from),
    end_date: removeTimezone(reservation.dateRange.to),
    num_nights: reservation.numNights,
    num_guests: reservation.guests,
    cabin_price: reservation.cabinPrice,
    extras_price: 0,
    total_price: reservation.cabinPrice * reservation.numNights,
    status: "unconfirmed",
    has_breakfast: reservation.hasBreakfast,
    is_paid: false,
    observations: reservation.observations,
    guest_id: session.guestId,
    cabin_id: reservation.cabinId,
  };

  await createBooking(bookingObj);
  redirect("/account/reservations");
}

export async function deleteReservation(bookingId: number) {
  const session = await validateAuthorization();

  if (session.user?.email) {
    if (await bookingOwnedByGuest(session.user.email, bookingId)) {
      const data = await deleteBooking(bookingId);

      if (data.success) {
        revalidatePath("account/reservations");
      }
    } else {
      throw new Error("Not allowed to delete this booking");
    }
  } else {
    throw new Error("No email could be found for current user session");
  }
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirect: false });
}
