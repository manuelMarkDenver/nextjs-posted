"use client";
import Image from "next/image";
import Link from "next/link";
// import { PostType } from "@/app/Types/Posts";


import React from "react";

interface PostType {
  id: number;
  name: string;
  image: string;
  title: string;
  comments: string[];
}

const Post = ({ id, name, image, title, comments}: PostType) => {
  console.log("🚀 ~ file: Post.tsx:18 ~ Post ~ comments", comments)
  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          src={image}
          className="rounded-full"
          width={32}
          height={32}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{title}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Post;
