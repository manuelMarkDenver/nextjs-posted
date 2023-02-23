"use client";

import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Toggle from "./Toggle";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  Comment?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

const EditPost = ({ avatar, name, title, Comment, id }: EditProps) => {
  //Toggle
  const [toggle, setToggle] = useState(false);
  let deleteToastId: string;
  const queryClient = useQueryClient();

  //Delete post
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete(`/api/posts/deletePost/`, { data: id }),
    {
      onError: (error) => {
        toast.error("Error deleting that post", { id: deleteToastId });
      },
      onSuccess: (data) => {
        toast.success("Post has been deleted.", { id: deleteToastId });
        queryClient.invalidateQueries(["auth-posts"]);
      },
    }
  );

  const deletePost = async () => {
    deleteToastId = toast.loading("Deleting post...", { id: deleteToastId });
    mutate(id);
  };

  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div>
          <Image
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
            className="rounded-full"
          />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-small font-bold text-gray-700">
            {Comment?.length} Comments
          </p>
          <button
            onClick={(e) => {
              setToggle(true);
            }}
            className="text-sm font-bold text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
};

export default EditPost;
