import { LoaderCircle } from "lucide-react";
import React from "react";

const LoadingState: React.FC = () => {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden">
      <div className="layout-container flex h-full grow flex-col blur-sm grayscale-20 opacity-50 pointer-events-none">
        <div className="px-6 md:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-240 flex-1">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/20 px-10 py-3">
              <div className="flex items-center gap-4 text-slate-900 dark:text-slate-100">
                <div className="size-6 text-primary">
                  <span className="material-symbols-outlined text-3xl">
                    quiz
                  </span>
                </div>
                <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">
                  Quiz App
                </h2>
              </div>
            </header>
            <div className="p-8 space-y-6">
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen loading overlay */}
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex flex-col items-center gap-6">
          {/* Spinner */}
          <div className="text-primary animate-spin">
            <LoaderCircle style={{ fontVariationSettings: "'wght' 300" }} />
          </div>
          {/* Loading text and progress bar */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium tracking-wide">
              Loading quiz...
            </p>
            <div className="w-48 h-1 bg-primary/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-1/3 rounded-full"></div>
            </div>
          </div>
        </div>
        {/* Branding footer */}
        <div className="absolute bottom-10 flex items-center gap-2 text-slate-400 dark:text-slate-500">
          <span className="material-symbols-outlined text-sm">shield</span>
          <span className="text-xs uppercase tracking-widest font-semibold">
            Secure Connection
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
