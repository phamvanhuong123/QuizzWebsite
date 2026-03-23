import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { submissionApi } from "@/apis/submissionApi";
import { CheckCircle2, XCircle, Eye, RotateCcw, Clock3, Trophy } from "lucide-react";
import type { Submission } from "../Home/types/home.types";

const QuizResult = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        if (submissionId) {
          const response = await submissionApi.getById(submissionId);
          setResult(response.data);
        }
      } catch (error) {
        console.error("Error fetching result:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [submissionId]);

  if (loading) return <div className="flex h-screen items-center justify-center text-slate-500">Loading results...</div>;
  if (!result) return <div className="flex h-screen items-center justify-center text-red-500">Result not found</div>;

  const { totalCorrect, totalQuestions, scorePercentage, topicId, submittedAt } = result;
  const totalIncorrect = totalQuestions - totalCorrect;

  const getFeedback = () => {
    if (scorePercentage >= 80) return { msg: "Excellent Mastery!", color: "text-green-600", bg: "bg-green-100/50" };
    if (scorePercentage >= 50) return { msg: "Good Effort!", color: "text-amber-600", bg: "bg-amber-100/50" };
    return { msg: "Keep Practicing!", color: "text-red-600", bg: "bg-red-100/50" };
  };

  const feedback = getFeedback();
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scorePercentage / 100) * circumference;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <main className="mx-auto max-w-5xl px-4 py-12 md:py-20">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 grid md:grid-cols-12">
          
          {/* Visual Score Section */}
          <div className="md:col-span-5 flex flex-col items-center justify-center border-b border-slate-100 bg-slate-50/50 p-10 dark:border-slate-800 dark:bg-slate-800/30 md:border-b-0 md:border-r">
            <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-800">
              <Trophy className="h-10 w-10 text-indigo-500" />
            </div>
            
            <div className="relative h-48 w-48 flex items-center justify-center">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  className="stroke-slate-200 dark:stroke-slate-700"
                  strokeWidth="12"
                />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke="url(#grad1)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: offset,
                    transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              </svg>
              <div className="absolute text-center">
                <span className="block text-5xl font-black tracking-tight">{scorePercentage}%</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Final Score</span>
              </div>
            </div>

            <div className={`mt-8 inline-flex items-center rounded-full px-6 py-2 text-sm font-bold ${feedback.bg} ${feedback.color}`}>
              {feedback.msg}
            </div>
          </div>

          {/* Stats & Actions Section */}
          <div className="md:col-span-7 flex flex-col justify-center p-10 md:p-14">
            <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-3xl font-black tracking-tight">Quiz Results</h1>
              <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-500 dark:bg-slate-800">
                <Clock3 size={14} />
                <span>{new Date(submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </header>

            <div className="mb-10 grid gap-6 sm:grid-cols-2">
              <div className="group rounded-3xl border border-slate-100 bg-slate-50/50 p-6 transition-all hover:border-green-200 dark:border-slate-800 dark:bg-slate-800/40">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-2 text-green-600 dark:bg-green-900/30">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">Correct</span>
                </div>
                <div className="text-3xl font-black italic">{totalCorrect} <span className="text-lg font-medium not-italic text-slate-300">/ {totalQuestions}</span></div>
              </div>

              <div className="group rounded-3xl border border-slate-100 bg-slate-50/50 p-6 transition-all hover:border-red-200 dark:border-slate-800 dark:bg-slate-800/40">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-red-100 p-2 text-red-600 dark:bg-red-900/30">
                    <XCircle size={20} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">Incorrect</span>
                </div>
                <div className="text-3xl font-black italic">{totalIncorrect} <span className="text-lg font-medium not-italic text-slate-300">/ {totalQuestions}</span></div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => navigate(`/result-detail?id=${submissionId}`)}
                className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-indigo-600 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-none active:scale-95 dark:shadow-none"
              >
                <Eye size={18} /> Review Details
              </button>
              <button
                onClick={() => navigate(`/quiz/${topicId}`)}
                className="flex items-center justify-center gap-3 rounded-2xl bg-slate-100 px-8 py-4 text-sm font-black uppercase tracking-widest text-slate-600 transition-all hover:bg-slate-200 active:scale-95 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <RotateCcw size={18} /> Retake
              </button>
            </div>
          </div>
        </div>
        
        <p className="mt-12 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
          Learning Platform • Academic Performance Report
        </p>
      </main>
    </div>
  );
};

export default QuizResult;