import { useState, useEffect } from "react";
import { topicApi } from "@/apis/topicApi";
import type { Topic } from "../types/home.types";

export const useTopics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const topicsData = await topicApi.getAll(); 
        setTopics(topicsData);
      } catch (err) {
        setError("Failed to load topics");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  return { topics, loading, error };
};