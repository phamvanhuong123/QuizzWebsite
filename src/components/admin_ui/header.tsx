import React from 'react';
import { ChevronRight, Bell, Settings } from 'lucide-react';

const Header: React.FC = () => {
  return (
    // Thay px-8 bằng px-4 để linh hoạt hơn, bỏ h-16 vì AdminLayout đã bọc ngoài
    <div className="flex-1 flex items-center justify-between h-16 px-2 lg:px-6 transition-colors">
      
      {/* Breadcrumbs - Ẩn bớt trên mobile cho đỡ chật */}
      <nav className="flex items-center text-sm font-medium">
        <span className="hidden sm:inline text-slate-500 dark:text-slate-400">Admin</span>
        <ChevronRight className="hidden sm:block w-4 h-4 mx-2 text-slate-300" />
        <span className="text-slate-900 dark:text-slate-100 font-bold">Users</span>
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-1 sm:gap-3">
        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
        </button>

        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
          <Settings size={20} />
        </button>

        {/* Thanh ngăn cách và User Info (Chỉ hiện từ màn hình lớn) */}
        <div className="hidden sm:block h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
        
        {/* Bạn có thể gắn Component UserMenu của bạn vào đây */}
      </div>
    </div>
  );
};

export default Header;