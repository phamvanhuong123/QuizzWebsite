import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
      <nav className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400">
        <span>Admin</span>
        <span className="material-symbols-outlined text-sm mx-2">chevron_right</span>
        <span className="text-slate-900 dark:text-slate-100 font-semibold">Users</span>
      </nav>
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>
    </header>
  );
};

export default Header;