"use client";

import { TPost } from "@/utils/types/post";
import React, { useEffect } from "react";
import {
  HandThumbUpIcon as HandThumbUpIconOutline,
  HandThumbDownIcon as HandThumbDownIconOutline,
} from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon as HandThumbUpIconSolid,
  HandThumbDownIcon as HandThumbDownIconSolid,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { supabase } from "@/components/supabase/supabaseClient";

export default function UniversalPost({
  post,
  showSubforum,
}: {
  post: TPost;
  showSubforum?: boolean;
}) {
  const router = useRouter();

  const [currentUserHasUpvoted, setCurrentUserHasUpvoted] =
    React.useState<boolean>(false);

  const [currentUserHasDownvoted, setCurrentUserHasDownvoted] =
    React.useState<boolean>(false);

  useEffect(() => {
    if (post.users_who_upvoted.includes("anonymus")) {
      setCurrentUserHasUpvoted(true);
    }
    if (post.users_who_downvoted.includes("anonymus")) {
      setCurrentUserHasDownvoted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserHasDownvoted, currentUserHasUpvoted]);

  const handleThumbsUpButton = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    if (post) {
      if (!currentUserHasUpvoted && !currentUserHasDownvoted) {
        const { error } = await supabase
          .from("posts")
          .update({
            users_who_upvoted: [...post.users_who_upvoted, "anonymus"],
          })
          .eq("id", post.id)
          .select();
        if (error) {
          console.log(error);
          return;
        }
        setCurrentUserHasUpvoted(true);
      } else if (currentUserHasDownvoted) {
        // remove downvote
        const { data, error } = await supabase
          .from("posts")
          .update({
            users_who_downvoted: post.users_who_downvoted.filter(
              (user) => user !== "anonymus"
            ),
            users_who_upvoted: [...post.users_who_upvoted, "anonymus"],
          })
          .eq("id", post.id);
        if (error) {
          console.log(error);
          return;
        }
        setCurrentUserHasDownvoted(false);
        setCurrentUserHasUpvoted(true);
      } else if (currentUserHasUpvoted) {
        // remove upvote
        const { data: removeUpvoteData, error: removeUpvoteError } =
          await supabase
            .from("posts")
            .update({
              users_who_upvoted: post.users_who_upvoted.filter(
                (user) => user !== "anonymus"
              ),
            })
            .eq("id", post.id);
        if (removeUpvoteError) {
          return;
        }
        setCurrentUserHasUpvoted(false);
      }
    }
  };

  const handleThumbsDownButton = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    if (post) {
      if (!currentUserHasDownvoted && !currentUserHasUpvoted) {
        const { error } = await supabase
          .from("posts")
          .update({
            users_who_downvoted: [...post.users_who_downvoted, "anonymus"],
          })
          .eq("id", post.id);
        if (error) {
          console.log(error);
          return;
        }
        setCurrentUserHasDownvoted(true);
      } else if (currentUserHasUpvoted) {
        // remove downvote
        const { error } = await supabase
          .from("posts")
          .update({
            users_who_upvoted: post.users_who_upvoted.filter(
              (user) => user !== "anonymus"
            ),
            users_who_downvoted: [...post.users_who_downvoted, "anonymus"],
          })
          .eq("id", post.id)
          .select();
        if (error) {
          console.log(error);
          return;
        }
        setCurrentUserHasUpvoted(false);
        setCurrentUserHasDownvoted(true);
      } else if (currentUserHasDownvoted) {
        // remove upvote
        const { error } = await supabase
          .from("posts")
          .update({
            users_who_downvoted: post.users_who_downvoted.filter(
              (user) => user !== "anonymus"
            ),
          })
          .eq("id", post.id);
        if (error) {
          console.log(error);
          return;
        }
        setCurrentUserHasDownvoted(false);
      }
    }
  };

  const handlePostClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "svg") {
      return;
    } else {
      router.push(`/subforums/${post.subforum_name}/${post.id}`);
    }
  };

  return (
    <div
      className="border border-white bg-[var(--post-background)] px-4 py-4 gap-y-2 flex flex-col rounded cursor-pointer w-[600px]"
      onClick={(e) => handlePostClick(e)}
    >
      <div className="flex justify-between">
        <p className="text-lg font-semibold">{post.title}</p>
        <div className="flex gap-x-4">
          <div className="flex gap-x-1">
            {post.users_who_downvoted.includes("anonymus") ? (
              <HandThumbDownIconSolid
                onClick={(e) => handleThumbsDownButton(e)}
                className="text-white w-[24px] h-[24px] cursor-pointer"
              />
            ) : (
              <HandThumbDownIconOutline
                onClick={(e) => handleThumbsDownButton(e)}
                className="text-white w-[24px] h-[24px] cursor-pointer"
              />
            )}
            <p>{post.users_who_downvoted.length}</p>
          </div>
          <div className="flex gap-x-1">
            {post.users_who_upvoted.includes("anonymus") ? (
              <HandThumbUpIconSolid
                onClick={(e) => handleThumbsUpButton(e)}
                className="text-white w-[24px] h-[24px] cursor-pointer"
              />
            ) : (
              <HandThumbUpIconOutline
                onClick={(e) => handleThumbsUpButton(e)}
                className="text-white w-[24px] h-[24px] cursor-pointer z-50"
              />
            )}
            <p>{post.users_who_upvoted.length}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-xs">Author: {post.author_username}</p>
        {showSubforum && (
          <p className="text-xs">Subforum: {post.subforum_name}</p>
        )}
      </div>
      <p className="break-words">{post.text}</p>
    </div>
  );
}
