import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "./auth-provider";

export default function navbar() {
  const router = useRouter();

  const authContext = useAuthContext();

  return (
    <nav className="h-[60px] border-b-neutral-600 border px-16 flex items-center justify-between">
      <Link href="/" className="font-semibold">
        NextWindUI
      </Link>
      {authContext.isLoggedIn ? (
        <Button
          className="hover:underline"
          variant="outline"
          onClick={() => router.push("/settings")}
        >
          Settings
        </Button>
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
