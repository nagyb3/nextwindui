import { TPost } from "@/utils/types/post";
import Link from "next/link";
import React from "react";

export default function UniversalPost({ post }: { post: TPost }) {
  return (
    <Link
      key={post.id}
      className="border border-white bg-[var(--post-background)] px-4 py-4 gap-y-2 flex flex-col rounded cursor-pointer w-[600px]"
      href={`/subforums/${post.subforum_name}/${post.id}`}
    >
      <p className="text-lg font-semibold">{post.title}</p>
      <p>{post.text}</p>
    </Link>
  );
}
