// src/client/components/filters/FiltersPanelSkeleton.jsx

const FiltersPanelSkeleton = () => {
  return (
    <div className="bg-client-card rounded-lg shadow-sm mb-6">
      {/* Header */}
      <div className="p-4 border-b border-client-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>
            <div className="h-6 w-16 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>
          </div>
          <div className="w-20 h-8 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer"></div>
          </div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="mt-4">
          <div className="h-10 w-full bg-gray-200 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Filter Sections */}
      <div className="p-4 space-y-6">
        {/* City Filter */}
        <div>
          <div className="h-4 w-12 bg-gray-200 rounded mb-2 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer"></div>
          </div>
          <div className="h-10 w-full bg-gray-200 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer"></div>
          </div>
        </div>

        {/* Area Filter */}
        <div>
          <div className="h-4 w-12 bg-gray-200 rounded mb-2 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer"></div>
          </div>
          <div className="h-10 w-full bg-gray-200 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer"></div>
          </div>
        </div>

        {/* Price Range */}
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer"></div>
          </div>
          <div className="h-8 w-full bg-gray-200 rounded-lg mb-2 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-1/2 bg-gray-200 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>
            <div className="h-10 w-1/2 bg-gray-200 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Bed/Bath/Guests Grid */}
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 bg-gray-200 rounded-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>
          ))}
        </div>

        {/* Amenities */}
        <div>
          <div className="h-4 w-20 bg-gray-200 rounded mb-2 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer"></div>
          </div>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-8 w-full bg-gray-200 rounded-lg relative overflow-hidden"
              >
                <div className="absolute inset-0 animate-shimmer"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersPanelSkeleton;
