"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import Navbar from "@/components/navbar";

export default function Home() {
  const { setTheme } = useTheme();

  return (
    <div className="min-h-[100vh]">
      <Navbar></Navbar>
      <div className="flex justify-center gap-y-16 flex-col items-center min-h-[calc(100vh-60px)]">
        <h1 className="text-6xl hover:underline font-semibold">
          Welcome to NextWindUI!
        </h1>
        <h2 className="flex gap-x-2 text-2xl font-semibold">
          Built by:
          <a
            className="hover:relative hover:top-[1px]"
            href="https://www.github.com/nagyb3"
            target="_blank"
          >
            Bence Nagy
          </a>
        </h2>
        <p className="mt-8 max-w-[500px] text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa in
          natus ullam, accusantium nobis itaque quisquam architecto obcaecati
          quo nihil!
        </p>
        <section></section>
      </div>
    </div>
  );
}
