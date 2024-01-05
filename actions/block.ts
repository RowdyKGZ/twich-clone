"use server";

import { revalidatePath } from "next/cache";
import { RoomServiceClient } from "livekit-server-sdk";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export const onBlock = async (id: string) => {
  const self = await getSelf();

  let blockedUser;

  try {
    blockedUser = await blockUser(id);
  } catch (error) {}

  try {
    await roomService.removeParticipant(self.id, id);
  } catch (error) {}

  revalidatePath(`/u/${self.username}/community`);

  return blockedUser;
};

export const onUnBlock = async (id: string) => {
  const unBlockedUser = await unblockUser(id);

  revalidatePath("/");

  if (unBlockedUser) {
    revalidatePath(`/${unBlockedUser.blocked.username}`);
  }
  return unBlockedUser;
};
