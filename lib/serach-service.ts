import { db } from "./db";
import { getSelf } from "./auth-service";

export const getSerach = async (term?: string) => {
  let userId;

  try {
    const self = await getSelf();

    userId = self.id;
  } catch (error) {
    userId = null;
  }

  let streams = [];

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: { NOT: { blocking: { some: { blockedId: userId } } } },
        OR: [
          { name: { contains: term } },
          { user: { username: { contains: term } } },
        ],
      },
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
      },
      orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
    });
  } else {
    streams = await db.stream.findMany({
      where: {
        OR: [
          { name: { contains: term } },
          { user: { username: { contains: term } } },
        ],
      },
      include: { user: true },
      orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
    });
  }

  return streams;
};
