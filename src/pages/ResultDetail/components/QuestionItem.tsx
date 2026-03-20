import React, { useState } from "react";
import type { Question } from "../types/result.types";
import { CircleCheck, CircleX } from "lucide-react";

interface QuestionItemProps {
  question: Question;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  const getOptionClass = (option: string) => {
    if (option === question.correctAnswer && option === question.userAnswer) {
      return "border-2 border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium flex justify-between items-center";
    }
    if (option === question.correctAnswer) {
      return "border-2 border-green-500 bg-green-50/50 dark:bg-green-900/10 text-slate-700 dark:text-slate-300 font-medium flex justify-between items-center";
    }
    if (option === question.userAnswer && !question.isCorrect) {
      return "border-2 border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-medium flex justify-between items-center";
    }
    return "border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400";
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="space-y-1">
          <span className="text-xs font-bold text-primary uppercase tracking-tighter">
            Question {question.questionNumber}
          </span>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white leading-snug">
            {question.question}
          </h3>
        </div>
        <div
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
            question.isCorrect
              ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
              : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20"
          }`}
        >
          <span className="text-lg">
            {question.isCorrect ? (
              <CircleCheck size={18} />
            ) : (
              <CircleX size={18} />
            )}
          </span>
          {question.isCorrect ? "Correct" : "Incorrect"}
        </div>
      </div>
      <div className="grid gap-3">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${getOptionClass(option)}`}
          >
            <span>{option}</span>
            {option === question.correctAnswer &&
              option !== question.userAnswer && (
                <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded">
                  Correct Answer
                </span>
              )}
            {option === question.userAnswer && question.isCorrect && (
              <CircleCheck />
            )}
            {option === question.userAnswer && !question.isCorrect && (
              <CircleX />
            )}
          </div>
        ))}
      </div>
      {question.explanation && (
        <div className="mt-4">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-1 text-sm text-primary font-medium"
          >
            <span>Explanation</span>
            <span className="material-symbols-outlined text-base">
              {showExplanation ? "expand_less" : "expand_more"}
            </span>
          </button>
          {showExplanation && (
            <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong className="text-primary">Explanation:</strong>{" "}
                {question.explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionItem;
