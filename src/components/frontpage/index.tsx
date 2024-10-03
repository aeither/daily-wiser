import { Button } from "@/components/ui/button";
import { Brain, Users } from "lucide-react";
import Link from "next/link";
import Footer from "../footer";
import Section1 from "./tutor-carousel";

export default function FrontPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-4 sm:p-6 space-y-8">
        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center">
            <Users className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Top AI Assistants
          </h2>
          <Section1 />
        </section>
        <section className="text-center py-8">
          <div className="flex justify-center space-x-4 mb-4">
            <Brain className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Create Your Own AI Assistant</h2>
          <p className="mb-4">
            Design a custom AI assistant tailored to your learning style and goals.
            Personalize everything from teaching methods to subject expertise!
          </p>
          <Link href={"/new-bot"}>
            <Button className=" text-lg px-6 py-3 rounded-full">
              Create Your Tutor
            </Button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}