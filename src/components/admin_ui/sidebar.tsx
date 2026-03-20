import React from 'react';
import { NavLink } from 'react-router';
// Thêm icon X để đóng sidebar trên mobile
import { School, Layers, HelpCircle, Users, X } from 'lucide-react'; 

// --- BƯỚC QUAN TRỌNG: Khai báo Interface ---
interface SidebarProps {
  onClose?: () => void; // Dấu ? nghĩa là có truyền vào hay không cũng được
}

// Thêm { onClose } vào tham số của component
const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  
  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
      isActive 
        ? 'bg-primary/10 text-primary font-bold shadow-sm' 
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
    }`;

  return (
    <aside className="h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col relative shadow-xl lg:shadow-none">
      
      {/* Nút đóng (X) - Chỉ hiển thị trên Mobile/Tablet */}
      <button 
        onClick={onClose}
        className="lg:hidden absolute right-4 top-5 p-2 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X size={20} />
      </button>

      {/* Phần Header Sidebar */}
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
        {/* Quan trọng: Khi bấm vào link trên mobile thì phải đóng sidebar lại */}
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
          <span className="text-sm font-medium text-[13px]">Users</span>
        </NavLink>
      </nav>

      {/* Sidebar Footer (Giữ nguyên phần User của bạn) */}
      {/* ... */}
    </aside>
  );
};

export default Sidebar;