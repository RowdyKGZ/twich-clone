import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

export const NavbarLogo = () => {
  return (
    <Link href="/" className="flex items-center hover:opacity-75 transition">
      <div className="bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-2 lg:shrink">
        <Image src="/spooky.svg" alt="Gamehub" height={32} width={32} />
      </div>

      <div className={cn("hidden lg:block", font.className)}>
        <p className="text-lg font-semibold">Gamehub</p>
        <p className="text-xs text-muted-foreground">Creator Dashboard</p>
      </div>
    </Link>
  );
};
