
const ProfileSkeletonLoader = () => {
  return (
    <div className="max-w-md  p-6 bg-white overflow-hidden">
        <div className="w-100 h-30 bg-gray-200 animate-pulse mb-100"></div>
      {/* Header */}
      <div className="mb-6">
        <div className="h-8 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      {/* Full Name Section */}
      <div className="mb-6">
        <div className="h-4 bg-gray-200 rounded w-16 mb-3 animate-pulse"></div>
        <div className="border border-gray-200 rounded-lg p-3 mb-4">
          <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        {/* Update Button */}
        <div className="flex justify-center">
          <div className="h-10 bg-gray-200 rounded-lg w-20 animate-pulse"></div>
        </div>
      </div>

      {/* Email Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 bg-gray-200 rounded w-10 animate-pulse"></div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-3">
          <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
      </div>

      {/* Date Joined Section */}
      <div>
        <div className="h-4 bg-gray-200 rounded w-20 mb-3 animate-pulse"></div>
        <div className="border border-gray-200 rounded-lg p-3">
          <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <div className="w-12 h-12 bg-gray-800 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProfileSkeletonLoader;