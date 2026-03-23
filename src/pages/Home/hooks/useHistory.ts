import { useState, useEffect } from "react";
import { submissionApi } from "@/apis/submissionApi";
import { topicApi } from "@/apis/topicApi";
import type { HistoryItem } from "../types/home.types";
import type { ApiSubmission, ApiTopic } from "@/types/api.types";

export const useHistory = (userId: string) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);

        const submissionsRes = await submissionApi.getByUserId(userId);
        const submissions = submissionsRes.data as ApiSubmission[];

        const topics = (await topicApi.getAll()) as ApiTopic[];
        const topicMap = new Map(topics.map((t) => [t.id, t]));

        const enriched: HistoryItem[] = submissions.map((sub) => {
          const topic = topicMap.get(sub.topicId);
          return {
            ...sub,
            topicName: topic?.name || "Unknown",
            abridger: topic?.abridger || "?",
          };
        });

        setHistory(enriched);
      } catch (err) {
        setError("Failed to load history");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [userId]);

  return { history, loading, error };
};
