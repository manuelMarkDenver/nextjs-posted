export type PostType = {
  title: string;
  id: string;
  createdAt: string;
  user: {
    name: string;
    image: string;
  };
  Comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
    title: string
    user: {
      email: string
      id: string
      image: string
      name: string
    }
  }[];
}
