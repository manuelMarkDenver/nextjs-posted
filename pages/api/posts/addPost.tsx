import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";
import { ErrorProps } from "next/error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Not authenticated" });

    const title: string = req.body.title;
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    //Check title
    if (title.length > 300)
      return res.status(403).json({ error: "Title is too long" });
    if (!title.length)
      return res.status(403).json({ error: "Title is empty" });

    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser.id,
        },
      });

      return res.status(200).json({ result: result, message: "Post created" });
    } catch (error: any) {
      console.error(error.message);
      return res.status(403).json({ error: error.message });
    }
  }
}
