import React from "react";
import { Plus } from "lucide-react";

interface HeaderProps {
  onAdd: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdd }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Topics Management
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage your quiz categories and subjects
        </p>
      </div>
      <button
        onClick={onAdd}
        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-primary/25 w-full sm:w-auto"
      >
        <Plus size={20} />
        <span>Add New Topic</span>
      </button>
    </div>
  );
};

export default Header;
