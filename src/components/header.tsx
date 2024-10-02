"use client";

import { apiReact } from "@/trpc/react";
import { Coins, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";
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
  }, [isConnected, address]);

  return (
    <header className="fixed z-50 top-0 left-0 w-full flex justify-between items-center p-4 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="flex items-center">
        <Link href="/" passHref>
          <div className="text-2xl font-bold flex items-center cursor-pointer mr-6">
            <Sparkles className="mr-2" />
            DailyWiser
          </div>
        </Link>
        <nav className="flex items-center space-x-4">
          {isConnected && user && <XpBar xp={user.xp ?? "0"} />}
          {/* <Link href="/select-meme" passHref>
            <Button variant="link" className="text-black">
              Create Meme
            </Button>
          </Link> */}
          {/* <Link href="/image" passHref>
            <Button variant="link" className="text-black">
              AI Image
            </Button>
          </Link>
           <Link href="/resume" passHref>
            <Button variant="link">Resume Builder</Button>
          </Link> */}
          <Link href="/select-quiz" passHref>
            <Button variant="link">Quiz</Button>
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Link href="/credits" passHref>
            {isConnected && user ? (
              <Button variant="outline" size="sm" className="flex items-center">
                <Plus className="h-4 w-4 mr-1" />
                <span className="font-semibold ml-4 mr-2">
                  {user.totalCredits ?? "Loading..."}
                </span>
                <Coins className="text-yellow-400 w-4" />
              </Button>
            ) : (
              <span className="font-semibold ml-4 mr-2">
                {/* Connect First */}
              </span>
            )}
          </Link>
        </div>
        <w3m-button />
      </div>
    </header>
  );
};

export default Header;
