"use client";

import Navbar from "@/components/navbar";
import { TPost } from "@/utils/types/post";
import { useEffect, useState } from "react";
import { supabase } from "@/components/supabase/supabaseClient";
import { useRouter } from "next/navigation";

export default function Home() {
  const [homepagePosts, setHomepagePosts] = useState<TPost[] | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from("posts").select().limit(20);
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        setHomepagePosts(data);
      }
    };
    fetchPosts();
  }, []);

  const router = useRouter();

  console.log(homepagePosts);

  return (
    <div className="min-h-[100vh]">
      <Navbar />
      <div className="flex flex-col gap-y-8 py-16 items-center">
        <h1 className="font-semibold text-3xl">Home page</h1>
        <h2>All of the posts:</h2>
        <div>
          {homepagePosts ? (
            homepagePosts.map((post) => (
              <div
                key={post.id}
                className="border border-white bg-[var(--post-background)] px-4 py-2 rounded cursor-pointer"
                onClick={() =>
                  router.push(`/subforums/${post.subforum_name}/${post.id}`)
                }
              >
                <p>{post.title}</p>
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
