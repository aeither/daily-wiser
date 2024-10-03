import FrontPage from "@/components/frontpage/index";
import { Suspense } from "react";
import Loading from "./loading";

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <FrontPage />
      </Suspense>
    </>
  );
}

export default App;
