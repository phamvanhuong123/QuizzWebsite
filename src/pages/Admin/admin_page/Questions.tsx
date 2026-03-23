import React, { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  HelpCircle,
  Loader2,
  X,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { questionApi } from "@/apis/questionApi";
import { topicApi } from "@/apis/topicApi";
import Pagination from "@/components/common/Pagination"; 

interface Topic {
  id: string;
  name: string;
  questionCount: number;
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

const initialFormState: Question = {
  id: "",
  topicId: "",
  question: "",
  answers: ["", "", "", ""],
  correctAnswer: 0,
};

const getTopicColorClass = (topicId: string) => {
  const colorMap: Record<string, string> = {
    t1: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    t2: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    t3: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    t4: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    t5: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  };
  return (
    colorMap[topicId] ||
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
  );
};

// Cấu hình số item mỗi trang
const ITEMS_PER_PAGE = 5;

const Questions: React.FC = () => {
  const [questionsData, setQuestionsData] = useState<MappedQuestion[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");

  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [formData, setFormData] = useState<Question>(initialFormState);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);

  // Hàm lấy dữ liệu (topics + questions)
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [questionsRes, topicsRes] = await Promise.all([
        questionApi.getAll(),
        topicApi.getAll(),
      ]);

      const rawQuestions: Question[] = questionsRes.data;
      const rawTopics: Topic[] = topicsRes;

      setTopics(rawTopics);

      const mapped: MappedQuestion[] = rawQuestions.map((q) => {
        const topic = rawTopics.find((t) => t.id === q.topicId);
        return {
          ...q,
          topicName: topic ? topic.name : "Unknown Topic",
          colorClass: getTopicColorClass(q.topicId),
        };
      });

      setQuestionsData(mapped);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load lần đầu
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Reset về trang 1 mỗi khi search hoặc filter thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTopic]);

  // Helper: cập nhật số lượng câu hỏi của một topic
  const updateTopicCount = async (topicId: string, delta: number) => {
    const topic = topics.find((t) => t.id === topicId);
    if (!topic) return;
    const newCount = Math.max(0, topic.questionCount + delta);
    await topicApi.update(topicId, { questionCount: newCount });
  };

  const handleOpenAdd = () => {
    setFormData({ ...initialFormState, topicId: topics[0]?.id || "" });
    setIsQuestionModalOpen(true);
  };

  const handleOpenEdit = (question: MappedQuestion) => {
    setFormData({
      id: question.id,
      topicId: question.topicId,
      question: question.question,
      answers: [...question.answers],
      correctAnswer: question.correctAnswer,
    });
    setIsQuestionModalOpen(true);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...formData.answers];
    newAnswers[index] = value;
    setFormData({ ...formData, answers: newAnswers });
  };

  const handleSaveQuestion = async () => {
    if (!formData.question.trim() || formData.answers.some((a) => !a.trim())) {
      alert("Vui lòng điền đầy đủ câu hỏi và 4 đáp án!");
      return;
    }

    try {
      setIsSubmitting(true);
      const isEditing = !!formData.id;

      if (isEditing) {
        const oldQuestion = questionsData.find((q) => q.id === formData.id);
        const oldTopicId = oldQuestion?.topicId;
        const newTopicId = formData.topicId;

        await questionApi.update(formData.id, formData);

        if (oldTopicId && oldTopicId !== newTopicId) {
          await updateTopicCount(oldTopicId, -1);
          await updateTopicCount(newTopicId, +1);
        }
      } else {
        const newId = `q${Date.now()}`;
        await questionApi.create({ ...formData, id: newId });
        await updateTopicCount(formData.topicId, +1);
      }

      await fetchData();
      setIsQuestionModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
      alert("Có lỗi xảy ra khi lưu câu hỏi!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenDelete = (id: string) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      setIsSubmitting(true);
      const questionToDelete = questionsData.find((q) => q.id === deletingId);
      if (questionToDelete) {
        await questionApi.remove(deletingId);
        await updateTopicCount(questionToDelete.topicId, -1);
      } else {
        await questionApi.remove(deletingId);
      }
      
      await fetchData();
      
      // Kiểm tra xem trang hiện tại còn dữ liệu không sau khi xóa
      const newFilteredLength = filteredQuestions.length - 1;
      const maxPage = Math.ceil(newFilteredLength / ITEMS_PER_PAGE);
      if (currentPage > maxPage && maxPage > 0) {
        setCurrentPage(maxPage);
      }
      
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      alert("Có lỗi xảy ra khi xóa!");
    } finally {
      setIsSubmitting(false);
      setDeletingId(null);
    }
  };

  // 1. Lọc dữ liệu
  const filteredQuestions = questionsData.filter((q) => {
    const matchesSearch = q.question
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTopic =
      selectedTopic === "All Topics" || q.topicName === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  // 2. Tính toán phân trang dựa trên dữ liệu đã lọc
  const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // Dữ liệu cắt ra để hiển thị trên bảng
  const currentQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Questions Bank
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your quiz questions and answer bank
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-primary/25 w-full sm:w-auto"
        >
          <Plus size={20} />
          <span>Add New Question</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col lg:flex-row gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
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
            {topics.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
          <button className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary rounded-xl transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Table & Pagination Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[400px]">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider w-1/2">
                  Question Text
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                  Related Topic
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                  Answers
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
                    <p className="text-sm text-slate-500">
                      Loading questions...
                    </p>
                  </td>
                </tr>
              ) : currentQuestions.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No questions found.
                  </td>
                </tr>
              ) : (
                // Lặp qua mảng currentQuestions (đã cắt theo trang)
                currentQuestions.map((q) => (
                  <tr
                    key={q.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <HelpCircle
                          size={18}
                          className="text-primary mt-0.5 shrink-0"
                        />
                        <p className="text-sm font-medium text-slate-900 dark:text-white leading-relaxed line-clamp-2">
                          {q.question}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${q.colorClass}`}
                      >
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

        {/* Gọi component Pagination ở đây */}
        {!isLoading && filteredQuestions.length > 0 && (
          <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800/20 border-t border-slate-200 dark:border-slate-800">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredQuestions.length}
              itemsPerPage={ITEMS_PER_PAGE}
              itemName="questions"
            />
          </div>
        )}
      </div>

      {/* Modal Thêm/Sửa */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30 shrink-0">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {formData.id ? "Edit Question" : "Create New Question"}
              </h3>
              <button
                onClick={() => setIsQuestionModalOpen(false)}
                className="p-1.5 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Topic
                </label>
                <select
                  value={formData.topicId}
                  onChange={(e) =>
                    setFormData({ ...formData, topicId: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm text-slate-900 dark:text-white"
                >
                  <option value="" disabled>
                    -- Select a Topic --
                  </option>
                  {topics.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Question Text
                </label>
                <textarea
                  rows={3}
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  placeholder="Enter your question here..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Answers & Correct Option
                </label>
                <div className="space-y-3">
                  {formData.answers.map((ans, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-2 rounded-xl border transition-all ${
                        formData.correctAnswer === index
                          ? "border-primary bg-primary/5 dark:bg-primary/10"
                          : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={formData.correctAnswer === index}
                        onChange={() =>
                          setFormData({ ...formData, correctAnswer: index })
                        }
                        className="w-5 h-5 text-primary focus:ring-primary ml-2 cursor-pointer"
                      />
                      <span className="text-sm font-bold text-slate-500 w-6">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <input
                        type="text"
                        value={ans}
                        onChange={(e) =>
                          handleAnswerChange(index, e.target.value)
                        }
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
                {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                {formData.id ? "Save Changes" : "Create Question"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Xóa */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden text-center p-6">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-400">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Delete Question?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              This action cannot be undone. Are you sure you want to permanently
              delete this question from the bank?
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
                {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;