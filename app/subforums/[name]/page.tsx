"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import { useParams } from "next/navigation";
import { supabase } from "@/components/supabase/supabaseClient";
import { TPost } from "@/utils/types/post";

export default function SubforumPage() {
  const [subforumPosts, setSubforumPosts] = React.useState<TPost[] | undefined>(
    undefined
  );

  const { name } = useParams();

  useEffect(() => {
    const fetchSubforumPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("subforum_name", name);
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        setSubforumPosts(data);
      }
    };
    fetchSubforumPosts();
  }, []);

  return (
    <div className="min-h-[100vh]">
      <Navbar></Navbar>
      <div className="flex flex-col items-center py-16 gap-y-8">
        <h1 className="font-sembioldt text-3xl">Sub: {name}</h1>
        <h2>Posts:</h2>
        <div>
          {subforumPosts?.map((post) => {
            return (
              <div className="flex flex-col items-center gap-y-4 border border-white rounded px-4 py-2 bg-black">
                <h2 className="font-semibold text-2xl">{post.title}</h2>
                <p>{post.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
