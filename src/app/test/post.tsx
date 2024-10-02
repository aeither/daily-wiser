"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { apiReact } from "@/trpc/react";
import { useAccount } from "wagmi";

export function LatestPost() {
  const { data } = apiReact.user.getAllUsers.useQuery();
  const account = useAccount();

  const utils = apiReact.useUtils();
  const [name, setName] = useState("");
  const addXp = apiReact.user.addXp.useMutation({});
  //   const createPost = api.post.create.useMutation({
  //     onSuccess: async () => {
  //       await utils.post.invalidate()
  //       setName("")
  //     },
  //   })

  return (
    <div className="w-full max-w-xs">
      <Button
        onClick={() => {
          addXp.mutate({
            xpToAdd: 20,
            address: account.address!,
          });
        }}
      >
        Add XP
      </Button>
      {data ? (
        <p className="truncate">Your most recent post: {data[0].id}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          //   createPost.mutate(formData.get('name'))
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        {/* <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button> */}
      </form>
    </div>
  );
}
