// useIPFS.ts
import { ThirdwebStorage } from "@thirdweb-dev/storage";

const GATEWAY_URL = "https://gateway.pinata.cloud/ipfs/";

const ipfsGateways = [
  "https://gateway.pinata.cloud/ipfs/${cid}/${path}",
  "https://w3s.link/ipfs/${cid}/${path}",
  "https://nftstorage.link/ipfs/${cid}/${path}",
];

export const useIPFS = () => {
  const storage = new ThirdwebStorage({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
  });

  const uploadMetadata = async (
    name: string,
    description: string,
    imageFile: File
  ) => {
    try {
      // Upload image to IPFS
      const imageUri = await storage.upload(imageFile);

      // Create metadata
      const metadata = {
        name,
        description,
        image: imageUri,
      };

      // Upload metadata to IPFS
      const uri = await storage.upload(metadata);
      return uri;
    } catch (error) {
      console.error("Error uploading metadata:", error);
      throw error;
    }
  };

  const getMetadata = async (uri: string) => {
    try {
      // Fetch the metadata JSON
      const metadataResponse = await fetch(
        `${GATEWAY_URL}${uri.replace("ipfs://", "")}`
      );
      const metadataJson = await metadataResponse.json();

      // Extract image CID and path
      const [imageCid, imagePath] = metadataJson.image
        .replace("ipfs://", "")
        .split("/");
      const imageUrl = `${GATEWAY_URL}${imageCid}/${encodeURIComponent(imagePath)}`;

      return {
        name: metadataJson.name,
        description: metadataJson.description,
        image: imageUrl,
      };
    } catch (error) {
      console.error("Error fetching metadata:", error);
      throw error;
    }
  };

  return { uploadMetadata, getMetadata };
};
