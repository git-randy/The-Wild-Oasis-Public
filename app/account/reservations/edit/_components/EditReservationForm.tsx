"use client";

import { useState } from "react";
import { BookingData } from "~/app/_blueprints/booking";
import { CabinAPIData } from "~/app/_blueprints/cabin";
import LoginMessage from "~/app/_components/LoginMessage";
import SubmitButton from "~/app/_components/SubmitButton";
import { useAuth } from "~/app/_context/AuthContext";
import { useEdit } from "~/app/_context/EditContext";
import { updateReservation } from "~/app/_lib/actions";

function EditReservationForm({
  cabin,
  reservation,
}: {
  cabin: CabinAPIData;
  reservation: BookingData;
}) {
  const { max_capacity, regular_price } = cabin;
  const { user } = useAuth();
  const bulletPoint = "\u2022";
  const { editReservation: edit } = useEdit();
  const [guests, setGuests] = useState<string>(String(reservation.num_guests));
  const [observations, setObservations] = useState<string>(
    reservation.observations
  );

  if (!user) {
    return <LoginMessage />;
  } else {
    return (
      <div className="scale-[1.0]">
        <form
          className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
          action={() =>
            updateReservation({
              ...edit,
              id: reservation.id,
              cabinPrice: regular_price,
              observations,
              guests: Number(guests),
            })
          }
        >
          <div className="space-y-2">
            <label htmlFor="numGuests">How many guests?</label>
            <select
              name="numGuests"
              id="numGuests"
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
              required
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              <option value="" key="">
                Select number of guests...
              </option>
              {Array.from({ length: max_capacity }, (_, i) => i + 1).map(
                (x) => (
                  <option value={x} key={x}>
                    {x} {x === 1 ? "guest" : "guests"}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="observations">
              Anything we should know about your stay? (Optional)
            </label>
            <textarea
              name="observations"
              id="observations"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full
              shadow-sm rounded-sm"
              placeholder="Any pets, allergies, special requirements, etc.?"
            />
          </div>

          <div className="flex justify-end items-center gap-6">
            <div className="flex flex-col">
              <p className="text-primary-300 text-base">
                {!edit.dateRange?.to && `${bulletPoint} Select a date range`}
              </p>
              <p className="text-primary-300 text-base">
                {!guests &&
                  `${bulletPoint} Select number of guests staying`}
              </p>
            </div>
            <SubmitButton disabled={!edit.dateRange?.to || !guests}>Submit Changes</SubmitButton>
          </div>
        </form>
      </div>
    );
  }
}

export default EditReservationForm;
