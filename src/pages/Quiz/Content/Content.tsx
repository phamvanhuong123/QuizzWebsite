import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Question } from "@/types/quiz.types";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import SubmitQuizButton from "./SubmitQuizButton/SubmitQuizButton";
const answerLabels = ["A", "B", "C", "D"];

interface ContentProps{
    dataQuestion: Question[];
  currentIndex: number;
  selectedCurrentAnswer: number | null;
  handleSelectAnswer: (index: number) => void;
  handleClickPrevQuestion: () => void;
  handleClickNextQuestion: () => void;
  handleSubmit : () => void
}
function Content({
  dataQuestion,
  currentIndex,
  selectedCurrentAnswer,
  handleSelectAnswer,
  handleClickPrevQuestion,
  handleClickNextQuestion,
  handleSubmit
}: ContentProps) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl">
        <Card className="border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden bg-white dark:bg-slate-900">
          <CardContent className="p-6 md:p-10">
            <div className="mb-8">
              <Badge
                variant="secondary"
                className="bg-[#ec5b13]/10 text-[#ec5b13] hover:bg-[#ec5b13]/10 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest mb-4"
              >
                Core Concepts
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight text-slate-900 dark:text-slate-50">
                {dataQuestion[currentIndex]?.question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="grid gap-3 mb-4">
              {dataQuestion[currentIndex]?.answers.map((answers, index) => (
                <button
                  onClick={() => handleSelectAnswer(index)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left group
                      ${
                        index === selectedCurrentAnswer
                          ? "border-[#ec5b13] bg-[#ec5b13]/5 dark:bg-[#ec5b13]/10"
                          : "border-slate-200 dark:border-slate-800 hover:border-[#ec5b13]/50 hover:bg-[#ec5b13]/5"
                      }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm transition-colors
                        ${
                          index === selectedCurrentAnswer
                            ? "bg-[#ec5b13] text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-[#ec5b13]/20 group-hover:text-[#ec5b13]"
                        }`}
                    >
                      {answerLabels[index]}
                    </span>
                    <span
                      className={`font-medium ${index === selectedCurrentAnswer ? "text-slate-900 dark:text-white font-semibold" : "text-slate-700 dark:text-slate-300"}`}
                    >
                      {answers}
                    </span>
                  </div>
                  {index === selectedCurrentAnswer ? (
                    <CheckCircle2 className="text-[#ec5b13] h-6 w-6" />
                  ) : (
                    <div className="h-6 w-6 rounded-full border-2 border-slate-200 dark:border-slate-700 group-hover:border-[#ec5b13]/50" />
                  )}
                </button>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between p-6 md:px-10 border-t border-slate-100 dark:border-slate-800">
            <Button
              onClick={handleClickPrevQuestion}
              variant="ghost"
              className="cursor-pointer text-slate-500 hover:text-slate-900 flex items-center gap-2"
            >
              <ArrowLeft className="ml-2 h-5 w-5" />
              Prev Question
            </Button>
            {currentIndex !== dataQuestion.length - 1 ? (
              <Button
                onClick={handleClickNextQuestion}
                className="cursor-pointer bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white font-bold  rounded-xl shadow-lg shadow-[#ec5b13]/20"
              >
                Next Question
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
             <SubmitQuizButton onSubmit={handleSubmit} />
            )}
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
export default Content;
