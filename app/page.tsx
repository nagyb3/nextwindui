"use client";

import * as React from "react";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-[100vh]">
      <Navbar />
      <div className="flex flex-col gap-y-8 py-16 items-center">
        <h1 className="font-semibold text-3xl">Home page</h1>
      </div>
    </div>
  );
}
