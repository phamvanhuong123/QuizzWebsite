import { Bell, CircleAlert, CircleUserRound, Server } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-6 py-4 md:px-12 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-2">
          <div className="size-8 flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>

          <h2 className="m-0 text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
            QuizLearn
          </h2>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors"
            href="#"
          >
            Courses
          </a>
          <a
            className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors"
            href="#"
          >
            Quizzes
          </a>
          <a
            className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors"
            href="#"
          >
            Leaderboard
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:text-primary transition-colors">
            <Bell />
          </button>
          <div className="bg-primary/10 rounded-full p-0.5 border border-primary/20">
            <CircleUserRound />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="grow flex flex-col items-center justify-center relative px-6 py-20">
        {/* Massive Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[20rem] md:text-[30rem] font-black text-slate-200/50 dark:text-slate-800/30 leading-none">
            404
          </span>
        </div>

        {/* Foreground Error Message */}
        <div className="relative z-10 text-center max-w-xl mx-auto">
          <div className="mb-6 inline-flex items-center justify-center size-20 rounded-2xl bg-primary/10 text-primary">
            <CircleAlert className="size-15 text-slate-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Oops! Page not found.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed mb-10">
            The page you are looking for doesn't exist or has been moved. Let's
            get you back on track to your learning journey.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              className="w-full sm:w-auto flex min-w-40 items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-base font-bold tracking-wide shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              href="/home"
            >
              Go to Home
            </a>
            <button
              className="w-full sm:w-auto flex min-w-40 items-center justify-center rounded-xl h-14 px-8 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-transparent text-slate-700 dark:text-slate-200 text-base font-bold tracking-wide hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 py-8 px-6 md:px-12 bg-white dark:bg-background-dark">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a
              className="text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
              href="#"
            >
              Support
            </a>
            <a
              className="text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
              href="#"
            >
              Terms of Service
            </a>
          </div>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            © 2026 QuizLearn Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
