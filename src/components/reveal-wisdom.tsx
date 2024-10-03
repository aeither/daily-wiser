"use client";

import { useAddWisdom, useCanAddWisdom } from "@/hooks/use-feedback";
import { apiReact } from "@/trpc/react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Card } from "./ui/card";

const RevealWisdom = () => {
  const [showQuote, setShowQuote] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [today, setToday] = useState("");
  const [canAdd, setCanAdd] = useState(false);
  const [nextWisdomTime, setNextWisdomTime] = useState(0);
  const [latestWisdom, setLatestWisdom] = useState("");
  const { data, mutateAsync } = apiReact.ai.getDailyQuote.useMutation();
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
        console.log("🚀 ~ checkWisdomStatus ~ wisdom:", wisdom)
        setLatestWisdom(wisdom.quote);
      }
    };

    checkWisdomStatus();
  }, []);

  const handleRevealWisdom = async () => {
    if (canAdd) {
      setShowQuote(true);
      setShowConfetti(true);
      const { quote, date } = await mutateAsync();
      await addWisdom(quote);
      setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds

      // Refresh the wisdom status after adding
      const canAddNow = await canAddWisdom();
      setCanAdd(canAddNow);
      if (!canAddNow) {
        const timeUntilNext = await timeUntilNextWisdom();
        setNextWisdomTime(Number(timeUntilNext));
        setLatestWisdom(quote);
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
        Click the button to unveil a daily dose of wisdom and inspiration!
      </p>
      <button
        type="button"
        onClick={handleRevealWisdom}
        disabled={!canAdd || isPendingTx}
        className={`w-full py-2 rounded-full font-semibold 
          ${
            canAdd
              ? "bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer transform hover:scale-105 transition-all"
              : "bg-gray-300 cursor-not-allowed text-gray-500"
          }`}
      >
        {canAdd ? "Reveal Wisdom" : "Wisdom Claimed"}
      </button>
      {!canAdd && (
        <div className="mt-4 text-center text-purple-700">
          <p>
            You can add wisdom again in {Math.floor(nextWisdomTime / 3600)}{" "}
            hours and {Math.floor((nextWisdomTime % 3600) / 60)} minutes
          </p>
          <p className="mt-2">Your latest wisdom: "{latestWisdom}"</p>
        </div>
      )}
      {showQuote && data && (
        <span className="text-center block mt-4 text-purple-700">
          "{data.quote}" - {data.date}
        </span>
      )}
    </Card>
  );
};

export default RevealWisdom;
