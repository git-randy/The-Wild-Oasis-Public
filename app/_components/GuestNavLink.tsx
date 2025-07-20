"use client"

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "~/app/_context/AuthContext";


export default function GuestNavLink() {
  const {user} = useAuth()

  return (
    <>
      {user?.image ? (
        <Link
          href="/account"
          className="hover:text-accent-400 transition-colors flex
              items-center gap-4"
        >
          <Image
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name || "profile-icon"}
            width={32}
            height={32}
            referrerPolicy="no-referrer"
          />
          <span>Guest Area</span>
        </Link>
      ) : (
        <Link
          href="/account"
          className="hover:text-accent-400 transition-colors"
        >
          Guest Area
        </Link>
      )}
    </>
  );
}
