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

interface analysis {
  on_page: string;
  content: string;
  technical: string;
}

interface ProgressData {
  userId: string;
  url: string;
  status: 'processing' | 'completed';
  overallProgress: number;
  jobs: JobStatus[];
  isReady: boolean;
  analysis?: analysis; // Add if you want results here
}

export const useAnalysisProgress = (userId: string, url: string, sessionId: string) => { // Add sessionId if needed for redirect
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchProgress = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const encodedUrl = encodeURIComponent(url);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/result/${encodeURIComponent(userId)}/${encodedUrl}`);
      
      // if (!response || response.status < 200 || response.status >= 300) {
      //   throw new Error(`HTTP error! status: ${response?.status}`);
      // }
      
      const data = await response.json()
      
      // Map DB data to job statuses (assume no 'failed' detection; add if you have error columns)
      const jobs: JobStatus[] = [
        { type: 'on-page', status: data?.analysis?.on_page ? 'completed' : 'processing', progress: data?.analysis?.on_page ? 100 : 0 },
        { type: 'content', status: data?.analysis?.content ? 'completed' : 'processing', progress: data?.analysis?.content ? 100 : 0 },
        { type: 'technical', status: data?.analysis?.technical ? 'completed' : 'processing', progress: data?.analysis?.technical ? 100 : 0 }
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
        analysis: data.analysis
      };

      setProgress(mappedData);
      
      if (allCompleted) {
        setTimeout(() => {
          router.push(`/analysis/${encodeURIComponent(sessionId)}`); // Adjust path
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
    const interval = setInterval(fetchProgress, 2000);
    return () => clearInterval(interval);
  }, [fetchProgress, userId, url]);

  return {
    progress,
    error,
    isLoading,
    refetch: fetchProgress
  };
};