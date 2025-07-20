"use client";

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

type AuthContextType = {
  user: User | undefined;
  status: "authenticated" | "loading" | "unauthenticated";
  setUser: Dispatch<SetStateAction<User | undefined>>
} | null;

const AuthContext = createContext<AuthContextType>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    if(status === "authenticated") {
      setUser(session.user)
    }
  }, [status, session?.user])

  return (
    <AuthContext.Provider value={{ user, status, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Context was used outside of AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
