// api.ts
import { EXPLORER_BASE_URL } from "@/utils/constants";
import type { NFTResponseType } from "../../utils/types"; // Adjust the import path as needed

export const fetchNFTs = async (address: string): Promise<NFTResponseType> => {
  const response = await fetch(
    `${EXPLORER_BASE_URL}/addresses/${address}/nft?type=ERC-721,ERC-404,ERC-1155`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch NFTs");
  }

  return response.json();
};
