import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function navbar() {
  const router = useRouter();

  return (
    <nav className="h-[60px] border-b-neutral-600 border px-16 flex items-center justify-between">
      <Link href="/" className="font-semibold">
        NextWindUI
      </Link>
      <Button variant="outline" onClick={() => router.push("/settings")}>
        Settings
      </Button>
    </nav>
  );
}
