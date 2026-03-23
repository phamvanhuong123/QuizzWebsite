import React from "react";
import { useNavigate } from "react-router";
import { ChevronDown, LogOut, User } from "lucide-react";
import UserAvatar from "./UserAvatar";

interface UserMenuProps {
  fullName: string | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ fullName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
        <UserAvatar fullName={fullName} size="md" />
        <ChevronDown className="w-4 h-4 text-slate-500" />
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-0.4 w-48 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg hidden group-hover:block z-50">
        <div className="py-1">
          <button
            onClick={handleProfile}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <User size={16} /> Profile
          </button>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm border-t hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
