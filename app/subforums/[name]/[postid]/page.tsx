"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import { TPost } from "@/utils/types/post";
import { supabase } from "@/components/supabase/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TComment } from "@/utils/types/comment";

export default function PostPage() {
  const { postid } = useParams();

  const [post, setPost] = React.useState<TPost | undefined>(undefined);

  const [commentInput, setCommentInput] = React.useState<string>("");

  const [postComments, setPostComments] = React.useState<
    TComment[] | undefined
  >(undefined);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select()
      .eq("id", postid);
    if (error) {
      console.log(error);
      return;
    }
    data && setPost(data[0]);
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select()
      .eq("post_id", postid);
    if (error) {
      console.log(error);
      return;
    }
    data && setPostComments(data);
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const handleSubmitComment = async () => {
    const { data, error } = await supabase.from("comments").insert([
      {
        post_id: postid,
        text: commentInput,
        comment_author_username: "anonymus",
      },
    ]);
    if (error) {
      console.log(error);
      return;
    }
    setCommentInput("");
    fetchComments();
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitComment();
  };

  console.log(postComments);

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
            <div className="px-4 py-4 border border-white rounded shadow-lg flex-col flex gap-y-2">
              <p className="text-xs">Send a comment:</p>
              <form
                onSubmit={(e) => handleFormSubmit(e)}
                className="flex gap-x-2"
              >
                <Input
                  type="text"
                  placeholder="Send a comment..."
                  className="border-[rgb(179,179,190)]"
                  onChange={(e) => setCommentInput(e.target.value)}
                  value={commentInput}
                />
                <Button type="submit">Send</Button>
              </form>
              <p className="text-lg mt-4">Comments:</p>
              {postComments && (
                <div>
                  {postComments.map((comment) => (
                    <p key={comment.id}>{comment.text}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <span className="loading loading-ring loading-lg"></span>
        )}
      </div>
    </div>
  );
}
