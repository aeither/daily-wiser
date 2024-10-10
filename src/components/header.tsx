"use client";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { apiReact } from "@/trpc/react";
import { Coins, Droplet, Menu, Plus, Sparkles } from "lucide-react";
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

  const navItems = [
    { href: "/", label: "DailyWiser", icon: Sparkles },
    { href: "/select-quiz", label: "Quiz" },
    { href: "/chat", label: "Chat" },
    { href: "/faucet", label: "Faucet", icon: Droplet },
  ];

  const renderNavItem = (item: any, isMobile = false) => (
    <Link key={item.href} href={item.href} passHref>
      <Button
        variant="ghost"
        className={isMobile ? "w-full justify-start" : ""}
      >
        {item.icon && <item.icon className="mr-2 h-5 w-5" />}
        {item.label}
      </Button>
    </Link>
  );

  const renderCredits = () =>
    isConnected &&
    user && (
      <Link href="/credits" passHref>
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
      </Link>
    );

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
            {navItems.map((item) => renderNavItem(item, true))}
            {isConnected && user && (
              <div className="flex items-center space-x-2">
                <XpBar xp={user.xp ?? "0"} />
                {renderCredits()}
              </div>
            )}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex items-center space-x-4">
        {renderNavItem(navItems[0])}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navItems.slice(1).map((item) => (
              <Link key={item.href} href={item.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  {item.label}
                </NavigationMenuLink>
              </Link>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        {isConnected && user && (
          <div className="hidden md:block">
            <XpBar xp={user.xp ?? "0"} />
          </div>
        )}
        <div className="hidden md:block">{renderCredits()}</div>
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
