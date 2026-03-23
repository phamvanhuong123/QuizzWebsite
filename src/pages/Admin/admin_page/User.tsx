import React, { useState, useEffect } from 'react';
import { Search, Loader2, X } from 'lucide-react'; 
import { userApi } from '@/apis/userApi';
import Pagination from '@/components/common/Pagination'; 

interface TableUser {
  id: string;
  initials: string;
  name: string;
  email: string;
  quizzes: number;
  score: string | number;
  status: string;
}

const Users: React.FC = () => {
  const [usersData, setUsersData] = useState<TableUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<TableUser | null>(null);

  // 👇 2. Thêm state quản lý phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Bạn có thể đổi thành 10 tùy ý

  useEffect(() => {
    const fetchUsersAndLeaderboard = async () => {
      try {
        setIsLoading(true);
        const [usersRes, subsRes] = await Promise.all([
          userApi.getAllUsers(),
          userApi.getAllSubmissions()
        ]);

        const rawUsers = usersRes.data;
        const rawSubmissions = subsRes.data;

        const students = rawUsers.filter((u: any) => u.role !== 'admin');

        const processedData = students.map((student: any) => {
          const studentSubs = rawSubmissions.filter((sub: any) => sub.userId === student.id);
          const quizzesCount = studentSubs.length;
          
          const avgScore = quizzesCount > 0 
            ? Math.round(studentSubs.reduce((acc: number, curr: any) => acc + curr.scorePercentage, 0) / quizzesCount) 
            : 0;

          let status = 'slate';
          if (quizzesCount > 0) {
            if (avgScore >= 80) status = 'green';
            else if (avgScore >= 50) status = 'yellow';
            else status = 'red';
          }

          const nameParts = student.fullName.trim().split(' ');
          const initials = nameParts.length > 1 
            ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
            : student.fullName.substring(0, 2).toUpperCase();

          return {
            id: student.id,
            initials,
            name: student.fullName,
            email: student.email,
            quizzes: quizzesCount,
            score: quizzesCount > 0 ? `${avgScore}%` : 'N/A',
            status
          };
        });

        setUsersData(processedData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu từ API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsersAndLeaderboard();
  }, []);

  // Reset về trang 1 mỗi khi người dùng gõ tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const getScoreBadgeStyle = (status: string) => {
    switch (status) {
      case 'green': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900/50';
      case 'yellow': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/50';
      case 'red': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900/50';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'; 
    }
  };

  // Lọc dữ liệu theo search term
  const filteredUsers = usersData.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.email.toLowerCase().includes(searchLower) ||
      user.name.toLowerCase().includes(searchLower)
    );
  });

  //  Tính toán dữ liệu hiển thị cho TRANG HIỆN TẠI
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-6 relative">
      
      {/* Header & Search Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Users Management</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage platform participants and view their profiles.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by email or name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[400px]">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">User ID</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Full Name</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            
            {isLoading ? (
              <tbody>
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
                    <p className="text-sm text-slate-500">Loading user data...</p>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {/* Map qua paginatedUsers thay vì filteredUsers */}
                {paginatedUsers.map((user, index) => (
                  <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                      #{user.id.toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                          {user.initials}
                        </div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
                
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-sm text-slate-500">
                      No users found matching "{searchTerm}".
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
        {!isLoading && filteredUsers.length > 0 && (
          <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800/20 border-t border-slate-200 dark:border-slate-800">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredUsers.length}
              itemsPerPage={itemsPerPage}
              itemName="users"
            />
          </div>
        )}
      </div>

      {/* Khối Modal View Details*/}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
            
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
              <h3 className="font-bold text-slate-900 dark:text-white">Student Profile</h3>
              <button 
                onClick={() => setSelectedUser(null)}
                className="p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary text-2xl font-bold shadow-inner">
                  {selectedUser.initials}
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">{selectedUser.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{selectedUser.email}</p>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">ID: #{selectedUser.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center border border-slate-100 dark:border-slate-700/50">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Total Quizzes</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedUser.quizzes}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center border border-slate-100 dark:border-slate-700/50">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Avg Score</p>
                  <div className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-bold border ${getScoreBadgeStyle(selectedUser.status)}`}>
                    {selectedUser.score}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-right">
              <button 
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
              >
                Close Profile
              </button>
            </div>
            
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Users;