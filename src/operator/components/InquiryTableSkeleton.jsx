// src/components/InquiryTableSkeleton.jsx
import React from "react";

const InquiryTableSkeleton = () => {
  // Create an array of 5 rows for skeleton
  const skeletonRows = Array(5).fill(null);

  return (
    <div className="hidden md:block bg-[#383838] rounded-lg overflow-hidden animate-pulse">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#2C2C2C]">
            <tr>
              <th className="px-6 py-4 w-12">
                <div className="w-4 h-4 bg-gray-600 rounded"></div>
              </th>
              <th className="px-6 py-4">
                <div className="h-4 bg-gray-600 rounded w-16"></div>
              </th>
              <th className="px-6 py-4">
                <div className="h-4 bg-gray-600 rounded w-20"></div>
              </th>
              <th className="px-6 py-4">
                <div className="h-4 bg-gray-600 rounded w-24"></div>
              </th>
              <th className="px-6 py-4">
                <div className="h-4 bg-gray-600 rounded w-28"></div>
              </th>
              <th className="px-6 py-4">
                <div className="h-4 bg-gray-600 rounded w-32"></div>
              </th>
              <th className="px-6 py-4">
                <div className="h-4 bg-gray-600 rounded w-24"></div>
              </th>
              <th className="px-6 py-4">
                <div className="h-4 bg-gray-600 rounded w-24"></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2C2C2C]">
            {skeletonRows.map((_, index) => (
              <tr key={index} className="hover:bg-[#2C2C2C] transition-colors">
                <td className="px-6 py-4">
                  <div className="w-4 h-4 bg-gray-600 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 bg-gray-600 rounded w-14"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 bg-gray-600 rounded w-14"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 bg-gray-600 rounded w-32"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 bg-gray-600 rounded w-28"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 bg-gray-600 rounded w-40"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 bg-gray-600 rounded w-24"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 bg-gray-600 rounded w-24"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-600 rounded-lg"></div>
                    <div className="w-8 h-8 bg-gray-600 rounded-lg"></div>
                    <div className="w-8 h-8 bg-gray-600 rounded-lg"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquiryTableSkeleton;
