import React, { useState } from "react";
import QuestionItem from "./QuestionItem";
import type { Question } from "../types/result.types";
import { ChartColumnBig, ChevronDown, ChevronUp } from "lucide-react";

interface AnswerReviewProps {
  questions: Question[];
}

const AnswerReview: React.FC<AnswerReviewProps> = ({ questions }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedQuestions = showAll ? questions : questions.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ChartColumnBig />
          Answer Review
        </h2>
        <span className="text-sm text-slate-500 font-medium bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
          {questions.length} Questions
        </span>
      </div>

      <div className="space-y-4">
        {displayedQuestions.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </div>

      {questions.length > 3 && (
        <div className="flex justify-center py-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 text-primary font-bold hover:underline transition-all text-decora"
          >
            <span>
              Load {showAll ? "less" : `all ${questions.length}`} reviews
            </span>
            <span className="material-symbols-outlined">
              {showAll ? <ChevronUp /> : <ChevronDown />}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AnswerReview;
