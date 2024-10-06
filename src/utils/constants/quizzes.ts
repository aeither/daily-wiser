type Category =
  | "psychology"
  | "philosophy"
  | "personal development"
  | "economics"
  | "mathematics"
  | "history"
  | "science"
  | "technology";

type Quiz = {
  id: string;
  title: string;
  description: string;
  image?: string;
  category?: Category;
  group?: string;
  endscreen?: string;
  slides: Slide[];
};

type Slide = {
  type: "info" | "quiz";
  content: string;
  media?: string;
  options?: string[];
  correctAnswer?: string;
};

export const quizDatas: Quiz[] = [
  {
    id: "ADEA87C4-4ED6-4DAA-B21E-B90E2761CA35",
    title: "Math Fundamentals: Arithmetic and Algebra",
    description:
      "Test your basic math skills with arithmetic and algebraic problems.",
    category: "mathematics",
    endscreen:
      "Congratulations on completing the Math Fundamentals quiz! Remember, practice makes perfect in mathematics. Keep solving problems to sharpen your arithmetic and algebraic skills.",
    slides: [
      {
        type: "info",
        content:
          "Arithmetic is the foundation of mathematics, dealing with basic operations like addition, subtraction, multiplication, and division.",
      },
      {
        type: "info",
        content:
          "Algebra introduces the concept of variables, allowing us to solve more complex problems and represent general relationships. For example, in the equation x + 5 = 12, x represents an unknown number.",
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
    id: "99F70E46-4C0D-486F-A76F-3D7CA96DDD38",
    title: "World War II: Key Events and Figures",
    description:
      "Explore the major events and influential people of World War II.",
    category: "history",
    group: "20th Century Conflicts",
    endscreen:
      "Well done on finishing the World War II quiz! To deepen your understanding, consider exploring primary sources, watching documentaries, or reading books about this pivotal period in history.",
    slides: [
      {
        type: "info",
        content:
          "World War II was a global conflict that lasted from 1939 to 1945, involving most of the world's nations. It ended in 1945 with the surrender of Germany in May and Japan in August.",
      },
      {
        type: "info",
        content:
          "Key figures in World War II included political leaders like Winston Churchill, who served as Prime Minister of the United Kingdom from 1940 to 1945, leading the country through most of the war.",
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
          "Who was the Prime Minister of the United Kingdom for most of World War II?",
        options: [
          "Neville Chamberlain",
          "Winston Churchill",
          "Clement Attlee",
          "Anthony Eden",
        ],
        correctAnswer: "Winston Churchill",
      },
    ],
  },
  {
    id: "C60B9594-804A-45C0-BE12-2829197C1109",
    title: "Introduction to Quantum Mechanics",
    description: "Discover the fundamental principles of quantum mechanics.",
    category: "science",
    group: "Physics Concepts",
    endscreen:
      "Great job completing the Quantum Mechanics quiz! This field is complex and fascinating. To learn more, look into online courses, scientific journals, or popular science books on quantum physics.",
    slides: [
      {
        type: "info",
        content:
          "Quantum mechanics describes the behavior of matter and energy at the molecular, atomic, nuclear, and even smaller microscopic levels. One key principle is Heisenberg's Uncertainty Principle, which states that we cannot simultaneously know the exact position and momentum of a particle.",
      },
      {
        type: "info",
        content:
          "Another fundamental concept in quantum mechanics is superposition, where particles can exist in multiple states simultaneously until measured or observed.",
      },
      {
        type: "quiz",
        content:
          "What is the name of the principle that states we cannot simultaneously know the exact position and momentum of a particle?",
        options: [
          "Einstein's Relativity",
          "Heisenberg's Uncertainty Principle",
          "Schrödinger's Cat Theorem",
          "Bohr's Complementarity Principle",
        ],
        correctAnswer: "Heisenberg's Uncertainty Principle",
      },
      {
        type: "quiz",
        content:
          "What is the term for the phenomenon where particles can exist in multiple states simultaneously until observed?",
        options: [
          "Quantum Leap",
          "Superposition",
          "Entanglement",
          "Wave Function Collapse",
        ],
        correctAnswer: "Superposition",
      },
    ],
  },
  {
    id: "6559BFA0-D0CF-475A-9345-1902DB440165",
    title: "Modern Web Development Fundamentals",
    description:
      "Learn about key concepts and technologies in modern web development.",
    category: "technology",
    group: "Web Technologies",
    endscreen:
      "Congratulations on completing the Web Development Fundamentals quiz! The field of web development is constantly evolving. Stay updated by following tech blogs, participating in coding challenges, and building your own projects.",
    slides: [
      {
        type: "info",
        content:
          "Modern web development involves a combination of frontend technologies like HTML, CSS, and JavaScript, and backend technologies like Node.js, Python, or Ruby. APIs (Application Programming Interfaces) are crucial, allowing different software systems to communicate and share data.",
      },
      {
        type: "info",
        content:
          "CSS (Cascading Style Sheets) is a cornerstone of web development, used to describe the presentation of a document written in HTML or XML. It controls layout, colors, fonts, and other visual aspects of web pages.",
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
  {
    id: "2",
    title: "The 1st Law: Make It Obvious",
    description:
      "Learn about the first law of Atomic Habits and how to make your habits more visible.",
    category: "personal development",
    group: "Atomic Habits",
    endscreen:
      "Great job! You've learned about making habits obvious. Remember to use implementation intentions and habit stacking in your daily life.",
    slides: [
      {
        type: "info",
        content: "Welcome to the 1st Law of Atomic Habits: Make It Obvious!",
      },
      {
        type: "info",
        content:
          "This law focuses on increasing awareness of your habits and making the cues for good habits more visible.",
      },
      {
        type: "info",
        content:
          "One key strategy is to use implementation intentions: 'I will [BEHAVIOR] at [TIME] in [LOCATION].'",
      },
      {
        type: "info",
        content:
          "Another powerful technique is habit stacking: linking a new habit to an existing one.",
      },
      {
        type: "info",
        content: "Let's test your understanding of the 1st Law!",
      },
      {
        type: "quiz",
        content: "What is the purpose of a habit scorecard?",
        options: [
          "To rank habits by importance",
          "To become aware of your habits",
          "To eliminate bad habits",
          "To create new habits",
        ],
        correctAnswer: "To become aware of your habits",
      },
      {
        type: "quiz",
        content: "Which statement is an example of habit stacking?",
        options: [
          "I will meditate for 10 minutes every morning",
          "After I pour my morning coffee, I will meditate for 10 minutes",
          "I will meditate whenever I feel stressed",
          "I will meditate in my bedroom",
        ],
        correctAnswer:
          "After I pour my morning coffee, I will meditate for 10 minutes",
      },
    ],
  },
  {
    id: "3",
    title: "The 2nd Law: Make It Attractive",
    description:
      "Discover how to make your habits more appealing and increase your motivation.",
    category: "personal development",
    group: "Atomic Habits",
    endscreen:
      "Well done! You've learned about making habits attractive. Try implementing temptation bundling in your own life.",
    slides: [
      {
        type: "info",
        content: "Welcome to the 2nd Law of Atomic Habits: Make It Attractive!",
      },
      {
        type: "info",
        content:
          "This law is about making your habits more appealing and increasing your motivation to perform them.",
      },
      {
        type: "info",
        content:
          "One key strategy is temptation bundling: pairing an action you want to do with an action you need to do.",
      },
      {
        type: "info",
        content:
          "Another important aspect is joining a culture where your desired behavior is the normal behavior.",
      },
      {
        type: "info",
        content: "Let's test your understanding of the 2nd Law!",
      },
      {
        type: "quiz",
        content: "What is the role of dopamine in habit formation?",
        options: [
          "It makes habits easier",
          "It increases craving and motivation",
          "It helps break bad habits",
          "It improves memory",
        ],
        correctAnswer: "It increases craving and motivation",
      },
      {
        type: "quiz",
        content: "Which is an example of temptation bundling?",
        options: [
          "Listening to audiobooks while exercising",
          "Eating healthy food instead of junk food",
          "Meditating every morning",
          "Setting reminders for important tasks",
        ],
        correctAnswer: "Listening to audiobooks while exercising",
      },
    ],
  },
  {
    id: "4",
    title: "The 3rd Law: Make It Easy",
    description:
      "Learn how to reduce friction for good habits and increase it for bad ones.",
    category: "personal development",
    group: "Atomic Habits",
    endscreen:
      "Excellent work! You've learned about making habits easier. Remember the Two-Minute Rule and try to optimize your environment for success.",
    slides: [
      {
        type: "info",
        content: "Welcome to the 3rd Law of Atomic Habits: Make It Easy!",
      },
      {
        type: "info",
        content:
          "This law focuses on reducing friction associated with good habits and increasing friction for bad habits.",
      },
      {
        type: "info",
        content:
          "One key strategy is the Two-Minute Rule: Scale down your habits until they can be done in two minutes or less.",
      },
      {
        type: "info",
        content:
          "Another important technique is environment design: optimizing your surroundings to make good habits easier.",
      },
      {
        type: "info",
        content: "Let's test your understanding of the 3rd Law!",
      },
      {
        type: "quiz",
        content: "What is the main principle behind the Law of Least Effort?",
        options: [
          "Habits should be challenging",
          "We naturally gravitate toward the option that requires the least amount of work",
          "Effort always leads to success",
          "Easy habits are less effective",
        ],
        correctAnswer:
          "We naturally gravitate toward the option that requires the least amount of work",
      },
      {
        type: "quiz",
        content:
          "How can you apply the Two-Minute Rule to start a reading habit?",
        options: [
          "Read for two hours every day",
          "Read two books per month",
          "Read one page per day",
          "Join a book club that meets every two weeks",
        ],
        correctAnswer: "Read one page per day",
      },
    ],
  },
  {
    id: "5",
    title: "The 4th Law: Make It Satisfying",
    description:
      "Discover how to make your habits immediately rewarding to increase repetition.",
    category: "personal development",
    group: "Atomic Habits",
    endscreen:
      "Congratulations! You've completed all four laws of Atomic Habits. Apply these principles to transform your habits and achieve your goals.",
    slides: [
      {
        type: "info",
        content: "Welcome to the 4th Law of Atomic Habits: Make It Satisfying!",
      },
      {
        type: "info",
        content:
          "This law is about making your habits immediately rewarding to increase the odds that you'll repeat them in the future.",
      },
      {
        type: "info",
        content:
          "One key strategy is habit tracking: using a visual measure of your progress to motivate yourself.",
      },
      {
        type: "info",
        content:
          "Another important technique is never missing twice: if you miss a day, get back on track immediately.",
      },
      {
        type: "info",
        content: "Let's test your understanding of the 4th Law!",
      },
      {
        type: "quiz",
        content: "What is the Cardinal Rule of Behavior Change?",
        options: [
          "What is rewarded is repeated",
          "Habits take 21 days to form",
          "Willpower is the key to success",
          "Change happens overnight",
        ],
        correctAnswer: "What is rewarded is repeated",
      },
      {
        type: "quiz",
        content: "How can habit tracking help in forming new habits?",
        options: [
          "It makes the habit more complex",
          "It provides a visual cue of your progress",
          "It replaces the actual habit",
          "It makes the habit more difficult",
        ],
        correctAnswer: "It provides a visual cue of your progress",
      },
    ],
  },
];