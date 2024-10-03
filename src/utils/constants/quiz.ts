"use client";

interface Slide {
  type: "info" | "quiz";
  content: string;
  options?: string[];
  correctAnswer?: string;
}

export const quizDatas: { id: number; name: string; slides: Slide[] }[] = [
  {
    id: 1,
    name: "Math Maestro: The Calculation Conqueror",
    slides: [
      { type: "info", content: "Welcome to the Math Maestro Quiz!" },
      {
        type: "info",
        content:
          "Mathematics is the language of the universe, allowing us to describe patterns and relationships in nature.",
      },
      {
        type: "info",
        content:
          "Did you know? The concept of zero as a number was developed in India around 500 AD.",
      },
      {
        type: "info",
        content:
          "The Fibonacci sequence, where each number is the sum of the two preceding ones, appears frequently in nature.",
      },
      {
        type: "info",
        content:
          "Are you ready to test your mathematical prowess? Let's begin!",
      },
      {
        type: "quiz",
        content: "What is the result of 7 × 8?",
        options: ["54", "56", "58", "60"],
        correctAnswer: "56",
      },
      {
        type: "quiz",
        content: "If x + 5 = 12, what is the value of x?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "7",
      },
    ],
  },
  {
    id: 2,
    name: "History Hero: Time Traveler Extraordinaire",
    slides: [
      { type: "info", content: "Welcome to the History Hero Quiz!" },
      {
        type: "info",
        content:
          "History is not just about dates and events, but about understanding the human story through time.",
      },
      {
        type: "info",
        content:
          'The Renaissance, meaning "rebirth," was a period of cultural, artistic, and economic revival in Europe from the 14th to 17th centuries.',
      },
      {
        type: "info",
        content:
          "The Industrial Revolution, starting in the late 18th century, marked a major turning point in history, shaping the modern world as we know it.",
      },
      {
        type: "info",
        content:
          "Ready to test your knowledge of history's greatest stories? Let's begin!",
      },
      {
        type: "quiz",
        content: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: "1945",
      },
      {
        type: "quiz",
        content:
          "Who was the first woman to fly solo across the Atlantic Ocean?",
        options: [
          "Amelia Earhart",
          "Bessie Coleman",
          "Harriet Quimby",
          "Jacqueline Cochran",
        ],
        correctAnswer: "Amelia Earhart",
      },
    ],
  },
  {
    id: 3,
    name: "Science Sage: Explorer of the Cosmos",
    slides: [
      { type: "info", content: "Welcome to the Science Sage Quiz!" },
      {
        type: "info",
        content:
          "Science is a systematic enterprise that builds and organizes knowledge in the form of testable explanations and predictions about the universe.",
      },
      {
        type: "info",
        content:
          "The theory of evolution by natural selection, proposed by Charles Darwin, is a cornerstone of modern biology.",
      },
      {
        type: "info",
        content:
          "Quantum mechanics, developed in the early 20th century, describes nature at the smallest scales of energy levels of atoms and subatomic particles.",
      },
      {
        type: "info",
        content: "Ready to unravel scientific concepts? Let's begin!",
      },
      {
        type: "quiz",
        content: "What is the largest planet in our solar system?",
        options: ["Mars", "Jupiter", "Saturn", "Neptune"],
        correctAnswer: "Jupiter",
      },
      {
        type: "quiz",
        content: "What is the process by which plants make their own food?",
        options: ["Photosynthesis", "Respiration", "Fermentation", "Digestion"],
        correctAnswer: "Photosynthesis",
      },
    ],
  },
  {
    id: 4,
    name: "Coding Wizard: Programming Prodigy",
    slides: [
      { type: "info", content: "Welcome to the Coding Wizard Quiz!" },
      {
        type: "info",
        content:
          "Programming is the process of creating a set of instructions that tell a computer how to perform a task.",
      },
      {
        type: "info",
        content:
          "The first programmer in the world was a woman named Ada Lovelace, who wrote the first algorithm designed to be executed by a machine in the mid-1800s.",
      },
      {
        type: "info",
        content:
          'Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data and code.',
      },
      {
        type: "info",
        content: "Ready to debug, optimize, and innovate? Let's begin!",
      },
      {
        type: "quiz",
        content: "What does API stand for?",
        options: [
          "Application Programming Interface",
          "Advanced Programming Interface",
          "Automated Program Integration",
          "Application Process Integration",
        ],
        correctAnswer: "Application Programming Interface",
      },
      {
        type: "quiz",
        content: "What does CSS stand for?",
        options: [
          "Computer Style Sheets",
          "Creative Style Sheets",
          "Cascading Style Sheets",
          "Colorful Style Sheets",
        ],
        correctAnswer: "Cascading Style Sheets",
      },
    ],
  },
];
