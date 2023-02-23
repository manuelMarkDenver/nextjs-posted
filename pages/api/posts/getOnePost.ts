import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "../../../prisma/client";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Not authenticated" });

  if (req.method === "GET") {
    try {
      const data = await prisma.post.findFirst({
        where: {
            id: req.body,
        }
      });
      return res
        .status(200)
        .json({ result: data, message: "Post successfully fetched." });
    } catch (error: any) {
      console.error(error.message);
      return res.status(403).json({ error: "error fetching posts" });
    }
  }
}
