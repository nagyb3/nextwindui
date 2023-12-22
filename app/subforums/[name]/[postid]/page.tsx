"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import { TPost } from "@/utils/types/post";
import { supabase } from "@/components/supabase/supabaseClient";

export default function PostPage() {
  const { postId } = useParams();

  const [post, setPost] = React.useState<TPost | undefined>(undefined);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase.from("posts").select();
      if (error) {
        console.log(error);
        return;
      }
      data && setPost(data[0]);
    };
    fetchPost();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-60px)] flex flex-col items-center py-8">
        {post ? (
          <div key={post.id} className="flex flex-col gap-y-2">
            <div className="shadow-lg flex flex-col gap-y-4 w-[1000px] px-4 py-4 border border-white rounded bg-[var(--post-background)]">
              <p className="text-2xl font-semibold">{post.title}</p>
              <div className="flex justify-between">
                <p className="text-xs">Author: {post.author_username}</p>
                <p className="text-xs">Subforum: {post.subforum_name}</p>
              </div>
              <p>{post.text}</p>
            </div>
            <div className="px-4 py-2 border border-white rounded shadow-lg">
              <p className="text-lg">Comments:</p>
            </div>
          </div>
        ) : (
          <span className="loading loading-ring loading-lg"></span>
        )}
      </div>
    </div>
  );
}
