import React from "react";
import { Edit2, Trash2, BookOpen } from "lucide-react";
import type { ApiTopic } from "@/types/api.types";

interface TopicTableProps {
  topics: ApiTopic[];
  onEdit: (topic: ApiTopic) => void;
  onDelete: (id: string) => void;
}

const TopicTable: React.FC<TopicTableProps> = ({
  topics,
  onEdit,
  onDelete,
}) => {
  const getStatus = (count: number) => (count > 0 ? "Active" : "Draft");

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-175">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">
                Topic Name
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">
                Questions
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">
                Duration
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {topics.map((topic) => {
              const status = getStatus(topic.questionCount);
              const statusColor =
                status === "Active"
                  ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400";

              const durationText = `${topic.durationHours}h ${topic.durationMinutes}m`;

              return (
                <tr
                  key={topic.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-inner shrink-0 ${
                          status === "Active" ? "bg-blue-500" : "bg-amber-500"
                        }`}
                      >
                        <BookOpen size={20} />
                      </div>
                      <span className="font-semibold text-slate-900 dark:text-white truncate">
                        {topic.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {topic.questionCount} items
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {durationText}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColor}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => onEdit(topic)}
                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(topic.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopicTable;
