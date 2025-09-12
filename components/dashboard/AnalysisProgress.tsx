// src/components/AnalysisProgress.tsx
import { useAnalysisProgress } from '@/hooks/useAnalysisProgress';
import { CheckIcon, Circle, XCircleIcon } from 'lucide-react';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface AnalysisProgressProps {
  sessionId: string;
  userId: string;
  url: string;
}

const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ 
  sessionId, 
  userId, 
  url 
}) => {
  const { progress, error, isLoading } = useAnalysisProgress(userId,url,sessionId);
  console.log(progress, error, isLoading)

  if (isLoading && !progress) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Starting analysis...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No progress data available</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Analyzing {url}
        </h2>
        <p className="text-gray-600">Your SEO analysis is in progress</p>
      </div>

      {/* Progress Circle */}
      <div className="flex justify-center mb-8">
        <div style={{ width: 120, height: 120 }}>
          <CircularProgressbar
            value={progress.overallProgress ? progress.overallProgress : 0}
            text={`${progress.overallProgress ? progress.overallProgress : 0}%`}
            styles={buildStyles({
              pathColor: progress.status === 'completed' ? '#10b981' : '#3b82f6',
              textColor: '#1f2937',
              trailColor: '#e5e7eb',
              backgroundColor: '#3b82f6',
            })}
          />
        </div>
      </div>

      {/* Job Status Cards */}
      <div className="space-y-4 mb-6">
        {progress.jobs && progress.jobs.map((job) => (
          <div
            key={job.type}
            className={`p-4 rounded-lg border ${
              job.status === 'completed'
                ? 'bg-green-50 border-green-200'
                : job.status === 'failed'
                ? 'bg-red-50 border-red-200'
                : 'bg-blue-50 border-blue-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  job.status === 'completed' ? 'bg-green-500' :
                  job.status === 'failed' ? 'bg-red-500' :
                  job.status === 'processing' ? 'bg-yellow-500' : 'bg-gray-300'
                }`}></div>
                <span className="font-medium capitalize">{job.type.replace('-', ' ')}</span>
              </div>
              <div className="text-right">
                {job.status === 'processing' && (
                  <div className="flex items-center">
                    <Circle className="text-yellow-500  mr-2"/>
                    <span className="text-sm text-yellow-600">{job.progress}%</span>
                  </div>
                )}
                {job.status === 'completed' && (
                  <CheckIcon className='text-green-600'/>
                )}
                {job.status === 'failed' && (
                  <XCircleIcon className='text-red-600'/>
                )}
              </div>
            </div>
            {job.error && (
              <p className="mt-2 text-xs text-red-600">{job.error}</p>
            )}
          </div>
        ))}
      </div>

      {progress.status === 'completed' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center">
            <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Analysis complete! Redirecting...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisProgress;