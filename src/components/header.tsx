"use client";

import { apiReact } from "@/trpc/react";
import { Coins, Menu, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import XpBar from "./xp-bar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <header className="fixed z-50 top-0 left-0 w-full flex justify-between items-center p-2 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col space-y-4 mt-8">
            <Link href="/" passHref>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                DailyWiser
              </Button>
            </Link>
            <Link href="/select-quiz" passHref>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                Quiz
              </Button>
            </Link>
            {isConnected && user && (
              <div className="flex items-center space-x-2">
                <XpBar xp={user.xp ?? "0"} />
                <Link href="/credits" passHref>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsMenuOpen(false)}
                  >
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
        <Link href="/select-quiz" passHref>
          <Button variant="ghost" className="hidden md:flex items-center">
            Quiz
          </Button>
        </Link>
        <Link href="/chat" passHref>
          <Button variant="ghost" className="hidden md:flex items-center">
            Chat
          </Button>
        </Link>
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
              <Button variant="outline" size="sm" className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                <span className="font-semibold mr-2">
                  {user.totalCredits ?? "Loading..."}
                </span>
                <Coins className="w-4" />
              </Button>
            ) : null}
          </Link>
        </div>
        <w3m-button />
      </div>
    </header>
  );
};

export default Header;