import React from "react";
import {
  ArrowBigDown,
  ArrowRight,
  Bell,
  GraduationCap,
  LogOut,
  User,
} from "lucide-react";

interface QuizTopic {
  id: string;
  title: string;
  questions: number;
  description: string;
  abridger: string;
  colorClass: string;
  bgColorClass: string;
}

interface HistoryItem {
  id: string;
  topicName: string;
  date: string;
  score: number;
  abridger: string;
  colorClass: string;
  bgColorClass: string;
}

const Home: React.FC = () => {
  const quizTopics: QuizTopic[] = [
    {
      id: "hooks",
      title: "React Hooks",
      questions: 20,
      description:
        "Master useEffect, useState, and learn how to build powerful custom hooks for your applications.",
      abridger: "RH",
      colorClass: "text-primary",
      bgColorClass: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      id: "css",
      title: "Modern CSS",
      questions: 15,
      description:
        "Deep dive into Flexbox, CSS Grid, and modern styling techniques including Tailwind and CSS Modules.",
      abridger: "css",
      colorClass: "text-indigo-600",
      bgColorClass: "bg-indigo-50 dark:bg-indigo-900/20",
    },
    {
      id: "es6",
      title: "ES6+ Syntax",
      questions: 25,
      description:
        "Refresh your knowledge of arrow functions, destructuring, and advanced JavaScript patterns.",
      abridger: "JS",
      colorClass: "text-amber-600",
      bgColorClass: "bg-amber-50 dark:bg-amber-900/20",
    },
  ];

  const historyData: HistoryItem[] = [
    {
      id: "1",
      topicName: "React Hooks Basics",
      date: "Oct 24, 2023",
      score: 90,
      abridger: "RH",
      colorClass: "text-primary",
      bgColorClass: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      id: "2",
      topicName: "Advanced CSS Grid",
      date: "Oct 22, 2023",
      score: 75,
      abridger: "GV",
      colorClass: "text-indigo-600",
      bgColorClass: "bg-indigo-50 dark:bg-indigo-900/20",
    },
    {
      id: "3",
      topicName: "JS Destructuring",
      date: "Oct 18, 2023",
      score: 100,
      abridger: "DObject",
      colorClass: "text-amber-600",
      bgColorClass: "bg-amber-50 dark:bg-amber-900/20",
    },
  ];

  const getScoreBadgeClass = (score: number): string => {
    if (score >= 90) {
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    } else if (score >= 75) {
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    } else {
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"; // fallback
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white">
                <GraduationCap />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                React Quiz Pro
              </span>
            </div>

            {/* Right Menu */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-500 hover:text-primary transition-colors">
                <Bell />
              </button>
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    JD
                  </div>
                  <ArrowBigDown />
                </button>
                {/* Dropdown Menu */}
                <div className="absolute right-0 pt-2 mt-0.4 w-48 origin-top-right rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block">
                  <div className="py-1">
                    <a
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <User /> Profile
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border-t border-slate-100 dark:border-slate-800"
                    >
                      <LogOut /> Logout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Available Topics Section */}
        <section className="mb-12">
          <div className="flex flex-col gap-1 mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Available Topics
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Choose a subject to test your knowledge and track your progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizTopics.map((topic) => (
              <div
                key={topic.id}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`mb-4 w-12 h-12 rounded-lg ${topic.bgColorClass} flex items-center justify-center ${topic.colorClass}`}
                >
                  <span className="material-symbols-outlined">
                    {topic.abridger}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {topic.title}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {topic.questions} Questions
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 grow">
                  {topic.description}
                </p>
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  Start Quiz <ArrowRight />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* History Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                My History
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Review your past performance and track your growth over time.
              </p>
            </div>
            <button className="text-primary font-medium text-sm hover:underline">
              View All
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Topic Name
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-11 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {historyData.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-auto h-8 p-2 rounded-lg ${item.bgColorClass} flex items-center justify-center ${item.colorClass}`}
                          >
                            <span className="material-symbols-outlined text-sm">
                              {item.abridger}
                            </span>
                          </div>
                          <span className="font-medium text-slate-900 dark:text-slate-200">
                            {item.topicName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                        {item.date}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${getScoreBadgeClass(
                            item.score,
                          )}`}
                        >
                          {item.score}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="px-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 py-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 opacity-60">
            <GraduationCap />
            <span className="text-sm font-semibold">React Quiz Pro</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2026 React Quiz Pro. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
