import React from 'react';

const SkeletonBox = ({ className = "", animate = true }) => (
  <div className={`bg-gray-200 rounded ${animate ? 'animate-pulse' : ''} ${className}`}></div>
);

const SkeletonCircle = ({ size = "w-12 h-12", animate = true }) => (
  <div className={`bg-gray-200 rounded-full ${animate ? 'animate-pulse' : ''} ${size}`}></div>
);

const MetricCardSkeleton = () => (
  <div className="bg-white rounded-lg p-6 shadow-sm border">
    <div className="flex items-center space-x-3 mb-4">
      <SkeletonCircle size="w-8 h-8" />
    </div>
    <SkeletonBox className="h-8 w-12 mb-2" />
    <SkeletonBox className="h-4 w-24" />
  </div>
);

const ChartBarSkeleton = ({ width, height = "h-6" }: {width: string, height: string}) => (
  <div className="flex items-end space-x-2 mb-3">
    <SkeletonBox className={`${height} ${width}`} />
    <SkeletonBox className="h-4 w-16" />
    <div className="flex-1"></div>
    <SkeletonBox className="h-4 w-12" />
  </div>
);

const RecentAnalysisItemSkeleton = () => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex-1 mr-4">
      <SkeletonBox className="h-4 w-48 mb-2" />
    </div>
    <div className="flex items-center space-x-3">
      <SkeletonBox className="h-6 w-12 rounded-full" />
      <SkeletonBox className="h-4 w-16" />
    </div>
  </div>
);

const SEODashboardLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <SkeletonBox className="h-8 w-32 mb-2" />
            <SkeletonBox className="h-5 w-80" />
          </div>
          <SkeletonBox className="h-10 w-32 rounded-lg" />
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Distribution Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <SkeletonBox className="h-6 w-32" />
              <SkeletonBox className="h-4 w-20" />
            </div>
            
            <div className="space-y-6">
              <ChartBarSkeleton width="w-24" height="h-4" />
              <ChartBarSkeleton width="w-96" height="h-4" />
              <ChartBarSkeleton width="w-12" height="h-4" />
            </div>
          </div>

          {/* Recent Analysis */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <SkeletonBox className="h-6 w-28" />
              <SkeletonCircle size="w-5 h-5" />
            </div>
            
            <div className="space-y-1 overflow-hidden">
              <RecentAnalysisItemSkeleton />
              <RecentAnalysisItemSkeleton />
              <RecentAnalysisItemSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEODashboardLoading;