import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuthContext } from "./auth-provider";

export default function Navbar() {
  const authContext = useAuthContext();

  return (
    <nav className="h-[60px] border-b-neutral-600 border px-16 flex items-center justify-between">
      <Link href="/" className="font-semibold">
        NextWindUI
      </Link>
      {authContext.session !== null ? (
        <div className="flex gap-16">
          <Link
            href="/subforums"
            className="hover:underline border-0 flex items-center text-sm font-medium"
          >
            Subforums
          </Link>
          <Link
            href="/myprofile"
            className="hover:underline border-0 flex items-center text-sm font-medium"
          >
            Myprofile
          </Link>
          <Link
            href="/settings"
            className="hover:underline border-0 flex items-center text-sm font-medium"
          >
            Settings
          </Link>
          <Button
            className="hover:underline border-0 flex items-center text-sm font-medium p-0"
            variant="outline"
            onClick={() => authContext.signOut()}
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <Link
          href="/login"
          className="hover:underline border-0 flex items-center text-sm font-medium"
        >
          Log In
        </Link>
      )}
    </nav>
  );
}
