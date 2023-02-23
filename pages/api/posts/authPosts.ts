import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";
import { ErrorProps } from "next/error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Not authenticated" });

    // Get Auth Users Posts
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session?.user?.email || "",
        },
        include: {
          posts: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              Comment: true,
            },
          },
        },
      });

      res.status(200).json(data);
    } catch (error: any) {
      console.error(error.message);
      return res.status(403).json({ error: error.message });
    }
  }
}
