import React from 'react';
import { ChevronRight, Bell, Settings } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  // Lấy các phần của URL 
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Lấy phần tử cuối cùng làm tên trang (nếu không có thì mặc định là Dashboard)
  const currentPage = pathSegments[pathSegments.length - 1] || 'Dashboard';
  
  // Viết hoa chữ cái đầu và đổi dấu gạch ngang thành dấu cách 
  const formattedTitle = currentPage.charAt(0).toUpperCase() + currentPage.replace(/-/g, ' ').slice(1);

  return (
    <div className="flex-1 flex items-center justify-between h-16 px-2 lg:px-6 transition-colors">
      
      {/* Breadcrumbs - Đã được làm Dynamic */}
      <nav className="flex items-center text-sm font-medium">
        <span className="hidden sm:inline text-slate-500 dark:text-slate-400 capitalize">
          {pathSegments[0] || 'Admin'}
        </span>
        <ChevronRight className="hidden sm:block w-4 h-4 mx-2 text-slate-300" />
        {/* Đổ biến formattedTitle vào */}
        <span className="text-slate-900 dark:text-slate-100 font-bold">
          {formattedTitle}
        </span>
      </nav>

      <div className="flex items-center gap-1 sm:gap-3">
        {/* Thanh ngăn cách và User Info */}
        <div className="hidden sm:block h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
      
      </div>
    </div>
  );
};

export default Header;