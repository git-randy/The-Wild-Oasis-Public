"use client";

// Error boundaries must be a client component

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error.message);

  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">
        There was an issue updating your profile. Sorry about that!
      </h1>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3
        text-lg"
        onClick={() => location.reload()}
      >
        Try again
      </button>
    </main>
  );
}
