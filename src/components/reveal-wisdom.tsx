"use client";

import { useAddWisdom, useCanAddWisdom } from "@/hooks/use-feedback";
import { apiReact } from "@/trpc/react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Card } from "./ui/card";

const RevealWisdom = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [today, setToday] = useState("");
  const [canAdd, setCanAdd] = useState(false);
  const [nextWisdomTime, setNextWisdomTime] = useState(0);
  const [latestWisdom, setLatestWisdom] = useState("");
  const [claimedDays, setClaimedDays] = useState<boolean[]>(
    Array(7).fill(false)
  );
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const { mutateAsync } = apiReact.ai.getDailyQuote.useMutation();
  const { addWisdom, isPendingTx } = useAddWisdom();
  const { canAddWisdom, timeUntilNextWisdom, getLatestWisdom } =
    useCanAddWisdom();

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  useEffect(() => {
    const now = new Date();
    setToday(daysOfWeek[now.getDay()]);

    const checkWisdomStatus = async () => {
      const canAddNow = await canAddWisdom();
      setCanAdd(canAddNow);

      if (!canAddNow) {
        const timeUntilNext = await timeUntilNextWisdom();
        setNextWisdomTime(Number(timeUntilNext));

        const wisdom = await getLatestWisdom();
        setLatestWisdom(wisdom[2]);

        const newClaimedDays = [...claimedDays];
        newClaimedDays[now.getDay()] = true;
        setClaimedDays(newClaimedDays);
      }
    };

    checkWisdomStatus();
  }, []);

  const handleRevealWisdom = async (day: string, index: number) => {
    if (day === today && canAdd && !isTransactionPending) {
      try {
        setIsTransactionPending(true);
        const { quote, date } = await mutateAsync();
        await addWisdom(quote);

        const newClaimedDays = [...claimedDays];
        newClaimedDays[index] = true;
        setClaimedDays(newClaimedDays);

        const canAddNow = await canAddWisdom();
        setCanAdd(canAddNow);
        if (!canAddNow) {
          const timeUntilNext = await timeUntilNextWisdom();
          setNextWisdomTime(Number(timeUntilNext));
          setLatestWisdom(quote);
        }

        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      } catch (error) {
        console.error("Error revealing wisdom:", error);
        // Reset states if transaction fails or is rejected
        setCanAdd(true);
      } finally {
        setIsTransactionPending(false);
      }
    }
  };

  return (
    <Card className="p-4 shadow-lg rounded-xl">
      {showConfetti && <Confetti />}
      <h2 className="text-xl font-semibold mb-2 text-purple-700">
        Unlock your Daily Dose of Wisdom
      </h2>
      <p className="text-gray-600 mb-4">
        Click on today's day to unveil a daily dose of wisdom and inspiration!
      </p>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {daysOfWeek.map((day, index) => (
          <button
            type="button"
            key={index}
            onClick={() => handleRevealWisdom(day, index)}
            disabled={
              day !== today ||
              claimedDays[index] ||
              !canAdd ||
              isTransactionPending ||
              isPendingTx
            }
            className={`aspect-square rounded-full flex items-center justify-center text-purple-700 font-semibold 
              ${
                day === today &&
                !claimedDays[index] &&
                canAdd &&
                !isTransactionPending
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer transform hover:scale-110 transition-all"
                  : claimedDays[index] || isTransactionPending
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-purple-200"
              }`}
          >
            {day === today ? (isTransactionPending ? "⏳" : "🏆") : day}
          </button>
        ))}
      </div>
      {!canAdd && (
        <div className="mt-4 text-center text-purple-700">
          <p>
            You can reveal again in {Math.floor(nextWisdomTime / 3600)} hours
            and {Math.floor((nextWisdomTime % 3600) / 60)} minutes
          </p>
          <p className="mt-2 text-accent">{latestWisdom}</p>
        </div>
      )}
    </Card>
  );
};

export default RevealWisdom;
