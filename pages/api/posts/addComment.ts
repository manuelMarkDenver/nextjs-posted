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

    const prismaUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },
    });
    console.log("🚀 ~ file: addComment.ts:20 ~ prismaUser", prismaUser)

    // Get Auth Users Posts
    console.log("🚀 ~ file: addComment.ts:25 ~ req.body", req.body);
    try {
      const { message, postId } = req.body;

      if (!message.length)
        return res.status(403).json({ error: "Comment cannot be empty" });

      const result = await prisma.comment.create({
        data : {
          message: message,
          userId: prismaUser.id,
          postId: postId
        }
      });

      res.status(200).json(result);
    } catch (error: any) {
      console.error(error.message);
      return res.status(403).json({ error: error.message });
    }
  }
}
