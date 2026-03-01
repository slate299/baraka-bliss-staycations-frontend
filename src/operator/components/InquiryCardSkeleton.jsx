// src/components/InquiryCardSkeleton.jsx
import React from "react";

const InquiryCardSkeleton = () => {
  // Create an array of 3 cards for skeleton
  const skeletonCards = Array(3).fill(null);

  return (
    <div className="md:hidden space-y-4 animate-pulse">
      {skeletonCards.map((_, index) => (
        <div key={index} className="bg-[#2C2C2C] rounded-lg p-4 relative">
          {/* Checkbox skeleton */}
          <div className="absolute top-4 left-4">
            <div className="w-4 h-4 bg-gray-600 rounded"></div>
          </div>

          {/* Header */}
          <div className="flex justify-between items-start mb-3 ml-8">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-600 rounded"></div>
              <div className="h-5 bg-gray-600 rounded w-32"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-600 rounded-lg"></div>
              <div className="w-8 h-8 bg-gray-600 rounded-lg"></div>
              <div className="w-8 h-8 bg-gray-600 rounded-lg"></div>
            </div>
          </div>

          {/* Guest Info */}
          <div className="space-y-2 mb-3 ml-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-600 rounded w-24"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-600 rounded w-32"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-600 rounded w-28"></div>
            </div>
          </div>

          {/* Message Preview */}
          <div className="bg-[#383838] rounded-lg p-3 ml-8">
            <div className="h-4 bg-gray-600 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-600 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InquiryCardSkeleton;
