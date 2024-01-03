"use client";

import { useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { LocalParticipant, RemoteParticipant } from "livekit-client";
import { useParticipants } from "@livekit/components-react";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { CommunityItem } from "./community-item";

interface ChatCommunityProps {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
}

export const ChatCommunity = ({
  hostName,
  isHidden,
  viewerName,
}: ChatCommunityProps) => {
  const [value, setValue] = useState("");

  const participants = useParticipants();
  const debouncedValue = useDebounce<string>(value, 500);

  const onChange = (newValue: string) => {
    setValue(value);
  };

  const filteredPartipicants = useMemo(() => {
    const deduped = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;

      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }

      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduped.filter((participant) => {
      return participant.name
        ?.toLocaleLowerCase()
        .includes(debouncedValue.toLowerCase());
    });
  }, [participants, debouncedValue]);

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is dissabled</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search community"
        className="border-white/10"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
          No results
        </p>
        {filteredPartipicants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
