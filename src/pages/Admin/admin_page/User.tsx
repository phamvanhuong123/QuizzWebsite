import React from 'react';
import { Plus, Search, Mail, ShieldCheck, Edit2, Trash2 } from 'lucide-react';

const Users: React.FC = () => {
  // 1. Dữ liệu mẫu người dùng (Sau này bạn sẽ thay bằng dữ liệu thật từ API)
  const users = [
    { id: 1, name: 'Jane Cooper', email: 'jane.cooper@example.com', role: 'Super Admin', status: 'Verified', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
    { id: 2, name: 'Cody Fisher', email: 'cody.fisher@example.com', role: 'Editor', status: 'Pending', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cody' },
    { id: 3, name: 'Esther Howard', email: 'esther.howard@example.com', role: 'User', status: 'Verified', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Esther' },
    { id: 4, name: 'Jenny Wilson', email: 'jenny.wilson@example.com', role: 'Super Admin', status: 'Verified', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny' },
  ];

  return (
    <div className="space-y-6">
      {/* 2. Header trang Users - Đã thêm Co dãn (Responsive) */}
      {/* flex-col cho mobile, sm:flex-row cho màn hình lớn hơn */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Users System</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage system users, administrators and their permissions</p>
        </div>
        
        {/* Nút 'Invite New User' co dãn theo màn hình */}
        <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-primary/25 w-full sm:w-auto flex-shrink-0">
          <Plus size={20} />
          <span>Invite New User</span>
        </button>
      </div>

      {/* 3. Thanh Search & Filter - Đã thêm Co dãn */}
      {/* Grid 1 cột trên mobile, lg:3 cột trên desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-sm transition-all outline-none"
          />
        </div>
        <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-2 px-4 text-sm text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer">
          <option>All Roles</option>
          <option>Super Admin</option>
          <option>Editor</option>
          <option>User</option>
        </select>
      </div>

      {/* 4. Bảng danh sách Users - ĐÂY LÀ PHẦN QUAN TRỌNG NHẤT ĐỂ CO DÃN */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        {/* Lớp div bọc ngoài này cho phép bảng cuộn ngang trên mobile */}
        <div className="overflow-x-auto">
          
          {/* min-w-[800px] buộc bảng giữ chiều rộng tối thiểu, không bị bóp méo cột */}
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">User Information</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">System Role</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Account Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar người dùng */}
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-10 h-10 rounded-full ring-2 ring-slate-100 dark:ring-slate-700 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-900 dark:text-white uppercase text-sm truncate">{user.name}</p>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                          <Mail size={12} className="flex-shrink-0" />
                          <span className="truncate">{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {/* Style riêng cho quyền Super Admin dùng màu Primary */}
                    <div className={`inline-flex items-center gap-1.5 font-bold text-xs uppercase ${user.role === 'Super Admin' ? 'text-primary' : 'text-slate-600 dark:text-slate-400'} whitespace-nowrap`}>
                      <ShieldCheck size={16} />
                      <span>{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {/* Badge trạng thái xanh/vàng */}
                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      user.status === 'Verified' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1.5">
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

export default Users;