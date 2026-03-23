import React from "react";
import StatCard from "./StatCard";
import { Award, BookOpen, CheckCircle } from "lucide-react";

interface StatsSectionProps {
  averageAccuracy: number;
  totalQuizzes: number;
  totalCorrect: number;
  totalQuestions: number;
}

const StatsSection: React.FC<StatsSectionProps> = ({
  averageAccuracy,
  totalQuizzes,
  totalCorrect,
  totalQuestions,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        icon={Award}
        title="Average Accuracy"
        value={`${Math.round(averageAccuracy)}%`}
        trend={`Based on ${totalQuizzes} quizzes`}
        color="primary"
      />
      <StatCard
        icon={BookOpen}
        title="Quizzes Completed"
        value={totalQuizzes.toString()}
        trend="Total submissions"
        color="blue"
      />
      <StatCard
        icon={CheckCircle}
        title="Correct Answers"
        value={`${totalCorrect} / ${totalQuestions}`}
        trend={`${Math.round(totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0)}% correct`}
        color="green"
      />
    </div>
  );
};

export default StatsSection;
