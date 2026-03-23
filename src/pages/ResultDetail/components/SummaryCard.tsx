import React from "react";
import { useNavigate } from "react-router";
import type { QuizResult } from "../types/result.types";

interface SummaryCardProps {
  result: QuizResult;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ result }) => {
  const navigate = useNavigate();

  const handleRetake = () => {
    navigate(`/quiz/${result.topicId}`);
  };

  const handleBackToHome = () => {
    navigate("/home");
  };

  const rotation = result.score * 1.8 - 45;

  const getScoreColor = () => {
    if (result.score >= 80) {
      return {
        border: "border-green-500",
        bg: "bg-green-50 dark:bg-green-900/20",
        text: "text-green-600 dark:text-green-400",
        circle: "border-green-500",
      };
    } else if (result.score >= 50) {
      return {
        border: "border-yellow-500",
        bg: "bg-yellow-50 dark:bg-yellow-900/20",
        text: "text-yellow-600 dark:text-yellow-400",
        circle: "border-yellow-500",
      };
    } else {
      return {
        border: "border-red-500",
        bg: "bg-red-50 dark:bg-red-900/20",
        text: "text-red-600 dark:text-red-400",
        circle: "border-red-500",
      };
    }
  };

  const scoreColor = getScoreColor();

  const getScoreMessage = () => {
    if (result.score >= 80) {
      return "Excellent progress. You've mastered the fundamentals of";
    } else if (result.score >= 50) {
      return "Good effort. Keep practicing to master the fundamentals of";
    } else {
      return "Need more practice. Let's review and try again to master";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center">
        <div className="relative flex items-center justify-center size-40 md:size-48">
          <div
            className={`absolute inset-0 rounded-full border-8 ${scoreColor.border}/20`}
          ></div>

          <div
            className={`absolute inset-0 rounded-full border-8 ${scoreColor.circle} border-t-transparent transition-transform duration-700`}
            style={{ transform: `rotate(${rotation}deg)` }}
          ></div>

          <div className={`text-center z-10 ${scoreColor.text}`}>
            <span className="text-5xl md:text-6xl font-bold">
              {result.score}%
            </span>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Score
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-6 text-center md:text-left w-full">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Quiz Completed!
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              {getScoreMessage()} {result.topicName}.
            </p>
          </div>

          <div className=" gap-4">
            <div
              className={`${scoreColor.bg} p-4 rounded-xl border ${scoreColor.border}/20`}
            >
              <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">
                Total Correct
              </p>
              <p className={`text-2xl font-bold ${scoreColor.text}`}>
                {result.totalCorrect} / {result.totalQuestions}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleRetake}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-primary/20"
            >
              Retake This Topic
            </button>
            <button
              onClick={handleBackToHome}
              className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold py-3 px-6 rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
