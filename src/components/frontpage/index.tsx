import { Button } from "@/components/ui/button";
import { Brain, Users } from "lucide-react";
import Link from "next/link";
import Section1 from "./section1";

export default function FrontPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-400 text-white flex flex-col">
      <main className="flex-grow p-6 space-y-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Users className="mr-2" /> Top AI Friends
        </h2>
        <Section1 />

        <section className="text-center py-8">
          <div className="flex justify-center space-x-4 mb-4">
            <Brain className="text-yellow-300 w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Create Your Own AI Friend</h2>
          <p className="text-indigo-100 mb-4">
            Design a custom AI friend tailored to your interests and
            personality. Personalize everything from conversation topics to
            shared hobbies!
          </p>
          <Link href={"/new-friend"}>
            <Button className="bg-white text-indigo-600 hover:bg-indigo-100 text-lg px-6 py-3 rounded-full">
              Create Your Friend
            </Button>
          </Link>
        </section>
      </main>

      <footer className="p-4 text-center text-sm">
        <div className="flex justify-center mb-2 space-x-4">
          <a href="#" className="hover:underline">
            About Us
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">
            FAQ
          </a>
          <a href="#" className="hover:underline">
            Blog
          </a>
        </div>
      </footer>
    </div>
  );
}
