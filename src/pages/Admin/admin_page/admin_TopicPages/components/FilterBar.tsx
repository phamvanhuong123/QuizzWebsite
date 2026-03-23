import React from "react";
import { Search } from "lucide-react";

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: string;
  onFilterChange: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="relative md:col-span-2">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search topics..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-sm transition-all outline-none"
        />
      </div>
      <select
        value={filterStatus}
        onChange={(e) => onFilterChange(e.target.value)}
        className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-2 px-4 text-sm text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer"
      >
        <option value="all">All Status</option>
        <option value="Active">Active</option>
        <option value="Draft">Draft</option>
      </select>
    </div>
  );
};

export default FilterBar;
