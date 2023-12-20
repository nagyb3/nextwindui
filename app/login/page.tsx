"use client";

import React from "react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/components/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/auth-provider";

export default function LoginPage() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [errorState, setErrorState] = React.useState<string>("");

  const handleLogin = () => {
    handleLoginWithSupabase();
  };

  const authContext = useAuthContext();

  const handleLoginWithSupabase = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      setErrorState("Successfully logged in!");
      setTimeout(() => router.push("/"), 1500);
    }
  };

  const router = useRouter();

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-8 py-16 items-center">
        <h1 className="text-3xl font-semibold">Login</h1>
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
          <Button onClick={handleLogin}>LOG IN</Button>
        </form>
        <p>{errorState}</p>
        <Button variant="link" onClick={() => router.push("/signup")}>
          Sign up if you don&apos;t have an account yet!
        </Button>
      </div>
    </div>
  );
}
