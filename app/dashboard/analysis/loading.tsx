
const SkeletonLoader = () => {
  return (
    <div className="app-container p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="h-8 bg-gray-300 rounded w-64 mb-2 animate-pulse"></div>
        <div className="h-5 bg-gray-200 rounded w-96 animate-pulse"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Analysis Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="h-12 bg-gray-300 rounded w-16 mb-2 animate-pulse"></div>
        </div>

        {/* Good Analysis Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="w-8 h-8 bg-green-200 rounded-full animate-pulse"></div>
          </div>
          <div className="h-12 bg-green-300 rounded w-8 mb-2 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>

        {/* Moderate Analysis Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
            <div className="w-8 h-8 bg-yellow-200 rounded-full animate-pulse"></div>
          </div>
          <div className="h-12 bg-yellow-300 rounded w-12 mb-2 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>

        {/* Poor Analysis Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="w-8 h-8 bg-red-200 rounded-full animate-pulse"></div>
          </div>
          <div className="h-12 bg-red-300 rounded w-8 mb-2 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded-lg w-24 animate-pulse"></div>
        <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Analysis Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* First Analysis Item */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
            <div className="w-12 h-8 bg-yellow-200 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-8 bg-blue-200 rounded w-24 animate-pulse"></div>
          </div>
        </div>

        {/* Second Analysis Item */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 bg-gray-300 rounded w-20 animate-pulse"></div>
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-52 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
            <div className="w-12 h-8 bg-yellow-200 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-8 bg-blue-200 rounded w-24 animate-pulse"></div>
          </div>
        </div>

        {/* Additional skeleton items */}
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 bg-gray-300 rounded w-28 animate-pulse"></div>
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-44 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
              <div className="w-12 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default SkeletonLoader;