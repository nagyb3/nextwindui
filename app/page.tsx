"use client";

import Navbar from "@/components/navbar";
import { TPost } from "@/utils/types/post";
import { useEffect, useState } from "react";
import { supabase } from "@/components/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import UniversalPost from "@/components/universal-post";

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

  return (
    <div className="min-h-[100vh]">
      <Navbar />
      <div className="flex flex-col gap-y-8 py-16 items-center">
        <h1 className="font-semibold text-3xl">Home page</h1>
        <Button onClick={() => router.push("/make-post")}>
          Create a post!
        </Button>
        <h2>All of the posts:</h2>
        <div className="flex flex-col gap-y-4">
          {homepagePosts ? (
            homepagePosts.map((post) => (
              <UniversalPost key={post.id} post={post}></UniversalPost>
            ))
          ) : (
            <span className="loading loading-ring loading-lg"></span>
          )}
        </div>
      </div>
    </div>
  );
}
