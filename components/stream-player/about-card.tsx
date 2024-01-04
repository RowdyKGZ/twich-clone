"use client";

import { VerifiedMark } from "@/components/verified-mark";

import { BioModal } from "./bio-modal";

interface AboutCardProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: null | string;
  followedByCount: number;
}

export const AboutCard = ({
  bio,
  followedByCount,
  hostIdentity,
  hostName,
  viewerIdentity,
}: AboutCardProps) => {
  const hostAsWiever = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsWiever;

  const followedByLabel = followedByCount === 1 ? "follower" : "followers";

  return (
    <div className="px-4">
      <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            About {hostName}
            <VerifiedMark />
          </div>
          {isHost && <BioModal initialValue={bio} />}
        </div>

        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{followedByCount}</span>{" "}
          {followedByLabel}
        </div>

        <p className="text-sm">
          {bio || "This is user prefers to keep an air of mystery about them."}
        </p>
      </div>
    </div>
  );
};
