import React from "react";
import {
  getDisplayName,
  getInitialLetter,
  getNameColor,
} from "../utils/nameUtils";

interface UserAvatarProps {
  fullName?: string | null;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  fullName,
  size = "md",
  showName = false,
  className = "",
}) => {
  const displayName = getDisplayName(fullName);
  const initial = getInitialLetter(fullName);
  const bgColor = getNameColor(fullName);

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  if (showName) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div
          className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold text-white`}
          style={{ backgroundColor: bgColor }}
        >
          {initial}
        </div>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {displayName}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold text-white ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {initial}
    </div>
  );
};

export default UserAvatar;
