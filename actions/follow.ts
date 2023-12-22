"use server";

import { revalidatePath } from "next/cache";

import { followUser } from "@/lib/follow-service";

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    revalidatePath("/");

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }

    return followedUser;
  } catch (error) {
    console.log("This is error", error);

    throw new Error("Internal error");
  }
};
