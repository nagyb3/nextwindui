"use client";

import { ReactElement, createContext, useContext, useState } from "react";
import { Session, User } from "@supabase/supabase-js";

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: undefined,
  setUser: () => {},
  session: undefined,
  setSession: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }: { children: ReactElement }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [user, setUser] = useState<User | undefined>(undefined);

  const [session, setSession] = useState<Session | undefined>(undefined);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, session, setSession }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: User | undefined;
  setUser: (value: User | undefined) => void;
  session: Session | undefined;
  setSession: (value: Session | undefined) => void;
};
