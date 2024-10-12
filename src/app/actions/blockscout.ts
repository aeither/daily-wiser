// api.ts
import type { NFTResponseType } from "../../utils/types"; // Adjust the import path as needed

export async function fetchNFTs(
  address: string,
  explorerBaseUrl: string
): Promise<NFTResponseType> {
  const url = `${explorerBaseUrl}/addresses/${address}/nft?type=ERC-721%2CERC-404%2CERC-1155`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as NFTResponseType;
}
