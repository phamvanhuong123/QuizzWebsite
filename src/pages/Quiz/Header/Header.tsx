import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Question } from "@/types/quiz.types";
import { ArrowLeft } from "lucide-react";
import CounDownTimer from "./CountDownTimer/CounDownTimer";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { topicApi } from "@/apis/topicApi";
import { timeUtils } from "@/utils/timeUtils";

interface HeaderProps {
  currentIndex: number;
  dataQuestion: Question[];
  topicId: string | null;
  handleSubmit: () => void;
}

function Header({
  currentIndex,
  dataQuestion,
  topicId,
  handleSubmit,
}: HeaderProps) {
  const navigate = useNavigate();
  const [initialTime, setInitialTime] = useState<number | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await topicApi.getById(topicId!);
      setInitialTime(
        timeUtils.convertTimeToNumber(res.durationHours, res.durationMinutes),
      );
    };
    fetchData();
  }, [topicId]);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg"
            onClick={() => navigate("/home")}
          >
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

        {initialTime && <CounDownTimer
          initialTime={initialTime}
          topicId={topicId || null}
          handleSubmit={handleSubmit}
        />}
      </div>
      {/* Mobile Progress */}
      <div className="md:hidden w-full h-1">
        <Progress
          value={((currentIndex + 1) / dataQuestion.length) * 100}
          className="h-1 rounded-none [&>div>div]:bg-[#ec5b13] [&>div>div]:transition-all [&>div>div]:duration-1000"
        />
      </div>
    </header>
  );
}

export default Header;
