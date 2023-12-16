"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function Home() {
  const { setTheme } = useTheme();

  return (
    <div className="min-h-[100vh]">
      <nav className="h-[60px] border-b-neutral-600 border px-16 flex items-center justify-between">
        <p className="font-semibold">NextWindUI</p>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium,
          perferendis. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Ratione, ducimus?
        </p>
      </div>
    </div>
  );
}
