"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";

import { NavItem, NavItemSkeleton } from "./nav-item";

export const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const routes = [
    { label: "Stream", href: `/u/${user?.username}`, icon: Fullscreen },
    { label: "Keys", href: `/u/${user?.username}/keys`, icon: KeyRound },
    { label: "Chat", href: `/u/${user?.username}/chat`, icon: MessageSquare },
    {
      label: "Communuty",
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
  ];

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((rout) => (
        <NavItem
          key={rout.href}
          label={rout.label}
          icon={rout.icon}
          href={rout.href}
          isActive={pathname === rout.href}
        />
      ))}
    </ul>
  );
};
