export const FEEDBACK_CONTRACT_ABI = [
  {
    type: "function",
    name: "addFeedback",
    inputs: [{ name: "_feedback", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addWisdom",
    inputs: [{ name: "_quote", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "canAddWisdom",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "feedbacks",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "sender", type: "address", internalType: "address" },
      { name: "timestamp", type: "uint256", internalType: "uint256" },
      { name: "message", type: "string", internalType: "string" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "timeUntilNextWisdom",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "wisdomByUser",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [
      { name: "sender", type: "address", internalType: "address" },
      { name: "timestamp", type: "uint256", internalType: "uint256" },
      { name: "quote", type: "string", internalType: "string" },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "FeedbackAdded",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "message",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "WisdomAdded",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "quote",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
] as const;
