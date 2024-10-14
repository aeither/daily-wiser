import { type ClassValue, clsx } from "clsx";
import type React from 'react';
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Constants for XP calculation
const BASE_XP = 100;
const XP_MULTIPLIER = 1.5;

// Function to calculate level and max XP based on current XP
export const calculateLevelAndMaxXp = (initialXp: number) => {
  let level = 1;
  let xpForNextLevel = BASE_XP;
  let remainingXp = initialXp;

  while (remainingXp >= xpForNextLevel) {
    remainingXp -= xpForNextLevel;
    level++;
    xpForNextLevel = Math.floor(xpForNextLevel * XP_MULTIPLIER);
  }

  return { level, currentXp: remainingXp, maxXp: xpForNextLevel };
};

export function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}


export function linkify(text: string): React.ReactNode[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}