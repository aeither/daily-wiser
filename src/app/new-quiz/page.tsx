"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image as ImageIcon, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type SlideType = "quiz" | "info";

interface Slide {
  type: SlideType;
  content: string;
  answers?: string[];
  correctAnswer?: string;
  image?: string;
}

export default function CreateQuiz() {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizImage, setQuizImage] = useState<string | null>(null);
  const [slides, setSlides] = useState<Slide[]>([]);
  const router = useRouter();
  const quizFileInputRef = useRef<HTMLInputElement>(null);
  const slideFileInputRef = useRef<HTMLInputElement>(null);

  const handleAddSlide = (type: SlideType) => {
    const newSlide: Slide =
      type === "quiz"
        ? { type, content: "", answers: ["", "", "", ""], correctAnswer: "" }
        : { type, content: "" };
    setSlides([...slides, newSlide]);
  };

  const handleSlideContentChange = (index: number, value: string) => {
    const newSlides = [...slides];
    newSlides[index].content = value;
    setSlides(newSlides);
  };

  const handleAnswerChange = (
    slideIndex: number,
    answerIndex: number,
    value: string
  ) => {
    const newSlides = [...slides];
    if (newSlides[slideIndex].answers) {
      newSlides[slideIndex].answers![answerIndex] = value;
      setSlides(newSlides);
    }
  };

  const handleCorrectAnswerChange = (slideIndex: number, value: string) => {
    const newSlides = [...slides];
    newSlides[slideIndex].correctAnswer = value;
    setSlides(newSlides);
  };

  const handleRemoveSlide = (index: number) => {
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
  };

  const handleQuizImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQuizImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSlideImageUpload = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newSlides = [...slides];
        newSlides[index].image = reader.result as string;
        setSlides(newSlides);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the quiz data to your backend
    console.log({ quizTitle, quizDescription, quizImage, slides });
    // For now, we'll just log the data instead of redirecting
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="quiz-title">Quiz Title</Label>
                <Input
                  id="quiz-title"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="quiz-description">Quiz Description</Label>
                <Textarea
                  id="quiz-description"
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="quiz-image">Quiz Image (optional)</Label>
                <div className="mt-2 flex items-center space-x-4">
                  <Input
                    id="quiz-image"
                    type="file"
                    accept="image/*"
                    onChange={handleQuizImageUpload}
                    className="hidden"
                    ref={quizFileInputRef}
                  />
                  <Button
                    type="button"
                    onClick={() => quizFileInputRef.current?.click()}
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <ImageIcon className="mr-2 h-4 w-4" /> Upload Quiz Image
                  </Button>
                  {quizImage && (
                    <div className="relative w-20 h-20 overflow-hidden rounded-md">
                      <Image
                        src={quizImage}
                        alt="Quiz image"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {slides.map((slide, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      {slide.type === "quiz" ? "Quiz Slide" : "Info Slide"}{" "}
                      {index + 1}
                    </h3>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveSlide(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`slide-content-${index}`}>
                        {slide.type === "quiz" ? "Question" : "Content"}
                      </Label>
                      <Textarea
                        id={`slide-content-${index}`}
                        value={slide.content}
                        onChange={(e) =>
                          handleSlideContentChange(index, e.target.value)
                        }
                        required
                      />
                    </div>
                    {slide.type === "quiz" && slide.answers && (
                      <div className="space-y-2">
                        {slide.answers.map((answer, answerIndex) => (
                          <div
                            key={answerIndex}
                            className="flex items-center space-x-2"
                          >
                            <Input
                              value={answer}
                              onChange={(e) =>
                                handleAnswerChange(
                                  index,
                                  answerIndex,
                                  e.target.value
                                )
                              }
                              placeholder={`Answer ${answerIndex + 1}`}
                              required
                            />
                            <input
                              type="radio"
                              name={`correct-answer-${index}`}
                              checked={slide.correctAnswer === answer}
                              onChange={() =>
                                handleCorrectAnswerChange(index, answer)
                              }
                              required
                            />
                            <Label>Correct</Label>
                          </div>
                        ))}
                      </div>
                    )}
                    <div>
                      <Label htmlFor={`slide-image-${index}`}>
                        Slide Image (optional)
                      </Label>
                      <div className="mt-2 flex items-center space-x-4">
                        <Input
                          id={`slide-image-${index}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleSlideImageUpload(index, e)}
                          className="hidden"
                          ref={slideFileInputRef}
                        />
                        <Button
                          type="button"
                          onClick={() => slideFileInputRef.current?.click()}
                          variant="outline"
                          className="w-full sm:w-auto"
                        >
                          <ImageIcon className="mr-2 h-4 w-4" /> Upload Slide
                          Image
                        </Button>
                        {slide.image && (
                          <div className="relative w-20 h-20 overflow-hidden rounded-md">
                            <Image
                              src={slide.image}
                              alt="Slide image"
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex space-x-4">
              <Button type="button" onClick={() => handleAddSlide("quiz")}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Quiz Slide
              </Button>
              <Button type="button" onClick={() => handleAddSlide("info")}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Info Slide
              </Button>
            </div>

            <Button type="submit" className="w-full">
              Create Quiz
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}