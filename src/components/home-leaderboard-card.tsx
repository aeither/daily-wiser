// components/LeaderboardCard.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { apiReact } from "@/trpc/react";
import { shortenEthAddress } from "@/utils";
import { Medal, Trophy } from "lucide-react";

const LeaderboardSkeleton = () => (
  <div className="space-y-1">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
    ))}
  </div>
);

const MedalIcon = ({ position }: { position: number }) => {
  switch (position) {
    case 1:
      return <Medal className="h-4 w-4 text-yellow-400" />;
    case 2:
      return <Medal className="h-4 w-4 text-gray-400" />;
    case 3:
      return <Medal className="h-4 w-4 text-amber-600" />;
    default:
      return null;
  }
};

export function LeaderboardCard() {
  const { data: leaderboardData, isLoading: isLeaderboardLoading } =
    apiReact.user.getLeaderboard.useQuery();

  return (
    <Card className="p-3 shadow-lg rounded-xl">
      <Trophy className="h-10 w-10 text-purple-500 mx-auto mb-1" />
      <h2 className="text-lg font-semibold text-purple-700 mb-2 text-center">
        Leaderboard
      </h2>
      {isLeaderboardLoading ? (
        <LeaderboardSkeleton />
      ) : (
        <div className="space-y-1">
          {leaderboardData?.map((user, index) => (
            <div
              key={user.address}
              className={`flex justify-between items-center py-1 px-2 rounded ${
                index < 3 ? "bg-gray-50" : ""
              }`}
            >
              <div className="flex items-center space-x-1">
                <MedalIcon position={index + 1} />
                <span
                  className={`font-semibold ${index === 0 ? "text-base" : "text-sm"}`}
                >
                  {index + 1}.
                </span>
                <span className={`${index < 3 ? "font-medium" : ""} text-sm`}>
                  {shortenEthAddress(user.address)}
                </span>
              </div>
              <span
                className={`${index < 3 ? "font-bold" : ""} text-purple-600 text-sm`}
              >
                {user.xp} XP
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}