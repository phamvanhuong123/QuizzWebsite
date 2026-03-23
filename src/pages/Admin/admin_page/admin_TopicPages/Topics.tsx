import React, { useState, useEffect, useMemo } from "react";
import { topicApi } from "@/apis/topicApi";
import type { ApiTopic } from "@/types/api.types";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import TopicTable from "./components/TopicTable";
import TopicFormModal from "./components/TopicFormModal";
import Pagination from "@/components/common/Pagination";

const Topics: React.FC = () => {
  const [topics, setTopics] = useState<ApiTopic[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<ApiTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<ApiTopic | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const data = await topicApi.getAll();
      const sortedData = data.sort((a, b) => b.questionCount - a.questionCount);
      setTopics(sortedData);
      setError(null);
    } catch {
      setError("Failed to load topics. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    let filtered = topics;
    if (searchTerm) {
      filtered = filtered.filter((topic) =>
        topic.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    if (filterStatus !== "all") {
      filtered = filtered.filter((topic) => {
        const status = topic.questionCount > 0 ? "Active" : "Draft";
        return status === filterStatus;
      });
    }
    setFilteredTopics(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterStatus, topics]);

  const paginatedTopics = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTopics.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTopics, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredTopics.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handlers
  const handleAdd = () => {
    setEditingTopic(null);
    setModalOpen(true);
  };

  const handleEdit = (topic: ApiTopic) => {
    setEditingTopic(topic);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this topic?")) return;
    try {
      await topicApi.remove(id);
      fetchTopics();
    } catch {
      alert("Failed to delete topic.");
    }
  };

  const handleSubmit = async (data: Omit<ApiTopic, "id">) => {
    try {
      if (editingTopic) {
        await topicApi.update(editingTopic.id, {
          name: data.name,
          abridger: data.abridger,
          description: data.description,
          durationHours: data.durationHours,
          durationMinutes: data.durationMinutes,
        });
      } else {
        await topicApi.create({
          ...data,
          questionCount: 0,
        });
      }
      setModalOpen(false);
      fetchTopics();
    } catch {
      alert(`Failed to ${editingTopic ? "update" : "create"} topic.`);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="space-y-6">
      <Header onAdd={handleAdd} />
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
      />
      {filteredTopics.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center">
          <p className="text-slate-500 dark:text-slate-400">No topics found.</p>
        </div>
      ) : (
        <>
          <TopicTable
            topics={paginatedTopics}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={filteredTopics.length}
              itemsPerPage={itemsPerPage}
              itemName="topics"
            />
          )}
        </>
      )}
      <TopicFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingTopic}
      />
    </div>
  );
};

export default Topics;
