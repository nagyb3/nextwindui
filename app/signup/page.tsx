"use client";

import React from "react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/components/supabase/supabaseClient";
import { useAuthContext } from "@/components/auth-provider";
import { useRouter } from "next/navigation";

export default function page() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>("");

  const [errorState, setErrorState] = React.useState<string>("");

  const handleSignup = () => {
    handleSignupWithSupabase();
  };

  const router = useRouter();

  const handleSignupWithSupabase = async () => {
    if (password === passwordConfirm) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setErrorState("Error signing up");
        console.log(error);
        return;
      }
      data && router.push("/login");
    } else {
      setErrorState("Passwords do not match");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-8 py-16 items-center">
        <h1 className="text-3xl font-semibold">Sign up</h1>
        <form
          action=""
          className="flex flex-col items-center gap-y-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col items-center gap-y-2">
            <label htmlFor="username">Email:</label>
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
          <p>{errorState}</p>
          <Button onClick={handleSignup}>SIGNUP</Button>
        </form>
      </div>
    </div>
  );
}
