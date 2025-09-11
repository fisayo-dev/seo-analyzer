// src/hooks/useAnalysisProgress.ts
"use client"
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api/client';
import axios from 'axios';

interface JobStatus {
  type: 'on-page' | 'content' | 'technical';
  status: 'waiting' | 'processing' | 'completed' | 'failed';
  progress: number;
  error?: string;
}

interface ProgressData {
  sessionId: string;
  userId: string;
  status: 'processing' | 'completed';
  overallProgress: number;
  jobs: JobStatus[];
  isReady: boolean;
}

export const useAnalysisProgress = (sessionId: string, userId: string) => {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchProgress = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/progress/${sessionId}?userId=${encodeURIComponent(userId)}`);
      
      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! status: ${response?.status}`);
      }
      
      const data = await response.data;
      setProgress(data);
      
      // Auto-redirect when complete
      if (data.isReady && data.status === 'completed') {
        // Delay slightly to show 100% completion
        setTimeout(() => {
          router.push(`/analysis/${encodeURIComponent(data.jobs[0]?.jobId || sessionId)}`);
        }, 1000);
      }
    } catch (err) {
      console.error('Progress fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch progress');
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, userId, router]);


  useEffect(() => {
    if (!sessionId || !userId) return;
    
    // Initial fetch
    fetchProgress();
    
    // Poll every 2 seconds
    const interval = setInterval(fetchProgress, 2000);
    
    // Stop polling when complete or unmount
    return () => {
      clearInterval(interval);
    };
  }, [fetchProgress, sessionId, userId]);

  return {
    progress,
    error,
    isLoading,
    refetch: fetchProgress
  };
};