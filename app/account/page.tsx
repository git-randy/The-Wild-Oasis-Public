import { auth } from "~/app/_lib/auth";

export const metadata = {
  title: "My Account",
};

export default async function Page() {
  const session = await auth();

  // Page can only be accessed once a session has been established.
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {session!.user!.name}
    </h2>
  );
}
