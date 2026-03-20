import React from 'react';
import { Plus, Search, Edit2, Trash2, BookOpen } from 'lucide-react';

const Topics: React.FC = () => {
  const topics = [
    { id: 1, name: 'React Framework', questions: 25, status: 'Active', color: 'bg-blue-500' },
    { id: 2, name: 'Tailwind CSS v4', questions: 18, status: 'Active', color: 'bg-teal-500' },
    { id: 3, name: 'TypeScript Basics', questions: 12, status: 'Draft', color: 'bg-amber-500' },
    { id: 4, name: 'Node.js Backend', questions: 30, status: 'Active', color: 'bg-green-500' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header: flex-col cho mobile, flex-row cho desktop */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Topics Management</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage your quiz categories and subjects</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-primary/25 w-full sm:w-auto">
          <Plus size={20} />
          <span>Add New Topic</span>
        </button>
      </div>

      {/* 2. Thanh Filter: Grid linh hoạt */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search topics..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-sm transition-all outline-none"
          />
        </div>
        <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-2 px-4 text-sm text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer">
          <option>All Status</option>
          <option>Active</option>
          <option>Draft</option>
        </select>
      </div>

      {/* 3. Bảng danh sách: Quan trọng nhất là overflow-x-auto */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Topic Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Questions</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {topics.map((topic) => (
                <tr key={topic.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${topic.color} rounded-xl flex items-center justify-center text-white shadow-inner shrink-0`}>
                        <BookOpen size={20} />
                      </div>
                      <span className="font-semibold text-slate-900 dark:text-white truncate">{topic.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">{topic.questions} items</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      topic.status === 'Active' 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {topic.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
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

export default Topics;