// src/client/components/apartments/ApartmentCardSkeleton.jsx

const ApartmentCardSkeleton = () => {
  return (
    <div className="bg-client-card rounded-xl overflow-hidden shadow-sm border border-client-border">
      {/* Image skeleton with shimmer */}
      <div className="h-48 bg-client-bg relative overflow-hidden">
        <div className="absolute inset-0 animate-shimmer"></div>
      </div>

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded w-3/4 relative overflow-hidden">
          <div className="absolute inset-0 animate-shimmer"></div>
        </div>

        {/* Location */}
        <div className="h-4 bg-gray-200 rounded w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 animate-shimmer"></div>
        </div>

        {/* Price and details */}
        <div className="flex justify-between items-center pt-2">
          <div className="h-8 bg-gray-200 rounded w-24 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer"></div>
          </div>
          <div className="flex gap-3">
            <div className="h-6 w-6 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>
            <div className="h-6 w-6 bg-gray-200 rounded relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCardSkeleton;
