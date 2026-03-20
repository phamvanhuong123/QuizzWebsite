import { ArrowLeft, ArrowRight, Timer, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { questionApi } from "@/apis/questionApi";

interface Question {
  id: string;
  topicId: string;
  question: string;
  answers: string[];
  correctAnswer: number;
}

interface UserAnser {
  idQuestion: string;
  selectAnswer: number;
}

const answerLabels = ["A", "B", "C", "D"];

function Quiz() {
  const { topicId } = useParams();
  const [dataQuestion, setDataQuestion] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnser[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectedCurrentAnswer = userAnswers.find(answer => answer.idQuestion === dataQuestion[currentIndex].id)?.selectAnswer ?? null

  const handleSelectAnswer = (index: number) => {
    const selectUserAnswer: UserAnser = {
      idQuestion: dataQuestion[currentIndex].id,
      selectAnswer: index,
    };
    setUserAnswers((prevUserAnswer) => {
      const fillterUserAnswer = prevUserAnswer.filter(
        (answer) => answer.idQuestion !== dataQuestion[currentIndex].id,
      );
      return [...fillterUserAnswer, selectUserAnswer];
    });
  };

  const handleClickNextQuestion = () => {
    if (currentIndex === dataQuestion.length - 1) return;
    const nexIndex = Math.min(currentIndex + 1, dataQuestion.length - 1);
    setCurrentIndex(nexIndex);
  };

  const handleClickPrevQuestion = () => {
    if (currentIndex === 0) return;
    const prevIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const result = await questionApi.getByTopicId(topicId || "");
      setDataQuestion(result.data);
    };
    fetchApi();
  }, [setDataQuestion, topicId]);

  return (
    <div className="min-h-screen bg-[#f8f6f6] dark:bg-[#221610] font-sans text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-lg">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold leading-none">React Hooks</h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-bold">
                Advanced Patterns
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-md hidden md:block px-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500 text-muted-foreground">
                Progress
              </span>
              <span className="text-xs font-bold text-[#ec5b13]">
                Question {currentIndex + 1} of {dataQuestion.length}
              </span>
            </div>
            <Progress
              value={((currentIndex + 1) / dataQuestion.length) * 100}
              className="h-2 [&>div>div]:bg-[#ec5b13] [&>div>div]:transition-all [&>div>div]:duration-1000"
            />
          </div>

          <Button variant="outline" className="flex items-center gap-2 h-9">
            <Timer className="h-4 w-4" />
            <span className="font-mono">12:45</span>
          </Button>
        </div>
        {/* Mobile Progress */}
        <div className="md:hidden w-full h-1">
          <Progress
            value={((currentIndex + 1) / dataQuestion.length) * 100}
            className="h-1 rounded-none [&>div>div]:bg-[#ec5b13] [&>div>div]:transition-all [&>div>div]:duration-1000"
          />
        </div>
      </header>

      {/* Main Content */}
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
                <Button
                  className="cursor-pointer bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white font-bold  rounded-xl shadow-lg shadow-[#ec5b13]/20"
                >
                  Submit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="py-8 text-center text-slate-400 dark:text-slate-600 text-xs">
        <p>© 2024 Learning Platform • React Mastery Course</p>
      </footer>
    </div>
  );
}

export default Quiz;
