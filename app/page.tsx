import Image from "next/image";
import Link from "next/link";
import bg from "~/public/bg.png";

// Statically import an image to use for <Image/> for it to be responsive
// and not have to provide a fixed

export default function Page() {
  return (
    <main className="mt-24">
      <div className="absolute inset-0">
        <Image
          src={bg}
          placeholder="blur"
          className="object-cover object-top"
          quality={80}
          fill
          alt="Mountains and forests with two cabins"
        />
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg
          font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
