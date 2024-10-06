import { getChangelog } from "@/lib/getChangelog";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const changelog = getChangelog();

  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <div className="prose prose-lg">
        <ReactMarkdown>{changelog}</ReactMarkdown>
      </div>
    </main>
  );
}
