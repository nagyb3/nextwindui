"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/components/supabase/supabaseClient";
import { TPost } from "@/utils/types/post";
import UniversalPost from "@/components/universal-post";

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
      data && setSubforumPosts(data);
    };
    fetchSubforumPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  return (
    <div className="min-h-[100vh]">
      <Navbar></Navbar>
      <div className="flex flex-col items-center py-16 gap-y-8">
        <h1 className="font-sembioldt text-3xl">Subforum: {name}</h1>
        <div>
          {subforumPosts ? (
            subforumPosts.length > 0 ? (
              <div className="flex flex-col gap-y-4 items-center">
                <h2 className="text-lg">Posts:</h2>
                {subforumPosts.map((post) => {
                  return (
                    <UniversalPost key={post.id} post={post}></UniversalPost>
                  );
                })}
              </div>
            ) : (
              <p>No posts yet on this subforum!</p>
            )
          ) : (
            <span className="loading loading-ring loading-lg"></span>
          )}
        </div>
      </div>
    </div>
  );
}
