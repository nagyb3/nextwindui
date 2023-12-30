"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import { TPost } from "@/utils/types/post";
import { supabase } from "@/components/supabase/supabaseClient";
import { useAuthContext } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import UniversalPost from "@/components/universal-post";

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
        <div className="border border-white rounded w-[600px] bg-neutral-800 flex flex-col p-8 gap-y-2">
          <p className="text-lg">Profile info:</p>
          <ul className="list-inside pl-4">
            <li>
              <p className="flex gap-x-1">
                Your email:
                <span className="font-semibold">
                  {authContext.session?.user?.email}
                </span>
              </p>
            </li>
          </ul>
        </div>
        <h2 className="text-xl mt-8">Your posts:</h2>
        <div className="flex flex-col gap-y-4">
          {currentUserPosts ? (
            currentUserPosts?.map((post) => (
              <UniversalPost
                key={post.id}
                post={post}
                showSubforum={true}
              ></UniversalPost>
            ))
          ) : (
            <span className="loading loading-ring loading-lg"></span>
          )}
        </div>
      </div>
    </div>
  );
}
