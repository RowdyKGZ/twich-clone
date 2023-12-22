import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

export const getRecommended = async () => {
  let userId: string | null;

  try {
    const self = await getSelf();

    userId = self.id;
  } catch (error) {
    userId = null;
  }

  let users = [];

  if (userId) {
    users = await db.user.findMany({
      where: { NOT: { id: userId } },
      orderBy: { createdAt: "desc" },
    });
  } else {
    users = await db.user.findMany({ orderBy: { createdAt: "desc" } });
  }

  return users;
};
