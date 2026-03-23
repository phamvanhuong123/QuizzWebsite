import React from "react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  trend?: string;
  color?: "primary" | "blue" | "green" | "orange" | "purple";
}

const colorMap = {
  primary: "text-primary bg-primary/10",
  blue: "text-blue-500 bg-blue-500/10",
  green: "text-green-500 bg-green-500/10",
  orange: "text-orange-500 bg-orange-500/10",
  purple: "text-purple-500 bg-purple-500/10",
};

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  trend,
  color = "primary",
}) => {
  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center justify-center p-2 rounded-lg ${colorMap[color]}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          {title}
        </p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;
