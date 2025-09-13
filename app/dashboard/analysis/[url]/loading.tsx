"use client"
import React from 'react';

const SkeletonLoader = () => {
  const shimmer = "relative overflow-hidden bg-gray-200 rounded before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";
  
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className={`${shimmer} h-8 w-64 mb-2`}></div>
          <div className={`${shimmer} h-4 w-32`}></div>
        </div>
        <div className={`${shimmer} h-10 w-28 rounded-lg`}></div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Overall Score Card */}
        <div className="bg-white rounded-lg border p-6">
          <div className={`${shimmer} w-12 h-12 rounded-full mb-4`}></div>
          <div className={`${shimmer} h-8 w-20 mb-2`}></div>
          <div className={`${shimmer} h-4 w-24`}></div>
        </div>

        {/* Technical SEO Card */}
        <div className="bg-white rounded-lg border p-6">
          <div className={`${shimmer} w-12 h-12 rounded-full mb-4`}></div>
          <div className={`${shimmer} h-8 w-20 mb-2`}></div>
          <div className={`${shimmer} h-4 w-28`}></div>
        </div>

        {/* Content Quality Card */}
        <div className="bg-white rounded-lg border p-6">
          <div className={`${shimmer} w-12 h-12 rounded-full mb-4`}></div>
          <div className={`${shimmer} h-8 w-16 mb-2`}></div>
          <div className={`${shimmer} h-4 w-32`}></div>
        </div>

        {/* On-Page SEO Card */}
        <div className="bg-white rounded-lg border p-6">
          <div className={`${shimmer} w-12 h-12 rounded-full mb-4`}></div>
          <div className={`${shimmer} h-8 w-20 mb-2`}></div>
          <div className={`${shimmer} h-4 w-28`}></div>
        </div>
      </div>

      {/* Technical Analysis Section */}
      <div className="bg-white rounded-lg border p-6">
        <div className={`${shimmer} h-7 w-48 mb-6`}></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Page Speed */}
          <div>
            <div className={`${shimmer} h-6 w-24 mb-4`}></div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className={`${shimmer} h-4 w-20`}></div>
                <div className={`${shimmer} h-4 w-12`}></div>
              </div>
              <div className="flex justify-between items-center">
                <div className={`${shimmer} h-4 w-16`}></div>
                <div className={`${shimmer} h-6 w-16 rounded-full`}></div>
              </div>
            </div>
          </div>

          {/* Mobile Optimization */}
          <div>
            <div className={`${shimmer} h-6 w-36 mb-4`}></div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className={`${shimmer} h-4 w-24`}></div>
                <div className={`${shimmer} h-6 w-12 rounded-full`}></div>
              </div>
              <div className="flex justify-between items-center">
                <div className={`${shimmer} h-4 w-28`}></div>
                <div className={`${shimmer} h-6 w-16 rounded-full`}></div>
              </div>
            </div>
          </div>

          {/* Security & Structure */}
          <div>
            <div className={`${shimmer} h-6 w-40 mb-4`}></div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className={`${shimmer} h-4 w-24`}></div>
                <div className={`${shimmer} h-6 w-12 rounded-full`}></div>
              </div>
              <div className="flex justify-between items-center">
                <div className={`${shimmer} h-4 w-20`}></div>
                <div className={`${shimmer} h-6 w-12 rounded-full`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Issues */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className={`${shimmer} h-5 w-32 mb-3`}></div>
          <div className="flex items-start space-x-2">
            <div className={`${shimmer} w-4 h-4 rounded-full mt-1`}></div>
            <div className={`${shimmer} h-4 w-80`}></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default SkeletonLoader;