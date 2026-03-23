import React, { useMemo } from "react";
import type { ApiSubmission, ApiTopic } from "@/types/api.types";
import { format } from "date-fns";
import { ClipboardClock } from "lucide-react";

interface SubmissionHistoryProps {
  submissions: ApiSubmission[];
  topics: ApiTopic[];
}

const SubmissionHistory: React.FC<SubmissionHistoryProps> = ({
  submissions,
  topics,
}) => {
  const topicMap = useMemo(() => {
    const map = new Map<string, string>();
    topics.forEach((topic) => map.set(topic.id, topic.name));
    return map;
  }, [topics]);

  const sortedSubmissions = [...submissions].sort(
    (a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );

  const recentSubmissions = sortedSubmissions.slice(0, 5);

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600 dark:text-green-400";
    if (percentage >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <h3 className="text-lg font-bold">Recent Quiz History</h3>
        <span className="text-xs text-slate-500">
          Last {recentSubmissions.length} submissions
        </span>
      </div>

      {submissions.length === 0 ? (
        <div className="p-12 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
            <ClipboardClock className="text-slate-400 text-5xl" />
          </div>
          <div className="space-y-1">
            <p className="font-bold text-lg">No quizzes attempted yet</p>
            <p className="text-sm text-slate-500 max-w-xs">
              Start a quiz to see your performance history here.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3 font-medium">Topic</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Score</th>
                <th className="px-6 py-3 font-medium">Correct</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {recentSubmissions.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    {topicMap.get(sub.topicId) || "Unknown Topic"}
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    {format(new Date(sub.submittedAt), "MMM dd, yyyy HH:mm")}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-bold ${getScoreColor(
                        sub.scorePercentage,
                      )}`}
                    >
                      {Math.round(sub.scorePercentage)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {sub.totalCorrect} / {sub.totalQuestions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubmissionHistory;
