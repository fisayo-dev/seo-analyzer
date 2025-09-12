// src/hooks/useAnalysisProgress.ts
"use client"
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface JobStatus {
  type: 'on-page' | 'content' | 'technical';
  status: 'processing' | 'completed' | 'failed' | 'waiting';
  progress: number;
  error?: string;
}

interface Analysis {
  on_page: string | null;
  content: string | null;
  technical: string | null;
}

interface ProgressData {
  userId: string;
  url: string;
  status: 'processing' | 'completed';
  overallProgress: number;
  jobs: JobStatus[];
  isReady: boolean;
  analysis?: Analysis;
}

export const useAnalysisProgress = (
  userId: string,
  url: string,
  sessionId: string
) => {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchProgress = useCallback(async () => {
    try {
      setIsLoading(true);

      const encodedUrl = encodeURIComponent(url);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/result/${encodeURIComponent(userId)}/${encodedUrl}`
      );

      // Handle "not found" (still processing, not an error)
      if (response.status === 400 || response.status === 404) {
        setProgress({
          userId,
          url,
          status: 'processing',
          overallProgress: 0,
          jobs: [
            { type: 'on-page', status: 'waiting', progress: 0 },
            { type: 'content', status: 'waiting', progress: 0 },
            { type: 'technical', status: 'waiting', progress: 0 },
          ],
          isReady: false,
        });
        return;
      }

      if (!response.ok) {
        throw new Error("Oops we were unable to perform your analysis 😢");
      }

      const data = await response.json();

      const jobs: JobStatus[] = [
        {
          type: 'on-page',
          status: data?.analysis?.on_page ? 'completed' : 'processing',
          progress: data?.analysis?.on_page ? 100 : 0,
        },
        {
          type: 'content',
          status: data?.analysis?.content ? 'completed' : 'processing',
          progress: data?.analysis?.content ? 100 : 0,
        },
        {
          type: 'technical',
          status: data?.analysis?.technical ? 'completed' : 'processing',
          progress: data?.analysis?.technical ? 100 : 0,
        },
      ];

      const allCompleted = data.isComplete;
      const totalProgress = data.progress;

      const mappedData: ProgressData = {
        userId,
        url,
        status: allCompleted ? 'completed' : 'processing',
        overallProgress: totalProgress,
        jobs,
        isReady: allCompleted,
        analysis: data.analysis,
      };

      setProgress(mappedData);

      if (allCompleted) {
        setTimeout(() => {
          router.push(`/analysis/${encodeURIComponent(sessionId)}`);
        }, 1000);
      }
    } catch (err) {
      console.error('Progress fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch progress');
    } finally {
      setIsLoading(false);
    }
  }, [userId, url, sessionId, router]);

  useEffect(() => {
    if (!userId || !url) return;

    fetchProgress();
    const interval = setInterval(() => {
      // Only stop polling if job is done (progress?.isReady)
      if (progress?.isReady) {
        clearInterval(interval);
        return;
      }
      fetchProgress();
    }, 2000);

    return () => clearInterval(interval);
  }, [fetchProgress, userId, url, progress?.isReady]);

  return {
    progress,
    error,
    isLoading,
    refetch: fetchProgress,
  };
};
