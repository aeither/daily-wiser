"use client";

import { Card, CardContent } from "@/components/ui/card";
import { apiReact } from "@/trpc/react";
import { shortenEthAddress } from "@/utils";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Component() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const router = useRouter();
  const { data: tutors } = apiReact.user.getPublicBots.useQuery();

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("scroll-container");
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  const handleCardClick = (tutorId: string) => {
    router.push(`/chat?botId=${tutorId}`);
  };

  return (
    <div className="relative">
      <div
        id="scroll-container"
        className="flex overflow-x-auto scrollbar-hide space-x-4 p-4"
      >
        {tutors?.map((tutor, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-72"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden h-96 cursor-pointer hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="relative h-1/2">
                  {tutor.imageUrl && (
                    <img
                      src={tutor.imageUrl}
                      alt={tutor.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="font-bold text-xl mb-1 text-shadow">
                      {tutor.name}
                    </h3>
                    <p className="text-purple-300 text-sm">
                      by {shortenEthAddress(tutor.creatorAddress)}
                    </p>
                  </div>
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <p className="text-sm line-clamp-3">{tutor.description}</p>
                  <button
                    type="button"
                    onClick={() => handleCardClick(tutor.id)}
                    className="mt-4 bg-white text-purple-700 font-bold py-2 px-4 rounded-full hover:bg-purple-100 transition-colors duration-300"
                  >
                    Chat
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => handleScroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
        style={{ display: scrollPosition > 0 ? "block" : "none" }}
      >
        <ChevronLeft className="text-purple-900" />
      </button>
      <button
        type="button"
        onClick={() => handleScroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
      >
        <ChevronRight className="text-purple-900" />
      </button>
    </div>
  );
}
