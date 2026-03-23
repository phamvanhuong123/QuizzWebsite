import React, { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "@/components/admin_ui/sidebar";
import Header from "@/components/admin_ui/header";
import { Menu } from "lucide-react";

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex relative">
      
      {/* Lớp nền mờ (Overlay) - Chỉ hiện trên mobile khi mở sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/*  Sidebar - Dùng transform để trượt ra trượt vào */}
      <div className={`
        fixed inset-y-0 left-0 z-[70] w-64 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:block
      `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/*  Vùng nội dung chính */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Header tích hợp nút Menu cho mobile */}
        <div className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 lg:px-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 mr-2 lg:hidden text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <div className="flex-1">
            <Header />
          </div>
        </div>

        {/* Nội dung trang */}
        <div className="p-4 lg:p-8 overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
