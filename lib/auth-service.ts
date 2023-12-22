import { currentUser } from "@clerk/nextjs";

import { db } from "./db";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthoraized");
  }

  const user = await db.user.findUnique({ where: { username: self.username } });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
