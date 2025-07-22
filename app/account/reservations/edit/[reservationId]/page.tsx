import { auth } from "~/app/_lib/auth";

export const metadata = {
  title: "Edit Reservation",
};

export default async function Page() {
  const session = await auth()

  console.log(session?.guestId)

  return (
    <div className="max-w-6xl mx-auto mt-8">
      Edit Reservation page
    </div>
  )

}
