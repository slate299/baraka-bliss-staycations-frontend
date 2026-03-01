// src/client/components/filters/FilterTag.jsx
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

const FilterTag = ({ label, onRemove, type = "default" }) => {
  const [isExiting, setIsExiting] = useState(false);

  // Different color schemes based on filter type
  const getTypeStyles = () => {
    switch (type) {
      case "city":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "price":
        return "bg-green-100 text-green-700 border-green-200";
      case "amenity":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "search":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-client-rose-light/10 text-client-rose-DEFAULT border-client-rose-light/20";
    }
  };

  const handleRemove = () => {
    setIsExiting(true);
    // Wait for exit animation to complete before actually removing
    setTimeout(() => {
      onRemove();
    }, 200);
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-3 py-1 
        rounded-full text-sm font-medium
        border ${getTypeStyles()}
        transition-all duration-200 ease-out
        animate-scaleIn
        group hover:shadow-sm hover:-translate-y-0.5
        ${isExiting ? "opacity-0 scale-0" : "opacity-100 scale-100"}
      `}
    >
      <span className="max-w-[200px] truncate">{label}</span>

      <button
        onClick={handleRemove}
        className="ml-1 p-0.5 rounded-full 
                   transition-all duration-200
                   hover:bg-white/50 hover:scale-110
                   focus:outline-none focus:ring-2 focus:ring-client-rose-DEFAULT/50
                   active:scale-95"
        aria-label="Remove filter"
      >
        <FaTimes
          className="text-xs transition-transform duration-200 
                          group-hover:rotate-90"
        />
      </button>
    </span>
  );
};

export default FilterTag;
