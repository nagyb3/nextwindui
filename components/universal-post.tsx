"use client";

import { TPost } from "@/utils/types/post";
import React from "react";
import {
  HandThumbUpIcon as HandThumbUpIconOutline,
  HandThumbDownIcon as HandThumbDownIconOutline,
} from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon as HandThumbUpIconSolid,
  HandThumbDownIcon as HandThumbDownIconSolid,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function UniversalPost({
  post,
  showSubforum,
}: {
  post: TPost;
  showSubforum?: boolean;
}) {
  const router = useRouter();

  const handleThumbsUpButton = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    console.log("handleThumbsDownButton");
  };

  const handleThumbsDownButton = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    console.log("handleThumbsDownButton");
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
            {false ? (
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
            {false ? (
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
