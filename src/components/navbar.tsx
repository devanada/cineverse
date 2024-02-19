"use client";

// import { getSession, signOut } from "next-auth/react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

const Navbar = async () => {
  //   const session = await getSession();

  return (
    <div className="supports-backdrop-blur:bg-background/60 sticky left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="container flex h-16 items-center px-4">
        <div className="mr-4 flex">
          <div className="hidden md:flex">
            <Link className="text-lg font-semibold text-nowrap" href="/">
              CineVerse
            </Link>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-end h-full w-full">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>KS</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="end" forceMount>
              <DropdownMenuItem asChild>
                <Link href="/">Login</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
