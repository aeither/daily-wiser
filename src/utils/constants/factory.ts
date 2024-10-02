export const FACTORY_CONTRACT_ADDRESS =
  "0xc59C04dA06CbE695a54d48cA929d3CBB9B8c947D";

export const FACTORY_CONTRACT_ABI = [
  {
    type: "function",
    name: "createNFTDeployer",
    inputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "symbol", type: "string", internalType: "string" },
      { name: "initialOwner", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "NFTDeployerCreated",
    inputs: [
      {
        name: "deployerAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "name",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "symbol",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
];
