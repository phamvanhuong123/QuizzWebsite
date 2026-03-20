import React, { useState } from "react";
import { ArrowRight, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import type { Topic } from "../types/home.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TopicsSectionProps {
  topics: Topic[];
}

const TopicsSection: React.FC<TopicsSectionProps> = ({ topics }) => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getColorClasses = (index: number) => {
    const colors = [
      { text: "text-primary", bg: "bg-blue-50 dark:bg-blue-900/20" },
      { text: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
      { text: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
    ];
    return colors[index % colors.length];
  };

  const displayedTopics = topics.slice(0, 3);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Available Topics
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Choose a subject to test your knowledge and track your progress.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <Button variant="outline" className="gap-2">
              <Eye className="w-4 h-4" />
              View all topics
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[95vw] sm:w-[90vw] lg:max-w-6xl max-h-[85vh] p-6 overflow-hidden">
            <DialogHeader>
              <DialogTitle>All Topics</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
              {topics.map((topic, index) => {
                const { text, bg } = getColorClasses(index);
                return (
                  <div
                    key={topic.id}
                    className="flex flex-col bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center ${text}`}
                      >
                        <span className="material-symbols-outlined text-lg">
                          {topic.abridger}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                          {topic.name}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {topic.questionCount} questions
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                      {topic.description}
                    </p>
                    <Button
                      onClick={() => {
                        navigate(`/quiz/${topic.id}`);
                        setIsDialogOpen(false);
                      }}
                      className="w-full mt-auto"
                      size="sm"
                    >
                      Start Quiz <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedTopics.map((topic, index) => {
          const { text, bg } = getColorClasses(index);
          return (
            <div
              key={topic.id}
              className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`mb-4 w-12 h-12 rounded-lg ${bg} flex items-center justify-center ${text}`}
              >
                <span className="material-symbols-outlined">
                  {topic.abridger}
                </span>
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
                Start Quiz <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopicsSection;
