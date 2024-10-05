import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitFeedback } from "@/hooks/use-feedback";
import { Star } from "lucide-react";
import posthog from "posthog-js";
import { useState } from "react";

export function FeedbackModalButton() {
  const [feedbackDescription, setFeedbackDescription] = useState("");
  const { submitFeedback } = useSubmitFeedback();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    posthog.capture("Feedback Button", { description: feedbackDescription });
    await submitFeedback(feedbackDescription);
    console.log("Submitting feedback:", feedbackDescription);
    setFeedbackOpen(false);
    setFeedbackDescription("");
  };

  return (
    <>
      <Button
        className="bg-blue-500 hover:bg-blue-600 text-white"
        onClick={() => setFeedbackOpen(true)}
      >
        <Star className="mr-2 h-4 w-4" />
        Provide Feedback
      </Button>

      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share Your Thoughts</DialogTitle>
            <DialogDescription>
              Help us shape the ultimate platform for building smart habits and
              continuous learning.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFeedbackSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="feedbackDescription">Your Feedback</Label>
                <Textarea
                  id="feedbackDescription"
                  className="min-h-[200px]"
                  placeholder={`Please share your thoughts on: \n\n
• Features you'd love to see \n
• Challenges you're facing \n
• How our platform fits into your daily routine \n
• Improvements to user experience \n
• Any 'aha!' moments you've had while using the app`}
                  value={feedbackDescription}
                  onChange={(e) => setFeedbackDescription(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit Feedback</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
