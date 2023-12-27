"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import { supabase } from "@/components/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import { TSubforum } from "@/utils/types/subforums";
import { Button } from "@/components/ui/button";

export default function AllSubforumsPage() {
  const [subforums, setSubforums] = React.useState<TSubforum[] | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchSubforums = async () => {
      const { data, error } = await supabase.from("subforum").select();
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        setSubforums(data);
      }
    };
    fetchSubforums();
  }, []);

  const router = useRouter();

  return (
    <div className="min-h-[100vh]">
      <Navbar></Navbar>
      <div className="flex flex-col items-center py-16 gap-y-8">
        <h1 className="font-sembioldt text-3xl">Subforums:</h1>
        <Button onClick={() => router.push("/subforums/create")}>
          Make new subforum!
        </Button>
        <div className="w-[600px] flex flex-col gap-y-4 ">
          {subforums ? (
            subforums.map((subforum) => {
              return (
                <div
                  key={subforum.id}
                  className="px-4 py-2 border border-white rounded cursor-pointer bg-[var(--post-background)]"
                  onClick={() => router.push(`/subforums/${subforum.name}`)}
                >
                  <p className="text-xl">{subforum.name}</p>
                </div>
              );
            })
          ) : (
            <span className="loading loading-ring loading-lg"></span>
          )}
        </div>
      </div>
    </div>
  );
}
