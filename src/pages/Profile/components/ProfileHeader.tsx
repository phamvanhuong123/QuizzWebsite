import React from "react";
import { useNavigate } from "react-router";
import UserAvatar from "@/components/common/UserAvatar";
import type { User } from "@/utils/auth";

interface ProfileHeaderProps {
  user: User | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-primary/10 shadow-sm overflow-hidden relative">
      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <UserAvatar fullName={user?.fullName} size="lg" showName={false} />
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Welcome back, {user?.fullName || "Learner"}! 👋
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {user?.email || "Email not available"}
            </p>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mt-2">
          Track your learning progress and review your quiz history.
        </p>
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => navigate("/home")}
            className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Start New Quiz
          </button>
        </div>
      </div>
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/3 opacity-10 dark:opacity-20">
        <div className="w-full h-full bg-linear-to-l from-primary to-transparent"></div>
      </div>
    </div>
  );
};

export default ProfileHeader;
