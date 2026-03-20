import React from "react";
import { GraduationCap } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 py-8 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 opacity-60">
          <GraduationCap />
          <span className="text-sm font-semibold">React Quiz Pro</span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © 2026 React Quiz Pro. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
          <a href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
