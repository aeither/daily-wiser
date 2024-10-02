import { apiServer } from "@/trpc/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (id) {
    const nftMetadata = await apiServer.user.getNFTMetadata({ id: String(id) });

    if (Array.isArray(nftMetadata)) {
      return new Response(JSON.stringify(nftMetadata[0]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(nftMetadata), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response("No ID provided", { status: 400 });
}

// export async function POST(request: Request) {
//   // Handle POST request
//   return new Response("Created", { status: 201 });
// }
