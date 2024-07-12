import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = async () => {
  const cookieStore = cookies();
  const sessionID = cookieStore.get("sessionID");

  async function handleLogout() {
    "use server";

    cookies().delete("sessionID");
    cookies().delete("userID");

    revalidatePath("/");
  }

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
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Movies</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-max max-w-xs">
                    <ListItem
                      href="/movies?sort_by=vote_average.desc&vote_count.gte=500"
                      title="Top-Rated Gems"
                    >
                      Discover critically acclaimed & audience favorites.
                    </ListItem>
                    <ListItem
                      href="/movies?sort_by=popularity.desc"
                      title="Hot & Trending Films"
                    >
                      See what everyone's talking about.
                    </ListItem>
                    <ListItem
                      href="/movies?sort_by=release_date.desc"
                      title="Now Showing in Theaters"
                    >
                      Catch the latest releases on the big screen.
                    </ListItem>
                    {/* <ListItem
                      href="/movies?sort_by=release_date.desc"
                      title="Coming Soon"
                    >
                      Get hyped! See what's hitting theaters next.
                    </ListItem> */}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>TV Show</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-max max-w-xs">
                    {/* <ListItem href="/tv?sort_by=popularity.desc" title="Tonight's Lineup">
                      Can't miss what's on now!
                    </ListItem>
                    <ListItem href="/tv" title="Currently Airing">
                      Catch up on shows in progress.
                    </ListItem> */}
                    <ListItem
                      href="/tv?sort_by=popularity.desc"
                      title="Bingeworthy Shows"
                    >
                      Discover the shows everyone's talking about.
                    </ListItem>
                    <ListItem
                      href="/tv?sort_by=vote_average.desc&vote_count.gte=200"
                      title="Critically Acclaimed Shows"
                    >
                      Must-see TV praised by critics.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>KS</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="end" forceMount>
              {sessionID && sessionID?.value.length !== 0 ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/my-favorite">My Favorite</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-watchlist">Watchlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form action={handleLogout}>
                      <button className="w-full text-left">Logout</button>
                    </form>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href="/login">Login</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;
