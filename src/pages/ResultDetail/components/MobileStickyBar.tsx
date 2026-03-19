import React from "react";
import { useNavigate } from "react-router";

interface MobileStickyBarProps {
  topicId: string;
}

const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ topicId }) => {
  const navigate = useNavigate();

  return (
    <div className="md:hidden sticky bottom-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 flex gap-3">
      <button
        onClick={() => navigate(`/quiz?topicId=${topicId}`)}
        className="flex-1 bg-primary text-white font-bold py-2 rounded-lg text-sm"
      >
        Retake
      </button>
      <button
        onClick={() => navigate("/home")}
        className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold py-2 rounded-lg text-sm"
      >
        Home
      </button>
    </div>
  );
};

export default MobileStickyBar;
