import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { getCurrentUser } from "@/utils/auth";
import { submissionApi } from "@/apis/submissionApi";
import { topicApi } from "@/apis/topicApi";
import type { ApiSubmission, ApiTopic } from "@/types/api.types";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import ProfileHeader from "./components/ProfileHeader";
import StatsSection from "./components/StatsSection";
import SubmissionHistory from "./components/SubmissionHistory";
import UserMenu from "@/components/common/UserMenu";
import { ChartColumnStacked } from "lucide-react";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const user = useMemo(() => getCurrentUser(), []);
  const [submissions, setSubmissions] = useState<ApiSubmission[]>([]);
  const [topics, setTopics] = useState<ApiTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [submissionsRes, topicsRes] = await Promise.all([
          submissionApi.getByUserId(user.id),
          topicApi.getAll(),
        ]);
        setSubmissions(submissionsRes.data);
        setTopics(topicsRes);
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const averageAccuracy =
    submissions.length > 0
      ? submissions.reduce((acc, sub) => acc + sub.scorePercentage, 0) /
        submissions.length
      : 0;

  const totalQuizzes = submissions.length;

  const totalCorrect = submissions.reduce(
    (acc, sub) => acc + sub.totalCorrect,
    0,
  );

  const totalQuestions = submissions.reduce(
    (acc, sub) => acc + sub.totalQuestions,
    0,
  );

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <header className="flex items-center justify-between px-6 py-4 md:px-12 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md z-20 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="size-8 flex items-center justify-center">
            <ChartColumnStacked />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            EduQuiz
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <UserMenu fullName={user?.fullName || null} />
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <ProfileHeader user={user} />
          <StatsSection
            averageAccuracy={averageAccuracy}
            totalQuizzes={totalQuizzes}
            totalCorrect={totalCorrect}
            totalQuestions={totalQuestions}
          />
          <SubmissionHistory submissions={submissions} topics={topics} />
        </div>
      </main>

      <footer className="w-full border-t border-slate-200 dark:border-slate-800 py-8 px-6 md:px-12 bg-white dark:bg-background-dark mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a
              className="text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
              href="#"
            >
              Support
            </a>
            <a
              className="text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
              href="#"
            >
              Terms of Service
            </a>
          </div>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            © 2026 EduQuiz Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
