"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

type PostType = {
  id?: string;
};

type Comment = {
  message: string;
  id?: string;
};

const AddComment = ({ id }: PostType) => {
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let commentToastID: string;

  const { mutate } = useMutation(
    async ({ message, id }: Comment) =>
      axios.post("/api/posts/addComment", { message, id }),
    {
      onError: (error, variables, context) => {
        setIsDisabled(false);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.error, { id: commentToastID });
        }
        console.log(error);
      },
      onSuccess: (data) => {
        setMessage("");
        setIsDisabled(false);
        queryClient.invalidateQueries(["posts"]);
        console.log("Added your comment", { id: commentToastID });
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    (commentToastID = toast.loading("Adding comment...")),
      { id: commentToastID };
    mutate({ message, id });
  };

  return (
    <form className="my-8" onSubmit={submitComment}>
      <h3>Add Comment</h3>
      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          name="message"
          type="text"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            message.length > 300 ? "text-red-300" : "text-gray-700"
          }`}
        >{`${message.length}/300`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add Comment 🚀
        </button>
      </div>
    </form>
  );
};

export default AddComment;
