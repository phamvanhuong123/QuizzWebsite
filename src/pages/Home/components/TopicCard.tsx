import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import type { Topic } from "../types/home.types";

interface TopicCardProps {
  topic: Topic;
}

// Hàm phụ trợ để tạo màu dựa trên index (có thể thay bằng logic riêng)
const getTopicColor = (index: number) => {
  const colors = [
    { text: "text-primary", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { text: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
    { text: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
    { text: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { text: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/20" },
  ];
  return colors[index % colors.length];
};

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  const navigate = useNavigate();
  const color = getTopicColor(parseInt(topic.id) || 0);

  return (
    <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div
        className={`mb-4 w-12 h-12 rounded-lg ${color.bg} flex items-center justify-center ${color.text}`}
      >
        <span className="material-symbols-outlined">{topic.abridger}</span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {topic.name}
        </h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {topic.questionCount} Questions
        </span>
      </div>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 grow">
        {topic.description}
      </p>
      <button
        onClick={() => navigate(`/quiz/${topic.id}`)}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        Start Quiz <ArrowRight />
      </button>
    </div>
  );
};

export default TopicCard;
