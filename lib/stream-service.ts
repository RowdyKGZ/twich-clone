import { db } from "@/lib/db";

export const getStreamUserId = async (userId: string) => {
  const stream = await db.stream.findUnique({ where: { userId } });

  return stream;
};
