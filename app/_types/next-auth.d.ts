// @ts-expect-error Imported function needed to extend Session scope
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    guestId: number;
  }
}