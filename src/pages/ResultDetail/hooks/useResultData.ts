import { useState, useEffect } from "react";
import { submissionApi } from "@/apis/submissionApi";
import { questionApi } from "@/apis/questionApi";
import { topicApi } from "@/apis/topicApi";
import type { QuizResult, Question } from "../types/result.types";
import type { ApiSubmission, ApiTopic, ApiQuestion } from "@/types/api.types";

export const useResultData = (resultId: string) => {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      if (!resultId) {
        setError("No result ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const submissionRes = await submissionApi.getById(resultId);
        const submission = submissionRes.data as ApiSubmission;

        const topics = (await topicApi.getAll()) as ApiTopic[];
        const topic = topics.find((t) => t.id === submission.topicId);

        const questionsRes = await questionApi.getByTopicId(submission.topicId);
        const questionsData = questionsRes.data as ApiQuestion[];

        const questions: Question[] = questionsData.map((q, idx) => {
          const userAnswerIndex = submission.answers?.find(
            (a) => a.questionId === q.id,
          )?.selectedAnswer;
          const userAnswer =
            userAnswerIndex !== undefined ? q.answers[userAnswerIndex] : "";
          const correctAnswer = q.answers[q.correctAnswer];
          const isCorrect = userAnswerIndex === q.correctAnswer;

          return {
            id: parseInt(q.id.replace("q", ""), 10),
            questionNumber: idx + 1,
            question: q.question,
            options: q.answers,
            correctAnswer,
            userAnswer,
            isCorrect,
          };
        });

        const totalCorrect = questions.filter((q) => q.isCorrect).length;
        const score = Math.round((totalCorrect / questions.length) * 100);

        const resultData: QuizResult = {
          id: submission.id,
          userId: submission.userId,
          topicId: submission.topicId,
          topicName: topic?.name || "Unknown",
          score,
          totalCorrect,
          totalQuestions: questions.length,
          totalTime: "N/A",
          completedAt: submission.submittedAt,
          questions,
        };

        setResult(resultData);
      } catch (err) {
        setError("Failed to load result");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [resultId]);

  return { result, loading, error };
};
