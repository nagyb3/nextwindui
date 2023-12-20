"use client";

import {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase/supabaseClient";

export const AuthContext = createContext<AuthContextType>({
  session: null,
  signOut: () => Promise.resolve(),
});

export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }: { children: ReactElement }) {
  const [sessionState, setSessionState] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      session ? setSessionState(session.data.session) : setSessionState(null);
      supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          setSessionState(session);
        } else {
          setSessionState(null);
        }
      });
    });
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  return (
    <AuthContext.Provider value={{ session: sessionState, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export type AuthContextType = {
  session: Session | null;
  signOut: () => Promise<void>;
};
