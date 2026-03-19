
import { ArrowLeft, ArrowRight, Lightbulb, Timer, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { questionApi } from "@/apis/questionApi";

function Quiz() {
  const [dataQuestion,setDataQuestion] = useState([])
  const {topicId} = useParams()
  const options = [
    { id: "A", text: "To manage local component state exclusively", selected: false },
    { id: "B", text: "To perform side effects in function components", selected: true },
    { id: "C", text: "To memoize expensive calculations for performance", selected: false },
    { id: "D", text: "To create persistent refs for DOM elements", selected: false },
  ];

  useEffect(() => {
    const fetchApi = async () => {
      const result = await questionApi.getQuestionByTopicId(topicId || "")
      setDataQuestion(result)
    }
    fetchApi()
  },[setDataQuestion, topicId])
  console.log(dataQuestion)
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
              <span className="text-xs font-medium text-slate-500 text-muted-foreground">Progress</span>
              <span className="text-xs font-bold text-[#ec5b13]">Question 3 of 10</span>
            </div>
            <Progress value={20} className="h-2" />
          </div>

          <Button variant="outline" className="flex items-center gap-2 h-9">
            <Timer className="h-4 w-4" />
            <span className="font-mono">12:45</span>
          </Button>
        </div>
        {/* Mobile Progress */}
        <div className="md:hidden w-full h-1">
            <Progress value={30} className="h-1 rounded-none" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl">
          <Card className="border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden bg-white dark:bg-slate-900">
          

            <CardContent className="p-6 md:p-10">
              <div className="mb-8">
                <Badge variant="secondary" className="bg-[#ec5b13]/10 text-[#ec5b13] hover:bg-[#ec5b13]/10 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest mb-4">
                  Core Concepts
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight text-slate-900 dark:text-slate-50">
                  What is the primary purpose of the <span className="text-[#ec5b13]">useEffect</span> hook in React?
                </h2>
              </div>

              {/* Answer Options */}
              <div className="grid gap-3 mb-4">
                {options.map((option) => (
                  <button
                    key={option.id}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left group
                      ${option.selected 
                        ? "border-[#ec5b13] bg-[#ec5b13]/5 dark:bg-[#ec5b13]/10" 
                        : "border-slate-200 dark:border-slate-800 hover:border-[#ec5b13]/50 hover:bg-[#ec5b13]/5"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm transition-colors
                        ${option.selected 
                          ? "bg-[#ec5b13] text-white" 
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-[#ec5b13]/20 group-hover:text-[#ec5b13]"
                        }`}>
                        {option.id}
                      </span>
                      <span className={`font-medium ${option.selected ? "text-slate-900 dark:text-white font-semibold" : "text-slate-700 dark:text-slate-300"}`}>
                        {option.text}
                      </span>
                    </div>
                    {option.selected ? (
                        <CheckCircle2 className="text-[#ec5b13] h-6 w-6" />
                    ) : (
                        <div className="h-6 w-6 rounded-full border-2 border-slate-200 dark:border-slate-700 group-hover:border-[#ec5b13]/50" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between p-6 md:px-10 border-t border-slate-100 dark:border-slate-800">
              <Button variant="ghost" className="text-slate-500 hover:text-slate-900 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                <span>Need a hint?</span>
              </Button>
              <Button className="bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-[#ec5b13]/20">
                Next Question
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>

          {/* Shortcuts */}
          <div className="mt-8 flex justify-center gap-6 text-slate-400 dark:text-slate-600 text-[10px] font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800">1-4</kbd>
              <span>Select Answer</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800">Enter</kbd>
              <span>Confirm</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-slate-400 dark:text-slate-600 text-xs">
        <p>© 2024 Learning Platform • React Mastery Course</p>
      </footer>
    </div>
  );
}

export default Quiz;