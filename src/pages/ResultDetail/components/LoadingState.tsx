import React from "react";

const LoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Loading result...
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
