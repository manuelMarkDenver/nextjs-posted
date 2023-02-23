"use client";

import Post from "@/app/components/Post";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AddComment from "@/app/components/AddComment";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const result = await axios.get(`/api/posts/${slug}`);
  console.log({result})
  return result.data;
};

const PostDetail = (url: URL) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <h1>
        <Post
          id={data?.id}
          name={data?.user?.name}
          image={data?.user?.image}
          title={data?.title}
          comments={data?.comment}
        />
      </h1>
      <AddComment id={data?.id} />
    </div>
  );
};

export default PostDetail;
