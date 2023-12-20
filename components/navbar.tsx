"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "./auth-provider";
import { supabase } from "./supabase/supabaseClient";

export default function Navbar() {
  const router = useRouter();

  const authContext = useAuthContext();

  return (
    <nav className="h-[60px] border-b-neutral-600 border px-16 flex items-center justify-between">
      <Link href="/" className="font-semibold">
        NextWindUI
      </Link>
      {authContext.session !== null ? (
        <div className="flex gap-8">
          <Button
            className="hover:underline"
            variant="outline"
            onClick={() => router.push("/subforums")}
          >
            Subforums
          </Button>
          <Button
            className="hover:underline"
            variant="outline"
            onClick={() => router.push("/settings")}
          >
            Settings
          </Button>
          <Button
            className="hover:underline"
            variant="outline"
            onClick={() => authContext.signOut()}
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <Button
          className="hover:underline"
          variant="outline"
          onClick={() => router.push("/login")}
        >
          Log In
        </Button>
      )}
    </nav>
  );
}
