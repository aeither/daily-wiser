import { type ClassValue, clsx } from "clsx";
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
