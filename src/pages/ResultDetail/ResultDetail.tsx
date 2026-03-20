import React from "react";
import { useSearchParams } from "react-router";
import Header from "../Home/components/Header";
import SummaryCard from "./components/SummaryCard";
import AnswerReview from "./components/AnswerReview";
import MobileStickyBar from "./components/MobileStickyBar";
import LoadingState from "./components/LoadingState";
import ErrorState from "../common/ErrorState";
import { useResultData } from "./hooks/useResultData";
import { mockUser } from "./mockData/resultData";

const ResultDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const resultId = searchParams.get("id") || "default-result-id";
  const { result, loading, error } = useResultData(resultId);

  // Sử dụng mock user data - có thể thay bằng props hoặc context sau này
  const user = mockUser;

  if (loading) {
    return <LoadingState />;
  }

  if (error || !result) {
    return <ErrorState message={error || "Result not found"} />;
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <div className="layout-container flex h-full grow flex-col">
        <Header user={user} />
        <main className="flex-1 flex flex-col items-center py-8 px-4 md:px-10">
          <div className="w-full max-w-4xl space-y-8">
            <SummaryCard result={result} />
            <AnswerReview questions={result.questions} />
          </div>
        </main>

        <MobileStickyBar topicId={result.topicId} />
      </div>
    </div>
  );
};

export default ResultDetail;
