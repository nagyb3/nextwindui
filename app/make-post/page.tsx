"use client";

import React, { useDebugValue } from "react";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/components/supabase/supabaseClient";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function MakePostPage() {
  const [title, setTitle] = React.useState<string | undefined>(undefined);
  const [textarea, setTextarea] = React.useState<string | undefined>(undefined);
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
    if (!title || !textarea || !subforum) {
      setErrorState("Please fill in all of the fields.");
      return;
    } else {
      const { error } = await supabase.from("posts").insert({
        title: title,
        subforum_name: subforum,
        text: textarea,
        author_username: "anonymous",
      });
      if (error) {
        setErrorState("An erro has occured while trying to submit the post.");
      } else {
        errorState && setErrorState(undefined);
        setSuccessState("Post submitted successfully!");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    }
    //TODO handle supabase add post to db
  };

  const authContext = useAuthContext();

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-60px)] flex flex-col items-center py-8 gap-y-8">
        <h1 className="font-sembibold text-xl">Submit post</h1>
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
            <div>
              <Label htmlFor="title">Title:</Label>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                name="title"
                id="title"
                placeholder="Enter title.."
              />
            </div>
            <div>
              <label htmlFor="textarea">Post content:</label>
              <Textarea
                onChange={(e) => setTextarea(e.target.value)}
                value={textarea}
                placeholder="Enter the content of the post here..."
                name="textarea"
                id="textarea"
              ></Textarea>
            </div>
            <Button className="self-center">Make post</Button>
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