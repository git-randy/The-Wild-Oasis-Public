"use client";

import { CabinAPIData } from "~/app/_blueprints/cabin";
import LoginMessage from "~/app/_components/LoginMessage";
import { useAuth } from "~/app/_context/AuthContext";
import { useReservation } from "~/app/_context/ReservationContext";
import { createReservation } from "~/app/_lib/actions";

function ReservationForm({ cabin }: { cabin: CabinAPIData }) {
  const { setGuests, setObservations, reservation } = useReservation();
  const { max_capacity, regular_price } = cabin;
  const { user } = useAuth();
  const bulletPoint = "\u2022";

  if (!user) {
    return <LoginMessage />;
  } else {
    return (
      <div className="scale-[1.01]">
        <div
          className="bg-primary-800 text-primary-300 px-16 py-2 flex
          justify-between items-center"
        >
          <p>
            {user?.name ? `Logged in as ${user.name}` : "You have no name?"}
          </p>
        </div>

        <form
          className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
          action={() => createReservation({...reservation, cabinPrice: regular_price})}
        >
          <div className="space-y-2">
            <label htmlFor="numGuests">How many guests?</label>
            <select
              name="numGuests"
              id="numGuests"
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
              required
              value={reservation.guests}
              onChange={(e) => setGuests(Number(e.target.value))}
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
              defaultValue={reservation.observations}
              onBlur={(e) => setObservations(e.target.value)}
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full
              shadow-sm rounded-sm"
              placeholder="Any pets, allergies, special requirements, etc.?"
            />
          </div>

          <div className="flex justify-end items-center gap-6">
            <div className="flex flex-col">
              <p className="text-primary-300 text-base">
                {!reservation.dateRange?.to &&
                  `${bulletPoint} Select a date range`}
              </p>
              <p className="text-primary-300 text-base">
                {!reservation.guests &&
                  `${bulletPoint} Select number of guests staying`}
              </p>
            </div>
            <button
              className="bg-accent-500 px-8 py-4 text-primary-800
            font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
              disabled={!reservation.guests || !reservation.dateRange?.to}
            >
              Reserve now
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ReservationForm;
