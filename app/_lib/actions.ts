"use server";
// Actions that are only called on the server

import { auth, signIn, signOut } from "~/app/_lib/auth";
import { z } from "zod/mini";
import { bookingOwnedByGuest, deleteBooking, updateGuest as updateGuestAPI } from "~/app/_lib/data-service";
import { revalidatePath } from "next/cache";

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

export async function updateGuestAction(
  _prevState: FormState,
  payload: FormData
): Promise<FormState> {

  const session  = await auth()
  if (!session) throw new Error("You must be logged in")

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

    const [country, flag] = parsed.data.nationality.split("%")

    await updateGuestAPI(parsed.data.id, {
      national_id: Number(parsed.data.national_id),
      nationality: country,
      country_flag: flag
    });

    revalidatePath("/account/profile")

    return { success: true, fields: parsed.data };
  }
}

export async function deleteReservation(bookingId: number) {
  const session  = await auth()
  if (!session) throw new Error("You must be logged in")

  if (session.user?.email) {

    if(await bookingOwnedByGuest(session.user.email, bookingId)) {
      const data = await deleteBooking(bookingId)

      if (data.success) {
        revalidatePath("account/reservations")
      }
    } else {
      throw new Error("Not allowed to delete this booking")
    }

  } else {
    throw new Error("No email could be found for current user session")
  }

}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirect: false });
}
