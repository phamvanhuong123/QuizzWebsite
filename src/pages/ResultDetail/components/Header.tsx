import React from "react";
import UserAvatar from "./UserAvatar";
import type { User } from "../types/result.types";
import { Bell, BookCheck } from "lucide-react";

interface HeaderProps {
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 px-6 md:px-10 py-3 bg-white dark:bg-slate-900">
      <div className="flex items-center gap-4">
        <div className="text-primary size-8 flex items-center justify-center">
          <BookCheck className="material-symbols-outlined text-3xl" />
        </div>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">
          React Learn
        </h2>
      </div>

      <div className="flex flex-1 justify-end gap-4">
        <div className="flex gap-2">
          <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <Bell />
          </button>
        </div>

        {user && (
          <UserAvatar fullName={user.fullName} size="md" showName={true} />
        )}
      </div>
    </header>
  );
};

export default Header;
