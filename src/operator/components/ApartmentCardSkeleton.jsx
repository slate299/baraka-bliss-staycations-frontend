// src/components/ApartmentCardSkeleton.jsx
import React from "react";

const ApartmentCardSkeleton = () => {
  return (
    <div className="bg-[#383838] rounded-lg overflow-hidden shadow-lg animate-pulse card-hover">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-600"></div>

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-6 bg-gray-600 rounded w-3/4"></div>

        {/* Location */}
        <div className="h-4 bg-gray-600 rounded w-1/2"></div>

        {/* Price */}
        <div className="h-5 bg-gray-600 rounded w-1/3"></div>

        {/* Details row */}
        <div className="flex gap-3">
          <div className="h-4 bg-gray-600 rounded w-16"></div>
          <div className="h-4 bg-gray-600 rounded w-16"></div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <div className="h-8 bg-gray-600 rounded w-16"></div>
          <div className="h-8 bg-gray-600 rounded w-16"></div>
          <div className="h-8 bg-gray-600 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCardSkeleton;
