import React from "react";
import { Bell, GraduationCap } from "lucide-react";
import UserMenu from "@/pages/common/UserMenu";
import type { User } from "@/utils/auth";

interface HeaderProps {
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white">
              <GraduationCap />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              React Quiz Pro
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-primary transition-colors">
              <Bell />
            </button>
            {user && <UserMenu fullName={user.fullName} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
