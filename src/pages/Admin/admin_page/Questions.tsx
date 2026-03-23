import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, HelpCircle, Loader2, X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { questionApi } from '@/apis/questionApi';
import { topicApi } from '@/apis/topicApi';

interface Topic {
  id: string;
  name: string;
}

interface Question {
  id: string;
  topicId: string;
  question: string;
  answers: string[];
  correctAnswer: number;
}

interface MappedQuestion extends Question {
  topicName: string;
  colorClass: string;
}

// Giá trị mặc định khi tạo câu hỏi mới
const initialFormState: Question = {
  id: '',
  topicId: '',
  question: '',
  answers: ['', '', '', ''],
  correctAnswer: 0
};

const Questions: React.FC = () => {
  const [questionsData, setQuestionsData] = useState<MappedQuestion[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // States cho Search và Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');

  // States cho Modals
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // State quản lý dữ liệu Form và Xóa
  const [formData, setFormData] = useState<Question>(initialFormState);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper: Lấy màu theo Topic
  const getTopicColorClass = (topicId: string) => {
    const colorMap: Record<string, string> = {
      't1': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      't2': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      't3': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      't4': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      't5': 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
    };
    return colorMap[topicId] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
  };

  // Fetch Data 
  useEffect(() => {
    const fetchQuestionsAndTopics = async () => {
      try {
        setIsLoading(true);
        const [questionsRes, topicsRes] = await Promise.all([
          questionApi.getAll(),
          topicApi.getAll()
        ]);

        const rawQuestions: Question[] = questionsRes.data;
        const rawTopics: Topic[] = topicsRes;

        setTopics(rawTopics);

        const mapped: MappedQuestion[] = rawQuestions.map((q) => {
          const topic = rawTopics.find(t => t.id === q.topicId);
          return {
            ...q,
            topicName: topic ? topic.name : 'Unknown Topic',
            colorClass: getTopicColorClass(q.topicId)
          };
        });

        setQuestionsData(mapped);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestionsAndTopics();
  }, []);

  // Bật modal thêm mới
  const handleOpenAdd = () => {
    setFormData({ ...initialFormState, topicId: topics[0]?.id || '' });
    setIsQuestionModalOpen(true);
  };

  // Bật modal sửa
  const handleOpenEdit = (question: MappedQuestion) => {
    setFormData({
      id: question.id,
      topicId: question.topicId,
      question: question.question,
      answers: [...question.answers],
      correctAnswer: question.correctAnswer
    });
    setIsQuestionModalOpen(true);
  };

  // Xử lý thay đổi nội dung đáp án
  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...formData.answers];
    newAnswers[index] = value;
    setFormData({ ...formData, answers: newAnswers });
  };

  // Lưu câu hỏi 
  const handleSaveQuestion = async () => {
    if (!formData.question.trim() || formData.answers.some(a => !a.trim())) {
      alert('Vui lòng điền đầy đủ câu hỏi và 4 đáp án!');
      return;
    }

    try {
      setIsSubmitting(true);
      const isEditing = !!formData.id;
      
      let savedQuestion: Question;

      if (isEditing) {
        // Cập nhật 
        const res = await questionApi.update(formData.id, formData);
        savedQuestion = res.data;
        
        setQuestionsData(prev => prev.map(q => {
          if (q.id === savedQuestion.id) {
            const topic = topics.find(t => t.id === savedQuestion.topicId);
            return {
              ...savedQuestion,
              topicName: topic ? topic.name : 'Unknown Topic',
              colorClass: getTopicColorClass(savedQuestion.topicId)
            };
          }
          return q;
        }));
      } else {
        // Thêm mới
        const newId = `q${Date.now()}`;
        const dataToSave = { ...formData, id: newId };
        
        const res = await questionApi.create(dataToSave);
        savedQuestion = res.data;

        const topic = topics.find(t => t.id === savedQuestion.topicId);
        const newMappedQ: MappedQuestion = {
          ...savedQuestion,
          topicName: topic ? topic.name : 'Unknown Topic',
          colorClass: getTopicColorClass(savedQuestion.topicId)
        };
        setQuestionsData(prev => [...prev, newMappedQ]);
      }

      setIsQuestionModalOpen(false);
    } catch (error) {
      console.error('Lỗi khi lưu:', error);
      alert('Có lỗi xảy ra khi lưu câu hỏi!');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Bật modal Xóa
  const handleOpenDelete = (id: string) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  // Xác nhận Xóa 
  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      setIsSubmitting(true);
      await questionApi.remove(deletingId);
      
      setQuestionsData(prev => prev.filter(q => q.id !== deletingId));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
      alert('Có lỗi xảy ra khi xóa!');
    } finally {
      setIsSubmitting(false);
      setDeletingId(null);
    }
  };

  // Lọc dữ liệu
  const filteredQuestions = questionsData.filter((q) => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = selectedTopic === 'All Topics' || q.topicName === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="space-y-6 relative">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Questions Bank</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your quiz questions and answer bank</p>
        </div>
        
        <button 
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-primary/25 w-full sm:w-auto"
        >
          <Plus size={20} />
          <span>Add New Question</span>
        </button>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search questions text..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-sm transition-all outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="flex-1 lg:w-48 bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-2 px-4 text-sm text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-primary/50 outline-none cursor-pointer"
          >
            <option value="All Topics">All Topics</option>
            {topics.map(t => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </select>
          <button className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary rounded-xl transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* 3. Bảng dữ liệu */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-200">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider w-1/2">Question Text</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Related Topic</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Answers</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
                    <p className="text-sm text-slate-500">Loading questions...</p>
                  </td>
                </tr>
              ) : filteredQuestions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-sm text-slate-500">
                    No questions found.
                  </td>
                </tr>
              ) : (
                filteredQuestions.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <HelpCircle size={18} className="text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-medium text-slate-900 dark:text-white leading-relaxed line-clamp-2">
                          {q.question}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${q.colorClass}`}>
                        {q.topicName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                        {q.answers.length} choices
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => handleOpenEdit(q)}
                          className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleOpenDelete(q.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL THÊM / SỬA CÂU HỎI --- */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30 shrink-0">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {formData.id ? 'Edit Question' : 'Create New Question'}
              </h3>
              <button 
                onClick={() => setIsQuestionModalOpen(false)}
                className="p-1.5 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              
              {/* Chọn Topic */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Topic
                </label>
                <select 
                  value={formData.topicId}
                  onChange={(e) => setFormData({...formData, topicId: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm text-slate-900 dark:text-white"
                >
                  <option value="" disabled>-- Select a Topic --</option>
                  {topics.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              {/* Nhập câu hỏi */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Question Text
                </label>
                <textarea 
                  rows={3}
                  value={formData.question}
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                  placeholder="Enter your question here..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm text-slate-900 dark:text-white resize-none"
                />
              </div>

              {/* Các đáp án */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Answers & Correct Option
                </label>
                <div className="space-y-3">
                  {formData.answers.map((ans, index) => (
                    <div key={index} className={`flex items-center gap-3 p-2 rounded-xl border transition-all ${formData.correctAnswer === index ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50'}`}>
                      {/* Radio button để chọn đáp án đúng */}
                      <input 
                        type="radio" 
                        name="correctAnswer"
                        checked={formData.correctAnswer === index}
                        onChange={() => setFormData({...formData, correctAnswer: index})}
                        className="w-5 h-5 text-primary focus:ring-primary ml-2 cursor-pointer"
                      />
                      <span className="text-sm font-bold text-slate-500 w-6">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <input 
                        type="text" 
                        value={ans}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-sm text-slate-900 dark:text-white"
                      />
                      {formData.correctAnswer === index && (
                        <CheckCircle2 size={18} className="text-primary mr-2" />
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  * Select the radio button next to the correct answer.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => setIsQuestionModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveQuestion}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg shadow-sm transition-all disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                {formData.id ? 'Save Changes' : 'Create Question'}
              </button>
            </div>
            
          </div>
        </div>
      )}

      {/* --- MODAL XÁC NHẬN XÓA --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden text-center p-6">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-400">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Delete Question?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              This action cannot be undone. Are you sure you want to permanently delete this question from the bank?
            </p>
            
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isSubmitting}
                className="px-4 py-2 flex-1 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmDelete}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Questions;
