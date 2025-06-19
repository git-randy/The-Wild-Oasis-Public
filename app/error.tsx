"use client";
// Error boundaries must be a client component

/*
  This error boundary will not catch any render errors that occur in the root app
  directory level. You will need a global-error.tsx file which will replace the
  root layout.
*/

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  console.error(error.message)

  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">Message for the developer that messed up:</p>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3
        text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
