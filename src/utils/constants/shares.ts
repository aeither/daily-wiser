export const SHARES_CONTRACT_ADDRESS =
  "0x3f0987bD62827afEeCBF038D99A3F20dfd7FA146";

export const SHARES_CONTRACT_ABI = [
  {
    type: "function",
    name: "buyShares",
    inputs: [
      {
        name: "sharesSubject",
        type: "address",
        internalType: "address",
      },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getBuyPrice",
    inputs: [
      {
        name: "sharesSubject",
        type: "address",
        internalType: "address",
      },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getBuyPriceAfterFee",
    inputs: [
      {
        name: "sharesSubject",
        type: "address",
        internalType: "address",
      },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPrice",
    inputs: [
      { name: "supply", type: "uint256", internalType: "uint256" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "getSellPrice",
    inputs: [
      {
        name: "sharesSubject",
        type: "address",
        internalType: "address",
      },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getSellPriceAfterFee",
    inputs: [
      {
        name: "sharesSubject",
        type: "address",
        internalType: "address",
      },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "protocolFeeDestination",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "protocolFeePercent",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "sellShares",
    inputs: [
      {
        name: "sharesSubject",
        type: "address",
        internalType: "address",
      },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "setFeeDestination",
    inputs: [
      {
        name: "_feeDestination",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setProtocolFeePercent",
    inputs: [{ name: "_feePercent", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setSubjectFeePercent",
    inputs: [{ name: "_feePercent", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "sharesBalance",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "sharesSupply",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "subjectFeePercent",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Trade",
    inputs: [
      {
        name: "trader",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "subject",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "isBuy",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
      {
        name: "shareAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "ethAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "protocolEthAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "subjectEthAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "supply",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
];
