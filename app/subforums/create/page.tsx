"use client";

import React from "react";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/components/supabase/supabaseClient";
import { useRouter } from "next/navigation";

export default function MakePostPage() {
  const [subforum, setSubforum] = React.useState<string | undefined>(undefined);

  const [errorState, setErrorState] = React.useState<string | undefined>(
    undefined
  );

  const [successState, setSuccessState] = React.useState<string | undefined>(
    undefined
  );

  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!subforum) {
      setErrorState("Please fill in all of the fields.");
      return;
    } else {
      const { error } = await supabase.from("subforum").insert({
        name: subforum,
      });
      if (error) {
        setErrorState("An erro has occured while trying to submit the post.");
      } else {
        errorState && setErrorState(undefined);
        setSuccessState("Post submitted successfully!");
        setTimeout(() => {
          router.push("/subforums");
        }, 1000);
      }
    }
  };

  const authContext = useAuthContext();

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-60px)] flex flex-col items-center py-8 gap-y-8">
        <h1 className="font-sembibold text-xl">Create new subforum!</h1>
        {authContext?.session?.user ? (
          <form
            className="w-[600px] flex flex-col gap-y-4"
            onSubmit={(e) => handleFormSubmit(e)}
          >
            <div>
              <Label htmlFor="subforum">Subforum name:</Label>
              <Input
                onChange={(e) => setSubforum(e.target.value)}
                value={subforum}
                type="text"
                name="subforum"
                id="subforum"
                placeholder="Enter subforum name..."
              />
            </div>
            <Button className="self-center">Create subforum</Button>
            {errorState && (
              <p className="text-center font-semibold text-red-500">
                {errorState}
              </p>
            )}
            {successState && (
              <p className="text-center font-semibold text-green-500">
                {successState}
              </p>
            )}
          </form>
        ) : (
          <p>You must be logged in to submit a post.</p>
        )}
      </div>
    </div>
  );
}
