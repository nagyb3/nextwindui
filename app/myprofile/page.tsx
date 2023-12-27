"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import { TPost } from "@/utils/types/post";
import { supabase } from "@/components/supabase/supabaseClient";
import { useAuthContext } from "@/components/auth-provider";
import { useRouter } from "next/navigation";

export default function MyProfilePage() {
  const [currentUserPosts, setCurrentUserPosts] = React.useState<
    TPost[] | null
  >(null);

  const authContext = useAuthContext();

  useEffect(() => {
    if (authContext.session?.user?.id) {
      const fetchCurrentUserPosts = async () => {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("author_username", "admin");
        if (error) {
          console.log(error);
        } else {
          setCurrentUserPosts(data);
        }
      };
      fetchCurrentUserPosts();
    }
  }, [authContext]);

  const router = useRouter();

  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-60px)] flex flex-col items-center py-16 gap-y-8">
        <h1 className="font-semibold text-2xl">Your profile</h1>
        <div className="border border-white rounded h-[300px] w-[600px]"></div>
        <h2 className="text-xl mt-8">Your posts:</h2>
        <div>
          {currentUserPosts ? (
            currentUserPosts?.map((post) => (
              <div
                onClick={() =>
                  router.push(`/subforums/${post.subforum_name}/${post.id}`)
                }
                key={post.id}
                className="border border-white bg-[var(--post-background)] px-4 py-4 gap-y-2 flex flex-col rounded cursor-pointer w-[600px]"
              >
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p>{post.text}</p>
              </div>
            ))
          ) : (
            <span className="loading loading-ring loading-lg"></span>
          )}
        </div>
      </div>
    </div>
  );
}
