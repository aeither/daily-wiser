"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "What is DailyWiser?",
    answer:
      "DailyWiser is a web app that helps you build good habits and learn new skills. It's fun and easy to use.",
  },
  {
    question: "How does DailyWiser help me learn?",
    answer:
      "DailyWiser gives you quizzes and chatbots based on what you want to learn. You can earn points and see your progress. It's fun and keeps you motivated.",
  },
  {
    question: "Can I use DailyWiser on my phone?",
    answer:
      "Yes! You don't need to download an app. Just save our website on your phone and use it every day.",
  },
  {
    question: "What can I do with DailyWiser?",
    answer:
      "Soon you can: Set goals, do daily tasks, learn short lessons, take quizzes, compete with friends, join group activities, get rewards, and learn things to improve your life.",
  },
  {
    question: "How much does DailyWiser cost?",
    answer:
      "You need credits to use it. You can buy credits with EDU coins.",
  },
  {
    question: "How do I get credits?",
    answer:
      "It's easy! Click the + button at the top and change your EDU coins into credits.",
  },
  {
    question: "Can I get rewards for inviting friends?",
    answer:
      "Not yet, but we're working on it! Soon you can get rewards for inviting friends.",
  },
  {
    question: "Is DailyWiser free?",
    answer:
      "DailyWiser uses credits, and you start with some free ones. We'll add more ways to get free credits soon.",
  },
  {
    question: "Can I play with my friends?",
    answer:
      "Friend competitions are coming soon! Get ready to show your skills and compete with friends!",
  },
  {
    question: "What can I learn on DailyWiser?",
    answer:
      "You can learn many things! Like how to improve yourself, work better, stay healthy, manage money, and more. We're always adding new things to learn based on what users want. \nFeel free to use the Provide Feedback Button to share what you need.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-6 bg-background">
      <div className="">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto space-y-2">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <Button
                variant="ghost"
                className="w-full justify-between text-left font-semibold p-4 hover:no-underline"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.div>
              </Button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <CardContent className="pt-2">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </motion.div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
