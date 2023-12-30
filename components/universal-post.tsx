import { TPost } from "@/utils/types/post";
import Link from "next/link";
import React from "react";
import {
  HandThumbUpIcon as HandThumbUpIconOutline,
  HandThumbDownIcon as HandThumbDownIconOutline,
} from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon as HandThumbUpIconSolid,
  HandThumbDownIcon as HandThumbDownIconSolid,
} from "@heroicons/react/24/solid";

export default function UniversalPost({
  post,
  showSubforum,
}: {
  post: TPost;
  showSubforum?: boolean;
}) {
  const handleThumbsUpButton = () => {
    //
  };

  const handleThumbsDownButton = () => {
    //
  };

  return (
    <Link
      className="border border-white bg-[var(--post-background)] px-4 py-4 gap-y-2 flex flex-col rounded cursor-pointer w-[600px]"
      href={`/subforums/${post.subforum_name}/${post.id}`}
    >
      <div className="flex justify-between">
        <p className="text-lg font-semibold">{post.title}</p>
        <div className="flex gap-x-4">
          <div className="flex gap-x-1">
            {false ? (
              <HandThumbDownIconSolid
                onClick={handleThumbsDownButton}
                className="text-white w-[24px] h-[24px] cursor-pointer"
              />
            ) : (
              <HandThumbDownIconOutline
                onClick={handleThumbsDownButton}
                className="text-white w-[24px] h-[24px] cursor-pointer"
              />
            )}
            <p>{post.users_who_downvoted.length}</p>
          </div>
          <div className="flex gap-x-1">
            {false ? (
              <HandThumbUpIconSolid
                onClick={handleThumbsUpButton}
                className="text-white w-[24px] h-[24px] cursor-pointer"
              />
            ) : (
              <HandThumbUpIconOutline
                onClick={handleThumbsUpButton}
                className="text-white w-[24px] h-[24px] cursor-pointer"
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
    </Link>
  );
}
