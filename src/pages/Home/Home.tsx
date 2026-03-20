import React from "react";
import Header from "./components/Header";
import TopicsSection from "./components/TopicsSection";
import HistorySection from "./components/HistorySection";
import Footer from "./components/Footer";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { useTopics } from "./hooks/useTopics";
import { useHistory } from "./hooks/useHistory";
import { getCurrentUser } from "@/utils/auth";

const Home: React.FC = () => {
  const user = getCurrentUser();
  const { topics, loading: topicsLoading, error: topicsError } = useTopics();
  const {
    history,
    loading: historyLoading,
    error: historyError,
  } = useHistory(user?.id || "");

  const loading = topicsLoading || historyLoading;
  const error = topicsError || historyError;

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <Header user={user} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TopicsSection topics={topics} />
        <HistorySection history={history} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
