// src/components/DashboardSkeleton.jsx
import React from "react";
import ApartmentCardSkeleton from "./ApartmentCardSkeleton";

const DashboardSkeleton = () => {
  // Create array of 6 skeleton cards
  const skeletonCards = Array(6).fill(null);

  return (
    <div className="min-h-screen bg-primary-dark p-5">
      {/* Header skeleton */}
      <div className="mb-6">
        <div className="h-8 bg-gray-600 rounded w-48 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-600 rounded w-64 animate-pulse"></div>
      </div>

      {/* Stats skeleton */}
      <div className="bg-[#383838] rounded-lg p-4 mb-6 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-gray-600 rounded"></div>
          <div className="h-6 bg-gray-600 rounded w-48"></div>
        </div>
      </div>

      {/* Grid of skeleton cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {skeletonCards.map((_, index) => (
          <ApartmentCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
