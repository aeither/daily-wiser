"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { apiReact } from "@/trpc/react";
import { Coins, Menu, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import XpBar from "./xp-bar";

const Header = () => {
  const { address, isConnected } = useAccount();
  const { data: user, refetch } = apiReact.user.getUser.useQuery(
    { address: address as string },
    { enabled: !!address }
  );

  const createOrUpdateUserMutation =
    apiReact.user.createOrUpdateUser.useMutation();

  useEffect(() => {
    if (isConnected && address) {
      createOrUpdateUserMutation.mutate(
        { address },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    }
  }, [isConnected, address, refetch]);

  return (
    <header className="sticky z-50 top-0 left-0 w-full flex justify-between items-center p-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col space-y-4 mt-8">
            <Link href="/" passHref>
              <Button variant="ghost" className="w-full justify-start">
                <Sparkles className="mr-2 h-5 w-5" />
                DailyWiser
              </Button>
            </Link>
            <Link href="/select-quiz" passHref>
              <Button variant="ghost" className="w-full justify-start">
                Quiz
              </Button>
            </Link>
            <Link href="/chat" passHref>
              <Button variant="ghost" className="w-full justify-start">
                Chat
              </Button>
            </Link>
            {isConnected && user && (
              <div className="flex items-center space-x-2">
                <XpBar xp={user.xp ?? "0"} />
                <Link href="/credits" passHref>
                  <Button variant="ghost" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    <span className="font-semibold mr-2">
                      {user.totalCredits ?? "Loading..."}
                    </span>
                    <Coins className="w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex items-center space-x-4">
        <Link href="/" passHref>
          <div className="hidden md:flex text-2xl font-bold items-center cursor-pointer">
            <Sparkles className="mr-2 h-6 w-6" />
            DailyWiser
          </div>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/select-quiz" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Quiz
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/chat" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Chat
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        {isConnected && user && (
          <div className="hidden md:block">
            <XpBar xp={user.xp ?? "0"} />
          </div>
        )}
        <div className="hidden md:block">
          <Link href="/credits" passHref>
            {isConnected && user ? (
              <div className="flex items-center rounded-full border border-amber-500/50 bg-white/20 px-2 gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="mr-2 p-0 hover:bg-transparent"
                >
                  <div className="rounded-sm bg-green-800 p-1 transition-colors hover:bg-green-700">
                    <Plus className="h-4 w-4 text-white" />
                  </div>
                </Button>
                <div className="flex flex-row items-center">
                  <span className="mr-1 font-semibold">
                    {user.totalCredits ?? "Loading..."}
                  </span>
                  <Coins className="h-5 w-5 text-yellow-900" />
                </div>
              </div>
            ) : null}
          </Link>
        </div>
        {isConnected ? (
          <w3m-account-button />
        ) : (
          <w3m-connect-button label="Connect" />
        )}
      </div>
    </header>
  );
};

export default Header;
