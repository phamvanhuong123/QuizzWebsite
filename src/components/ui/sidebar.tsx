import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50">
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-xl">school</span>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white uppercase">EduQuiz</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Admin Control</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-1 mt-4">
          <a className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group" href="#">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary">layers</span>
            <span className="text-sm font-medium">Topics</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group" href="#">
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary">help</span>
            <span className="text-sm font-medium">Questions</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg transition-colors" href="#">
            <span className="material-symbols-outlined text-[20px]">group</span>
            <span className="text-sm font-semibold">Users</span>
          </a>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <img alt="User Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJJp7ikxmhA83XbUysAPHthtl9Ednhd-_XiPuhr22XqR0KLppYf7N6oqCSNR9o0OTknrN3QDKwm9uMGAaWCJ18D4DSdpS5Vg2UTHmhMj7VVsj6fYm_YJSHS8WMk9QWjQIzW5atRDeuueXzVTAUuP114N12Ch4UKnD8L8cc8OBV6AKkiPqfQVKTj3LtZ8dFDkDko26W8elyPI0nlvPFqGS4GYta7iFHplnSUn5assdnIRe5J4B0j7UiQPYt91naZg21DKEj1njzE40" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold truncate">Jane Cooper</p>
              <p className="text-[10px] text-slate-500 truncate">Super Admin</p>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-sm cursor-pointer hover:text-slate-600">logout</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;