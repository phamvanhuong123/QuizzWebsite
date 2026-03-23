import React from 'react';
import { NavLink } from 'react-router-dom';
import { School, Layers, HelpCircle, Users, LogOut, X } from 'lucide-react';

interface SidebarProps {
  onClose?: () => void; 
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  
  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
      isActive 
        ? 'bg-primary/10 text-primary font-bold shadow-sm' 
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
    }`;

  return (
    <aside className="h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col relative shadow-xl lg:shadow-none">
      
      {/* Nút đóng cho Mobile */}
      <button 
        onClick={onClose}
        className="lg:hidden absolute right-4 top-5 p-2 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X size={20} />
      </button>

      {/* Header Sidebar */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
          <School size={22} strokeWidth={2.5} />
        </div>
        <div className="overflow-hidden">
          <h1 className="text-sm font-black tracking-wider text-slate-900 dark:text-white uppercase leading-none">EduQuiz</h1>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1 uppercase">Admin Control</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1.5 mt-4">
        <NavLink to="/admin/topics" onClick={onClose} className={navLinkClass}>
          <Layers className="w-5 h-5" />
          <span className="text-sm font-medium">Topics</span>
        </NavLink>

        <NavLink to="/admin/questions" onClick={onClose} className={navLinkClass}>
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Questions</span>
        </NavLink>

        <NavLink to="/admin/users" onClick={onClose} className={navLinkClass}>
          <Users className="w-5 h-5" />
          <span className="text-sm font-medium">Users</span>
        </NavLink>
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800/50">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all group">
          {/* Avatar Admin */}
          <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden ring-2 ring-white dark:ring-slate-800 shrink-0">
            <img 
              alt="Admin Profile" 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" 
            />
          </div>
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate uppercase">Jane Cooper</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-medium uppercase">Super Admin</p>
          </div>

          {/* Logout Button */}
          <button 
            title="Logout"
            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;