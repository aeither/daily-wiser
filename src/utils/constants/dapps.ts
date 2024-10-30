export const tagColors: { [key: string]: string } = {
  Payments: "bg-blue-100 text-blue-800",
  Invoicing: "bg-green-100 text-green-800",
  "Gig Economy": "bg-yellow-100 text-yellow-800",
  Education: "bg-purple-100 text-purple-800",
  Blockchain: "bg-indigo-100 text-indigo-800",
  NFT: "bg-pink-100 text-pink-800",
  Content: "bg-red-100 text-red-800",
  // Add more tag colors as needed
};

interface Dapp {
  id: string;
  name: string;
  title: string;
  description: string;
  shortDescription: string;
  logo: string;
  website: string;
  twitter?: string; // Optional
  github?: string; // Optional
  tags: string[];
}

export const dapps: Dapp[] = [
  {
    id: "stream-bill",
    name: "Stream Bill",
    title: "Real-time Payments for Gig Economy",
    description:
      "The real time payments and invoicing app - for freelancers, private tutors, gig workers & more",
    shortDescription: "Streamline your gig economy payments",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["Payments", "Invoicing", "Gig Economy"],
    website: "https://streambill.xyz/",
  },
  {
    id: "proof-of-learn",
    name: "Proof of Learn",
    title: "Blockchain-Verified Learning Platform",
    description:
      "Proof of Learn is an innovative online platform that ensures interactive, transparent, and verifiable learning across 100+ blockchains, rewarding users with NFT POAPs for genuine engagement and accomplishment.",
    shortDescription: "Learn, verify, and earn across blockchains",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["Education", "Blockchain", "NFT"],
    website: "https://proof-of-learn.vercel.app/",
  },
  {
    id: "prism",
    name: "Prism",
    title: "Decentralized Content Ecosystem",
    description:
      "PRISM is a revolutionary decentralized content ecosystem that leverages blockchain technology and NFTs to create a fair, transparent, and rewarding environment for content creators and consumers.",
    shortDescription: "Empowering creators with blockchain",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["Content", "Blockchain", "NFT"],
    website: "https://prism-edu.vercel.app/",
  },
  {
    id: "opentaskai",
    name: "OpenTaskAI",
    title: "AI Talent Platform",
    description:
      "OpenTaskAI is an AI talent platform that connects freelancers in AI-related skills and global business needs.",
    shortDescription: "AI-powered freelance marketplace",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["AI", "Freelance", "Talent"],
    website: "https://testnet.opentaskai.com/",
  },
  {
    id: "streamnft",
    name: "StreamNFT",
    title: "Educational Content NFT Platform",
    description:
      "StreamNFT enables creators to monetize educational content as NFTs, offering tokengating, subscription, loan collateralization & onchain utility within OpenCampus. Learners access ebooks, courses & certification while thirdparty creators provide additional rewards, enriching the platform's ecosystem",
    shortDescription: "Monetize educational content with NFTs",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["Education", "NFT", "Content"],
    website: "https://eduverse.streamnft.tech/utility/explore",
  },
  {
    id: "campus-arc",
    name: "Campus Arc",
    title: "EDU Chain Learning Platform",
    description: "Campus Arc is an e-learning dApp, built on EDU Chain.",
    shortDescription: "Decentralized learning platform",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["Education", "E-learning", "EDU Chain"],
    website: "https://www.campusarc.io/",
  },
  {
    id: "poapedu",
    name: "Poapedu",
    title: "Universal Skill Profile Platform",
    description:
      "Poapedu aims to provide each builder their universal skill profile on EDU Chain by consolidating everything they have ever learned, made, and achieved.",
    shortDescription: "Blockchain skill verification",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["Education", "Skills", "Profile"],
    website: "https://poapedu-app.vercel.app/",
  },
  {
    id: "grasp",
    name: "Grasp",
    title: "Educational Content Marketplace",
    description:
      "Grasp is the premier educational content platform where educators and creators can share their work and earn on EDU Chain. Powered by Open Campus, the Grasp web3 platform integrates EduFi, enabling users to learn, earn, and be rewarded for academic excellence.",
    shortDescription: "Learn and earn content platform",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["Education", "Content", "EduFi"],
    website: "https://grasp.academy/",
  },
  {
    id: "pumper-lol",
    name: "Pumper.lol",
    title: "Meme Coin Creation Platform",
    description:
      "Pumper.lol is an innovative platform designed to empower users by allowing them to create and trade meme coins on the EduChain network. This project ensures fair and secure token launches, providing a seamless and entertaining trading experience.",
    shortDescription: "Create and trade meme coins",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["DeFi", "Meme Coins", "Trading"],
    website: "https://pumper.lol",
  },
  {
    id: "lore-network",
    name: "Lore Network",
    title: "AI-Powered Learning Network",
    description:
      "LORE Network is the first Proof of Learning Network powered by advanced AI algorithms. It merges AI-driven education with blockchain, enabling users to learn, earn tokens, and receive blockchain-verified credentials, creating a decentralized ecosystem that transforms education in the Web3 space.",
    shortDescription: "AI-driven educational ecosystem",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["Education", "AI", "Blockchain"],
    website: "https://app.lorenetwork.xyz",
  },
  {
    id: "thrustpad",
    name: "ThrustPad",
    title: "ILO Platform on EDU Chain",
    description:
      "ThrustPad is an innovative Initial Liquidity Offering (ILO) platform seamlessly built on the Educhain blockchain. Designed to empower projects and investors alike with comprehensive suite of tools and services on their fundraising journey.",
    shortDescription: "Blockchain fundraising platform",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["DeFi", "Fundraising", "ILO"],
    website: "https://thrustpad.finance/",
  },
  {
    id: "echo",
    name: "Echo",
    title: "Comprehensive EDU Chain Platform",
    description:
      "Echo aims to create a comprehensive platform on EduChain, seamlessly integrating academic and non-academic functionalities. Our goal is to empower users with the tools to manage assets, launch projects, and bridge the gap between education and blockchain technology.",
    shortDescription: "All-in-one EDU Chain platform",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["Education", "Asset Management", "Projects"],
    website: "https://openecho.xyz",
  },
  {
    id: "vault",
    name: "Vault",
    title: "Educational Finance Platform",
    description:
      "Vault is a revolutionary blockchain-based financial platform designed specifically for the education sector. Built on the EDU Chain network, Vault aims to transform how financial transactions are conducted in the global education ecosystem.",
    shortDescription: "Education sector financial solutions",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["DeFi", "Education", "Finance"],
    website: "https://vault-sooty.vercel.app/",
  },
  {
    id: "blitz-protocol",
    name: "Blitz Protocol",
    title: "EDU Chain Indexing Protocol",
    description:
      "Blitz Protocol is an indexing and querying protocol designed to track and store every event triggered by smart contracts on EDU Chain blockchain. By leveraging Blitz Nodes, the protocol provides real-time access to a wealth of on-chain data, enabling developers to efficiently query and analyze.",
    shortDescription: "Blockchain data indexing solution",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["Infrastructure", "Data", "Development"],
    website: "https://blitzprotocol.org/",
  },
  {
    id: "edbank-dao",
    name: "EdbankDAO",
    title: "EDU Stablecoin Platform",
    description:
      "Use EDU and LST as collateral to mint the stablecoin ESD, maximizing asset utility and creating income opportunities",
    shortDescription: "Stablecoin minting platform",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["DeFi", "Stablecoin", "DAO"],
    website: "https://edbank.xyz",
  },
  {
    id: "myordinals-loan",
    name: "MyOrdinals ᴸᵒᵃⁿ",
    title: "Ordinals Lending Platform",
    description:
      "The Project is a decentralized platform that facilitates the lending and borrowing of crypto assets using Ordinals as collateral in a permissionless manner. Powered by EduChain",
    shortDescription: "Ordinals-backed lending",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["DeFi", "Lending", "Ordinals"],
    website: "https://opencampus-ordinalfinance.web.app/",
  },
  {
    id: "youbet-dao",
    name: "YouBetDAO",
    title: "Open Source Reward Platform",
    description:
      "A cutting-edge platform for automated and fair reward distribution to open source developers based on their contributions.",
    shortDescription: "Developer reward automation",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["DAO", "Development", "Rewards"],
    website: "https://youbet-task.netlify.app/",
  },
  {
    id: "daily-wiser",
    name: "Daily Wiser",
    title: "Mobile Learning Platform",
    description:
      "Daily Wiser is an innovative mobile-first learning platform that transforms personal growth into an engaging daily habit.",
    shortDescription: "Daily learning habits",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["Education", "Mobile", "Personal Growth"],
    website: "http://dailywiser.xyz/",
  },
  {
    id: "eduvr",
    name: "EduVR",
    title: "Virtual Reality Classrooms",
    description:
      "EduVR allows everyone to create unlimited 3D classroom by minting a passport on-chain. We leverage WebRTC technology to provide free, anonymized, and decentralized meetings. Which allow students to fully immerse into the classroom, this provides an interactive experience.",
    shortDescription: "VR education platform",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["Education", "VR", "Virtual Classroom"],
    website: "https://thunderous-sfogliatella-a67707.netlify.app/",
  },
  {
    id: "d3lab",
    name: "D3Lab",
    title: "EDU Chain DEX Platform",
    description:
      "A decentralized exchange (DEX) platform designed for seamless token swaps within the EduChain ecosystem.",
    shortDescription: "EDU Chain token exchange",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["DeFi", "DEX", "Trading"],
    website: "https://eduswap.github.io/webapp/",
  },
  {
    id: "eduverse",
    name: "Eduverse",
    title: "Educational Blockchain Game",
    description:
      "A Blockchain game based on book, pen and writing. It is a virtual study table game where you can mint empty books, write with a pen tool and submit the filled books to gain points. The game combines elements of simulation, strategy, and collectability, with a unique blockchain twist.",
    shortDescription: "Educational gaming platform",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["Gaming", "Education", "NFT"],
    website: "https://github.com/govardhan666/EDUVERSE",
  },
  {
    id: "merge-z",
    name: "Merge Z",
    title: "Learn-to-Earn Content Platform",
    description:
      "A digital education platform to learn and earn through reading and short form video content",
    shortDescription: "Content-based learning rewards",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["Education", "Content", "Rewards"],
    website: "https://merge-z-web-app.pages.dev/",
  },
  {
    id: "0sum",
    name: "0sum",
    title: "Production V3 DEX",
    description: "Production Ready V3 DEX",
    shortDescription: "Advanced DEX platform",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["DeFi", "DEX", "Trading"],
    website: "https://opencampus-testnet.0sum.io/",
  },
  {
    id: "jiffyscan",
    name: "JiffyScan",
    title: "Unified API Platform",
    description:
      "Focus on building user interfaces while we handle all the backend work through our unified API stack",
    shortDescription: "Backend API solution",
    logo: "/placeholder.svg?height=80&width=80",
    tags: ["Infrastructure", "API", "Development"],
    website: "https://jiffylabs.xyz/",
  },
];
