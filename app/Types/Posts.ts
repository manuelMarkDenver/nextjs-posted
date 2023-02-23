export type ResultType = {
  result: PostType[];
  message: string;
};

export type PostType = {
  id: string;
  title: string;
  createdAt: string;
  user: {
    id: string
    name: string;
    image: string;
  };
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
    title: string 
  }[];
}
