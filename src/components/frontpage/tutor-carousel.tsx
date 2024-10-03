"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { apiReact } from "@/trpc/react";
import { shortenEthAddress } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function TutorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: tutors } = apiReact.user.getPublicBots.useQuery();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleScroll = () => {
        const scrollPosition = container.scrollLeft;
        const cardWidth = container.offsetWidth;
        const newIndex = Math.round(scrollPosition / cardWidth);
        setCurrentIndex(newIndex);
      };

      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount =
        direction === "left" ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleCardClick = (tutorId: number) => {
    router.push(`/chat?botId=${tutorId}`);
  };

  if (!tutors || tutors.length === 0) {
    return (
      <div className="text-center p-4">No tutors available at the moment.</div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-4 p-4"
      >
        <AnimatePresence initial={false}>
          {tutors.map((tutor, index) => (
            <motion.div
              key={tutor.id}
              className="flex-shrink-0 w-full sm:w-72 snap-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden h-[28rem] sm:h-96 cursor-pointer hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="relative h-1/2">
                    {tutor.imageUrl && (
                      <img
                        src={tutor.imageUrl}
                        alt={tutor.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
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
                    <Button
                      onClick={() => handleCardClick(tutor.id)}
                      className="mt-4 bg-white text-purple-700 hover:bg-purple-100 transition-colors duration-300"
                    >
                      Chat with {tutor.name}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {tutors.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleScroll("left")}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full hidden sm:block"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleScroll("right")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full hidden sm:block"
            disabled={currentIndex === tutors.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
      <div className="flex justify-center mt-4 space-x-2">
        {tutors.map((_, index) => (
          <Button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-purple-600" : "bg-purple-300"
            }`}
            onClick={() => {
              const container = containerRef.current;
              if (container) {
                container.scrollTo({
                  left: index * container.offsetWidth,
                  behavior: "smooth",
                });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
