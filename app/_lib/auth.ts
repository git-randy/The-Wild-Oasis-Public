import NextAuth, { Session } from "next-auth";
import Google from "next-auth/providers/google";
import { NextRequest } from "next/server";
import { createGuest, getGuest } from "~/app/_lib/data-service";

export type ExtendedSession = Session & {
  guestId: number
}

// TODO: Add redirect if user is already authenticated and navigates to login page

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  // Client ID and secret are inferred from env variable naming conventions
  // from NextAuth
  providers: [Google],
  callbacks: {
    authorized({auth, request: _}: {auth: Session | null, request: NextRequest}) {
      return !!auth?.user
    },
    async signIn({user, account: _, profile: __}) {
      try{
        const existingGuest = user.email && await getGuest(user.email)

        if (!existingGuest && user.email && user.name) {
          await createGuest(
            {
              full_name: user.name,
              email: user.email
            }
          )
        }
        return true
      } catch {
        return false
      }
    },
    async session({session, user: _}) {
      const guest = await getGuest(session.user.email)
      return {...session, guestId: guest.id} as ExtendedSession
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/signout",
  },
  session: {maxAge: 86400}
});
