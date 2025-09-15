// src/hooks/useAnalysisProgress.ts
"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface JobStatus {
  type: "on-page" | "content" | "technical";
  status: "processing" | "completed" | "failed" | "waiting" | "not_found";
  progress: number;
  jobId?: string;
  error?: string;
}

interface ProgressData {
  sessionId: string;
  userId: string;
  status: "processing" | "completed";
  overallProgress: number;
  jobs: JobStatus[];
  isReady: boolean;
}

export const useAnalysisProgress = (
  userId: string,
  sessionId: string,
  url:string
) => {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchProgress = useCallback(async () => {
    if (!userId || !sessionId) return;

    try {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/progress/${encodeURIComponent(
          sessionId
        )}?userId=${encodeURIComponent(userId)}`
      );

      if (!response.ok) {
        throw new Error("Oops 😢 we were unable to check your analysis progress.");
      }

      const data: ProgressData = await response.json();
      setProgress(data);

      if (data.isReady) {
      // Hard reload to bypass Next.js cache
      setTimeout(() => {
        window.location.href = `/dashboard/analysis/${encodeURIComponent(url)}`;
      }, 1000);
      }
    } catch (err) {
      console.error("Progress fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch progress");
    } finally {
      setIsLoading(false);
    }
  }, [userId, sessionId, url, router]);

  useEffect(() => {
    if (!userId || !sessionId) return;

    fetchProgress();
    const interval = setInterval(() => {
      if (progress?.isReady) {
        clearInterval(interval);
        return;
      }
      fetchProgress();
    }, 2000);

    return () => clearInterval(interval);
  }, [fetchProgress, userId, sessionId, progress?.isReady]);

  return {
    progress,
    error,
    isLoading,
    refetch: fetchProgress,
  };
};
