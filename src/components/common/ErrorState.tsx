import { CircleX } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
      <div className="text-center max-w-md px-4">
        <div className="inline-flex items-center justify-center size-20 rounded-2xl bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 mb-6">
          <CircleX />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Oops! Something went wrong
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">{message}</p>
        <button
          onClick={() => navigate("/home")}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
