import React from 'react';
import { Plus, Search, Filter, Edit2, Trash2, HelpCircle } from 'lucide-react';

const Questions: React.FC = () => {
  const questions = [
    { id: 1, text: 'Tailwind v4 dùng cơ chế gì để xử lý CSS?', topic: 'Tailwind CSS v4', answers: 4, color: 'teal' },
    { id: 2, text: 'Component nào trong React Router dùng để render route con?', topic: 'React Framework', answers: 3, color: 'blue' },
    { id: 3, text: 'TypeScript có chế độ Strict Mode không?', topic: 'TypeScript Basics', answers: 2, color: 'amber' },
    { id: 4, text: 'Lệnh nào dùng để khởi tạo một dự án Node.js?', topic: 'Node.js Backend', answers: 4, color: 'green' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header trang Questions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Questions Bank</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage your quiz questions and answer bank</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-primary/25 w-full sm:w-auto">
          <Plus size={20} />
          <span>Add New Question</span>
        </button>
      </div>

      {/* 2. Thanh Search & Filter */}
      <div className="flex flex-col lg:flex-row gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search questions text..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-sm transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select className="flex-1 lg:w-48 bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-2 px-4 text-sm text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-primary/50 outline-none">
            <option>All Topics</option>
            <option>React Framework</option>
            <option>Tailwind CSS v4</option>
          </select>
          <button className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary rounded-xl transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* 3. Bảng danh sách Questions - Đã thêm overflow-x-auto */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider w-1/2">Question Text</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Related Topic</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Answers</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {questions.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <HelpCircle size={18} className="text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-medium text-slate-900 dark:text-white leading-relaxed">{q.text}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-${q.color}-100 text-${q.color}-600 dark:bg-${q.color}-900/30 dark:text-${q.color}-400`}>
                      {q.topic}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{q.answers} choices</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Questions;