import { notFound } from "next/navigation";

import { getUserByusername } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";

import { Actions } from "./_components/actions";

interface UserPageProps {
  params: { username: string };
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByusername(params.username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-4">
      <p>username: {user.username}</p>
      <p>user ID: {user.id}</p>
      <p>isFollwoing: {`${isFollowing}`}</p>
      <p>isBlocked: {`${isBlocked}`}</p>

      <Actions isFollowing={isFollowing} userId={user.id} />
    </div>
  );
};

export default UserPage;
