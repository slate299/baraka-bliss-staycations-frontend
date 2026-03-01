// src/client/components/filters/AmenitiesFilter.jsx
import { useState, useEffect } from "react";
import {
  FaWifi,
  FaParking,
  FaSwimmer,
  FaDumbbell,
  FaSnowflake,
  FaTv,
  FaCoffee,
  FaUtensils,
  FaPumpSoap,
  FaFire,
  FaShieldAlt,
  FaDog,
  FaTree,
  FaWater,
  FaMountain,
  FaBed,
  FaTimes,
} from "react-icons/fa";

const AmenitiesFilter = ({ options = [], selected = [], onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAmenities, setFilteredAmenities] = useState(options);

  // Filter amenities based on search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredAmenities(options);
    } else {
      const filtered = options.filter((amenity) =>
        amenity.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredAmenities(filtered);
    }
  }, [searchTerm, options]);

  // Get icon for amenity
  const getAmenityIcon = (amenity) => {
    const iconMap = {
      wifi: FaWifi,
      parking: FaParking,
      pool: FaSwimmer,
      gym: FaDumbbell,
      "air conditioning": FaSnowflake,
      tv: FaTv,
      "coffee maker": FaCoffee,
      kitchen: FaUtensils,
      "washing machine": FaPumpSoap,
      fireplace: FaFire,
      security: FaShieldAlt,
      "pet friendly": FaDog,
      garden: FaTree,
      "beach access": FaWater,
      "mountain view": FaMountain,
      "extra beds": FaBed,
    };

    const key = amenity.toLowerCase();
    for (const [pattern, Icon] of Object.entries(iconMap)) {
      if (key.includes(pattern)) {
        return Icon;
      }
    }

    return FaCoffee;
  };

  const toggleAmenity = (amenity) => {
    const newSelected = selected.includes(amenity)
      ? selected.filter((a) => a !== amenity)
      : [...selected, amenity];
    onChange(newSelected);
  };

  const toggleAll = () => {
    if (selected.length === options.length) {
      onChange([]);
    } else {
      onChange([...options]);
    }
  };

  const getSelectAllText = () => {
    if (selected.length === 0) return "Select All";
    if (selected.length === options.length) return "Deselect All";
    return `Select All (${options.length - selected.length} remaining)`;
  };

  return (
    <div className="space-y-3">
      {/* Header with count and select all */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-client-text-secondary">
          {selected.length} selected
        </span>
        <button
          onClick={toggleAll}
          className="text-client-rose-DEFAULT hover:text-client-rose-dark 
             font-medium transition-all duration-200
             hover:scale-105 active:scale-95
             focus:outline-none focus:ring-2 focus:ring-client-rose-DEFAULT/50 
             rounded px-2 py-1"
        >
          {getSelectAllText()}
        </button>
      </div>

      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search amenities..."
          className="w-full px-3 py-2 pl-8 border border-client-border 
                     rounded-lg focus:outline-none focus:ring-2 
                     focus:ring-client-rose-DEFAULT/50 text-sm"
        />
        <svg
          className="absolute left-2.5 top-2.5 h-4 w-4 text-client-text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-2.5 top-2.5 text-client-text-secondary
             hover:text-client-text-primary
             transition-all duration-200 hover:scale-110
             active:scale-95"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Amenities grid */}
      <div className="max-h-60 overflow-y-auto pr-2 space-y-1">
        {filteredAmenities.length === 0 ? (
          <p className="text-center text-client-text-secondary py-4 text-sm">
            No amenities found
          </p>
        ) : (
          filteredAmenities.map((amenity) => {
            const Icon = getAmenityIcon(amenity);
            const isSelected = selected.includes(amenity);

            return (
              <label
                key={amenity}
                className={`
                  flex items-center gap-3 p-2 rounded-lg cursor-pointer
                  transition-all duration-200
                  ${
                    isSelected
                      ? "bg-client-rose-light/10 border-client-rose-light/30"
                      : "hover:bg-client-bg border-transparent"
                  }
                  border
                `}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleAmenity(amenity)}
                  className="w-4 h-4 text-client-rose-DEFAULT border-client-border 
                           rounded focus:ring-client-rose-DEFAULT/50
                           transition-all duration-200
                           hover:scale-110 hover:shadow-sm
                           checked:scale-105
                           cursor-pointer
                           transform active:scale-95"
                />
                <Icon
                  className={`
                  text-base
                  ${isSelected ? "text-client-rose-DEFAULT" : "text-client-text-secondary"}
                `}
                />
                <span
                  className={`
                  flex-1 text-sm
                  ${isSelected ? "text-client-text-primary font-medium" : "text-client-text-secondary"}
                `}
                >
                  {amenity}
                </span>
                {isSelected && (
                  <span className="text-xs text-client-rose-DEFAULT font-medium animate-scaleIn">
                    ✓
                  </span>
                )}
              </label>
            );
          })
        )}
      </div>

      {/* Selected summary */}
      {selected.length > 0 && (
        <div className="pt-2 border-t border-client-border">
          <div className="flex flex-wrap gap-1">
            {selected.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="text-xs bg-client-rose-light/10 text-client-rose-DEFAULT 
                         px-2 py-1 rounded-full
                         transition-all duration-200 hover:scale-105
                         animate-fadeIn"
              >
                {amenity}
              </span>
            ))}
            {selected.length > 3 && (
              <span className="text-xs text-client-text-secondary px-2 py-1">
                +{selected.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AmenitiesFilter;
