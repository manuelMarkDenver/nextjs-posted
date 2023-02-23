import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.post.findMany({
        include: {
          user: true,
          comment: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return res
        .status(200)
        .json({ result: data, message: "Data successfully fetched." });
    } catch (error: any) {
      console.error(error.message);
      return res.status(403).json({ error: "error fetching posts" });
    }
  }
}
