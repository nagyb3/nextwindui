"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-[100vh]">
      <Navbar></Navbar>
    </div>
  );
}
