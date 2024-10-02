import { Suspense } from "react";

import ChatClientPage from "./client";

export default function Chat() {
  return (
    <>
      <Suspense fallback={<>loading</>}>
        <ChatClientPage />
      </Suspense>
    </>
  );
}
