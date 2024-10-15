type Category =
  | "psychology"
  | "philosophy"
  | "personal development"
  | "economics"
  | "mathematics"
  | "history"
  | "science"
  | "technology"
  | "onboard";

export type Quiz = {
  type: "info" | "quiz";
  content: string;
  media?: string;
  options?: string[];
  correctAnswer?: string;
};

export type QuizData = {
  id: string;
  title: string;
  description: string;
  image?: string;
  metadata?: string;
  category?: Category;
  group?: string;
  endscreen?: string;
  slides: Quiz[];
};

export const quizDatas: QuizData[] = [
  /**
   * Onboard Quiz
   */
  {
    id: "S1T2R3E4-5A6M-7B8I-9L10-L11I12N13V14",
    title: "Streambill - invoicing & real time payments",
    description: "Explore how Streambill is reducing stress for freelancers",
    category: "onboard",
    image:
      "https://gateway.pinata.cloud/ipfs/QmYAJSLsaNLWS3R7KXD5sQwzdWVGCcj25q36YaZWgpxBbD/logo_cropped.png",
    metadata:
      "https://gateway.pinata.cloud/ipfs/QmdLhBkHpeS3Y2rfxsbUeGe5hG4zpEi2qxqEBFbUXJgby9/0",
    endscreen:
      "Thank you for learning about Streambill ! :). Visit https://www.streambill.xyz/",
    slides: [
      {
        type: "info",
        content:
          "In the ever-evolving world of freelancing and gig economy, managing payments and cash flow remains a significant challenge. Enter Streambill: your ultimate solution for secure, real-time payments and invoicing. Streambill's mission is to solve a big pain point for freelancers : unpredictable income. Unlike a traditional job, while freelancing you are not sure when you are going to get paid, or even IF you are going to get paid 🤔",
        media: "https://www.streambill.xyz/With.png",
      },
      {
        type: "quiz",
        content:
          "What's the pain point for freelancers that Streambill is aiming to solve ?",
        options: [
          "Having no clients",
          "Promotion on social media",
          "Unpredictable income",
          "Competition",
        ],
        correctAnswer: "Unpredictable income",
      },
      {
        type: "info",
        content:
          "Picture this:\n\n🙋‍♀️ Alice is a talented web developer.\n🙋‍♂️ Bob is a client in need of a new website.\nTheir story unfolds like this:\n\nBob reaches out to Alice for a website project.\nThey agree on terms, and Bob provides a 20% down payment.\nAlice begins work on the website.\nHalfway through the project, Bob vanishes without a trace.\nThe result? Alice potentially loses 30% of the project's value. This scenario is precisely why we built Streambill.\n\nLet's reimagine this situation with Streambill in play:\n\nAlice sends an invoice with a due date matching the contract duration (1 month).\nBob initiates a stream, setting up payments to flow continuously over the month.\nAlice begins work on the project, confident in the payment structure.\nIf Bob disappears halfway through, Alice can still withdraw 50% of the money - exactly matching her work completed.",
      },
      {
        type: "quiz",
        content:
          "When using Streambill, what happens if your client disappears halfway through the project?",
        options: [
          "You stress about your income",
          "You can still withdraw 50% of the money",
          "You start worrying what happens to your work now",
          "Nothing",
        ],
        correctAnswer: "You can still withdraw 50% of the money",
      },
      {
        type: "info",
        content:
          "Streambill is an innovative invoicing and real-time payments application designed for freelancers, gig workers, and their clients. Powered by Sablier's streaming protocol and Request Network's invoicing infrastructure, Streambill offers a comprehensive suite of features:\n\n-Send and manage invoices\n-Stream money in real-time\n-Track payment completion\n-Withdraw funds as work progresses",
      },
      {
        type: "quiz",
        content: "What are some of the features that Streambill can offer?",
        options: [
          "Manage invoices, stream money in real time",
          "Multichain swaps",
          "Mint NFTs",
          "Trade tokens",
        ],
        correctAnswer: "Manage invoices, stream money in real time",
      },
    ],
  },
  {
    id: "B1B2C3D4-5F6F-7G8H-9I10-J22K12L16M14",
    title: "Daily Wiser: Micro-Learning",
    description:
      "Discover how Daily Wiser can transform your learning journey in just 60 seconds!",
    category: "onboard",
    image:
      "https://gateway.pinata.cloud/ipfs/QmUGioFDUkJgvzHMXTJcZTgjMYDZjsbpXEqh6Y1qrLf6Zf/logo_dailywiser.png",
    metadata:
      "https://gateway.pinata.cloud/ipfs/QmYsEN4V63r9uuE6xsaEsfqhnXgMq8e9wFsPmfgnuoHs1c/0",
    endscreen:
      "Congratulations! You're now ready to embark on your Daily Wiser journey. Start claiming your daily wisdom, earn XP, and collect NFT Skill Badges as you grow. Every day is an opportunity to become wiser!",
    slides: [
      {
        type: "info",
        content:
          "Daily Wiser is an mobile-first learning platform that transforms personal growth into an engaging daily habit. Daily Wiser combines cutting-edge AI technology, gamification principles, and blockchain integration, we've created a unique ecosystem that makes learning accessible, fun, and verifiable.",
        media: "https://dailywiser.xyz/images/ai-personalization.gif",
      },
      {
        type: "quiz",
        content: "What's Daily Wiser's secret sauce for learning?",
        options: [
          "Boring lectures that cure insomnia",
          "Bite-sized, fun lessons with blockchain proof",
          "Textbooks heavy enough to build muscle",
          "One-size-fits-none courses",
        ],
        correctAnswer: "Bite-sized, fun lessons with blockchain proof",
      },
      {
        type: "info",
        content:
          "With Daily Wiser, you'll earn XP and level up as you learn. Claim your Daily Wisdom and watch your knowledge grow day by day.",
        media: "https://dailywiser.xyz/images/xp-and-levels.png",
      },
      {
        type: "quiz",
        content: "How does Daily Wiser boost your learning motivation?",
        options: [
          "Unleashes learning zombies",
          "Uses points, streaks, and challenges",
          "Installs a brain-zapping chip",
          "Hires 24/7 educational mariachis",
        ],
        correctAnswer: "Uses points, streaks, and challenges",
      },
      {
        type: "info",
        content:
          "Your achievements are more than just numbers. Daily Wiser mints NFT Skill Badges on the blockchain, giving you verifiable proof of your acquired knowledge.",
        media: "https://dailywiser.xyz/images/nft-skill-badges.jpg",
      },
      {
        type: "quiz",
        content: "How does Daily Wiser prove your learning achievements?",
        options: [
          "Tattoos your forehead with learned facts",
          "Mints blockchain-verified NFT Skill Badges",
          "Trains a parrot to recite your knowledge",
          "Erects statues of you in public squares",
        ],
        correctAnswer: "Mints blockchain-verified NFT Skill Badges",
      },
    ],
  },

  /**
   * Normal Quiz
   */
  {
    id: "S1O2L3A4-5N6A7-8Q9U10-I11Z-12A13N14A15T16O17L18Y",
    title: "Anatoly Yakovenko and Solana",
    description:
      "Explore the journey of Anatoly Yakovenko and the innovative features of the Solana blockchain.",
    category: "technology",
    image:
      "https://gateway.pinata.cloud/ipfs/QmVujmTpd5nS9tzg3fah4XGbPciEHFzuYu7J2yDXiARRew/AnatolyYakovenkocrypto.webp",
    metadata:
      "https://gateway.pinata.cloud/ipfs/QmcFLaBTaAr6ngKsb1cvn2wqA3WyThQQRR15QReVgd67A6/0",
    endscreen:
      "Congratulations on completing this quiz about Anatoly Yakovenko and Solana! You've learned about the innovative approach to blockchain scalability and the vision behind one of the fastest blockchains in the world. Keep exploring the exciting world of blockchain technology!",
    slides: [
      {
        type: "info",
        content:
          "Anatoly Yakovenko is the CEO and Co-founder of Solana, a high-performance blockchain platform. Before Solana, he worked on operating systems at Qualcomm, distributed systems at Mesosphere, and compression at Dropbox.",
      },
      {
        type: "quiz",
        content: "What was Anatoly Yakovenko's role before founding Solana?",
        options: [
          "CEO of a major tech company",
          "Working on operating systems at Qualcomm",
          "Developing social media platforms",
          "Teaching computer science at a university",
        ],
        correctAnswer: "Working on operating systems at Qualcomm",
      },
      {
        type: "info",
        content:
          "Yakovenko and his team created a new consensus algorithm called Proof of History (PoH) for Solana. With the implementation of PoH, the Solana blockchain can handle up to 50,000 transactions per second, making it one of the fastest blockchains globally.",
      },
      {
        type: "quiz",
        content:
          "What innovative consensus algorithm did Yakovenko and his team create for Solana?",
        options: [
          "Proof of Stake",
          "Proof of Work",
          "Proof of History",
          "Proof of Authority",
        ],
        correctAnswer: "Proof of History",
      },
      {
        type: "info",
        content:
          "Yakovenko's experience at Qualcomm with cellular networks inspired him to apply similar optimizations to blockchain technology. The idea for Solana was inspired by a concept known as time division multiple access, which is related to how cellular towers alternate transmissions based on specific time intervals.",
      },
      {
        type: "quiz",
        content:
          "What technology from Yakovenko's past experience inspired Solana's design?",
        options: [
          "Social media algorithms",
          "Cellular network optimizations",
          "Video game rendering",
          "E-commerce platforms",
        ],
        correctAnswer: "Cellular network optimizations",
      },
      {
        type: "info",
        content:
          "Yakovenko aspires for Solana to set a standard for all financial data worldwide and eradicate inefficiencies in the market. He envisions a future where state transitions in the blockchain travel at the same speed as news, eliminating arbitrage opportunities.",
      },
      {
        type: "quiz",
        content:
          "What is Yakovenko's vision for Solana in relation to global financial data?",
        options: [
          "To replace traditional stock exchanges",
          "To create a new cryptocurrency",
          "To set a standard for all financial data worldwide",
          "To eliminate all forms of digital currency",
        ],
        correctAnswer: "To set a standard for all financial data worldwide",
      },
      {
        type: "info",
        content:
          "On the topic of Solana vs Ethereum, Yakovenko denounces the 'ETH killer' narrative as 'lame.' He doesn't anticipate a future where Solana thrives while Ethereum dies. Instead, he points to technology upgrades that could enhance interoperability between the two platforms.",
      },
      {
        type: "quiz",
        content:
          "What is Yakovenko's stance on the relationship between Solana and Ethereum?",
        options: [
          "Solana will replace Ethereum",
          "Ethereum and Solana cannot coexist",
          "Interoperability between the two platforms is beneficial",
          "Ethereum is superior to Solana",
        ],
        correctAnswer:
          "Interoperability between the two platforms is beneficial",
      },
    ],
  },
  {
    id: "A1B2C3D4-5E6F-7G8H-9I10-J11K12L13M14",
    title: "Developing a Growth Mindset",
    description:
      "Explore the concept of a growth mindset and its impact on personal development and success.",
    category: "personal development",
    endscreen:
      "Congratulations on completing this quiz about developing a growth mindset! Remember, embracing challenges, persisting through obstacles, and viewing effort as a path to mastery are key aspects of a growth mindset. Keep cultivating this mindset to unlock your full potential!",
    slides: [
      {
        type: "info",
        content:
          "A growth mindset is the belief that abilities and intelligence can be developed through dedication, hard work, and learning. It contrasts with a fixed mindset, which assumes talents are innate and unchangeable.",
      },
      {
        type: "info",
        content:
          "People with a growth mindset tend to embrace challenges, persist in the face of setbacks, see effort as a path to mastery, learn from criticism, and find inspiration in others' success.",
      },
      {
        type: "quiz",
        content:
          "Which of the following is NOT a characteristic of a growth mindset?",
        options: [
          "Embracing challenges",
          "Believing talents are fixed at birth",
          "Learning from criticism",
          "Persisting in the face of setbacks",
        ],
        correctAnswer: "Believing talents are fixed at birth",
      },
      {
        type: "info",
        content:
          "Developing a growth mindset involves reframing challenges as opportunities, replacing negative self-talk with positive affirmations, and focusing on the process of learning rather than just the outcome.",
      },
      {
        type: "quiz",
        content:
          "What does 'embracing challenges' mean in the context of a growth mindset?",
        options: [
          "Avoiding difficult tasks",
          "Seeing challenges as opportunities to learn and grow",
          "Only taking on easy tasks to build confidence",
          "Comparing yourself to others constantly",
        ],
        correctAnswer: "Seeing challenges as opportunities to learn and grow",
      },
      {
        type: "info",
        content:
          "Research by psychologist Carol Dweck has shown that individuals with a growth mindset tend to achieve more than those with a fixed mindset, particularly in challenging situations.",
      },
      {
        type: "quiz",
        content:
          "According to growth mindset theory, how should effort be viewed?",
        options: [
          "As a sign of weakness",
          "As unnecessary if you're naturally talented",
          "As a path to mastery and improvement",
          "As something to be avoided",
        ],
        correctAnswer: "As a path to mastery and improvement",
      },
      {
        type: "info",
        content:
          "Cultivating a growth mindset is an ongoing process. It involves consistently challenging your own beliefs about your abilities and potential, and actively seeking out opportunities for growth and learning.",
      },
    ],
  },
  {
    id: "B7F9E2D1-3A5C-4E8B-9D6F-1C2A3B4C5D6E",
    title: "The Power of 1% Daily Improvement",
    description:
      "Explore the concept of continuous small improvements and their compounding effect over time.",
    category: "personal development",
    endscreen:
      "Great job completing this quiz on daily improvement! Remember, consistency is key. By focusing on getting just 1% better each day, you can achieve remarkable growth over time. Keep pushing forward!",
    slides: [
      {
        type: "info",
        content:
          "The concept of improving 1% every day is based on the power of compound growth. Over a year, this seemingly small daily improvement can lead to becoming 37 times better.",
      },
      {
        type: "info",
        content:
          "This approach emphasizes consistency and small, manageable changes rather than dramatic, unsustainable transformations. It's about progress, not perfection.",
      },
      {
        type: "info",
        content:
          "Areas for daily 1% improvement can include skills, habits, knowledge, health, relationships, or any aspect of personal or professional life.",
      },
      {
        type: "quiz",
        content:
          "If you improve by 1% every day for a year, approximately how much better will you be?",
        options: [
          "10 times better",
          "20 times better",
          "37 times better",
          "50 times better",
        ],
        correctAnswer: "37 times better",
      },
      {
        type: "info",
        content:
          "The 1% rule aligns with the Japanese concept of 'Kaizen', which means continuous improvement. It's about making small, incremental changes that add up over time.",
      },
      {
        type: "info",
        content:
          "Tracking progress is crucial when aiming for 1% daily improvement. This can be done through journaling, apps, or other measurement tools specific to your goals.",
      },
      {
        type: "quiz",
        content:
          "Which of the following best describes the 1% daily improvement philosophy?",
        options: [
          "Making dramatic changes quickly",
          "Focusing on perfection in every task",
          "Consistent small improvements over time",
          "Improving only when feeling motivated",
        ],
        correctAnswer: "Consistent small improvements over time",
      },
      {
        type: "quiz",
        content:
          "What Japanese concept aligns with the idea of 1% daily improvement?",
        options: ["Ikigai", "Kaizen", "Wabi-sabi", "Kintsugi"],
        correctAnswer: "Kaizen",
      },
    ],
  },
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
