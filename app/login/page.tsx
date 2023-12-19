"use client";

import React from "react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/components/supabase/supabaseClient";
import { Session, User, AuthApiError } from "@supabase/supabase-js";

export default function page() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>("");

  const handleLogin = () => {
    handleLoginWithSupabase();
  };

  const handleLoginWithSupabase = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
  };

  interface SignInResponse {
    user?: User | null;
    session?: Session | null;
    error?: AuthApiError | null;
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-8 py-16 items-center">
        <h1 className="text-3xl font-semibold">Login</h1>
        <form action="" className="flex flex-col items-center gap-y-8">
          <div className="flex flex-col items-center gap-y-2">
            <label htmlFor="username">Username:</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="border border-neutral-400 rounded-md px-4 py-2 text-sm"
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email..."
              value={email}
            />
          </div>
          <div className="flex flex-col items-center gap-y-2">
            <label htmlFor="password">Password:</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border border-neutral-400 rounded-md px-4 py-2 text-sm"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password..."
              value={password}
            />
          </div>
          <div className="flex flex-col items-center gap-y-2">
            <label htmlFor="password-confirm">Confirm Password:</label>
            <input
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="border border-neutral-400 rounded-md px-4 py-2 text-sm"
              type="password"
              name="password-confirm"
              id="password-confirm"
              placeholder="Confirm your password..."
              value={passwordConfirm}
            />
          </div>
          <Button onClick={handleLogin}>Send</Button>
        </form>
      </div>
    </div>
  );
}
