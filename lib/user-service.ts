import { db } from "@/lib/db";

export const getUserByusername = async (username: string) => {
  const user = await db.user.findUnique({
    where: { username: username },
  });

  return user;
};
