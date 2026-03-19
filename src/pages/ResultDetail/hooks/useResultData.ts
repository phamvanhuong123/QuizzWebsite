import { useState, useEffect } from "react";
import type { QuizResult } from "../types/result.types";
import { mockResultData } from "../mockData/resultData";

export const useResultData = (resultId: string) => {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);
      setError(null);

      try {
        // TODO: Thay thế bằng API call thực tế
        // const response = await fetch(`/api/results/${resultId}`);
        // const data = await response.json();

        // Simulate API call with mock data
        await new Promise((resolve) => setTimeout(resolve, 500));
        setResult(mockResultData);
      } catch (err) {
        setError("Failed to fetch result");
        console.error("Error fetching result:", err);
      } finally {
        setLoading(false);
      }
    };

    if (resultId) {
      fetchResult();
    }
  }, [resultId]);

  return { result, loading, error };
};
