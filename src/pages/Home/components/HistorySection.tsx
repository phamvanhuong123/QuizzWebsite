import React from "react";
import type { HistoryItem } from "../types/home.types";
import { useNavigate } from "react-router";

interface HistorySectionProps {
  history: HistoryItem[];
}

const HistorySection: React.FC<HistorySectionProps> = ({ history }) => {
  const navigate = useNavigate();

  const getScoreBadgeClass = (score: number): string => {
    if (score >= 90)
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    if (score >= 75)
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  };

  const getColorClasses = (index: number) => {
    const colors = [
      { text: "text-primary", bg: "bg-blue-50 dark:bg-blue-900/20" },
      { text: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
      { text: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
    ];
    return colors[index % colors.length];
  };

  return (
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
              {history.map((item, index) => {
                const { text, bg } = getColorClasses(index);
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-auto h-8 p-2 rounded-lg ${bg} flex items-center justify-center ${text}`}
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
                      {new Date(item.submittedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${getScoreBadgeClass(
                          item.scorePercentage,
                        )}`}
                      >
                        {item.scorePercentage}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => navigate(`/result-detail?id=${item.id}`)}
                        className="px-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
