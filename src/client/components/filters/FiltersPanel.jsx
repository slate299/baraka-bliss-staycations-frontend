// src/client/components/filters/FiltersPanel.jsx
import { useState, useEffect } from "react";
import { FaFilter, FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import SearchBar from "./SearchBar";
import PriceRangeSlider from "./PriceRangeSlider";
import AmenitiesFilter from "./AmenitiesFilter";
import FilterTag from "./FilterTag";
import useFilterOptions from "../../hooks/useFilterOptions";
import FiltersPanelSkeleton from "./FiltersPanelSkeleton";

const FiltersPanel = ({
  filters,
  onFilterChange,
  onClearAll,
  activeFilterCount,
  isMobile = false,
}) => {
  const { options, loading, error, getAreasByCity } = useFilterOptions();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCity, setSelectedCity] = useState(filters.city);
  const [availableAreas, setAvailableAreas] = useState([]);

  // Update local state when filters change
  useEffect(() => {
    setSelectedCity(filters.city);
  }, [filters.city]);

  // Update available areas when city changes
  useEffect(() => {
    if (filters.city) {
      const areas = getAreasByCity(filters.city);
      setAvailableAreas(areas);
    } else {
      setAvailableAreas(options.areas || []);
    }
  }, [filters.city, getAreasByCity, options.areas]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    onFilterChange({ [key]: value });
  };

  // Handle numeric select changes
  const handleNumericChange = (e, key) => {
    const value = e.target.value;
    handleFilterChange(key, value || "");
  };

  // Toggle mobile panel
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Loading state
  if (loading) {
    return <FiltersPanelSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p className="text-red-600 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 text-sm text-red-600 underline hover:text-red-800"
        >
          Refresh page
        </button>
      </div>
    );
  }

  // Mobile version (simpler, always expanded)
  if (isMobile) {
    return (
      <div className="space-y-6">
        {/* Search Bar - Always on top for mobile */}
        <div className="mb-4">
          <SearchBar
            value={filters.search}
            onChange={(value) => handleFilterChange("search", value)}
            placeholder="Search by name or description..."
          />
        </div>

        {/* Rest of filters in scrollable area */}
        <div className="space-y-6">
          {/* City Filter */}
          <div>
            <label className="block text-sm font-medium text-client-text-primary mb-2">
              City
            </label>
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
              className="w-full px-3 py-3 border border-client-border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-client-rose-DEFAULT/50
                         bg-client-card text-client-text-primary text-base
                         transition-all duration-200 hover:border-client-rose-DEFAULT/50 hover:shadow-sm"
            >
              <option value="">All Cities</option>
              {options.cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* Area Filter */}
          <div>
            <label className="block text-sm font-medium text-client-text-primary mb-2">
              Area
            </label>
            <select
              value={filters.area}
              onChange={(e) => handleFilterChange("area", e.target.value)}
              disabled={!filters.city && availableAreas.length === 0}
              className="w-full px-3 py-3 border border-client-border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-client-rose-DEFAULT/50
                         bg-client-card text-client-text-primary text-base
                         disabled:bg-client-bg disabled:cursor-not-allowed
                         transition-all duration-200 hover:border-client-rose-DEFAULT/50 hover:shadow-sm"
            >
              <option value="">All Areas</option>
              {availableAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-client-text-primary mb-2">
              Price Range (per night)
            </label>
            <PriceRangeSlider
              min={options.priceRange.min}
              max={options.priceRange.max}
              value={filters.priceRange}
              onChange={(value) => handleFilterChange("priceRange", value)}
            />
          </div>

          {/* Bedrooms, Bathrooms, Guests */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-client-text-primary mb-2">
                Beds
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) => handleNumericChange(e, "bedrooms")}
                className="w-full px-3 py-3 border border-client-border rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-client-rose-DEFAULT/50
                           bg-client-card text-client-text-primary text-base
                           transition-all duration-200 hover:border-client-rose-DEFAULT/50 hover:shadow-sm"
              >
                <option value="">Any</option>
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}+
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-client-text-primary mb-2">
                Baths
              </label>
              <select
                value={filters.bathrooms}
                onChange={(e) => handleNumericChange(e, "bathrooms")}
                className="w-full px-3 py-3 border border-client-border rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-client-rose-DEFAULT/50
                           bg-client-card text-client-text-primary text-base
                           transition-all duration-200 hover:border-client-rose-DEFAULT/50 hover:shadow-sm"
              >
                <option value="">Any</option>
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}+
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-client-text-primary mb-2">
                Guests
              </label>
              <select
                value={filters.maxGuests}
                onChange={(e) => handleNumericChange(e, "maxGuests")}
                className="w-full px-3 py-3 border border-client-border rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-client-rose-DEFAULT/50
                           bg-client-card text-client-text-primary text-base
                           transition-all duration-200 hover:border-client-rose-DEFAULT/50 hover:shadow-sm"
              >
                <option value="">Any</option>
                {[2, 4, 6, 8].map((num) => (
                  <option key={num} value={num}>
                    {num}+
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-client-text-primary mb-2">
              Amenities
            </label>
            <AmenitiesFilter
              options={options.amenities}
              selected={filters.amenities}
              onChange={(value) => handleFilterChange("amenities", value)}
            />
          </div>
        </div>
      </div>
    );
  }

  // Desktop version
  return (
    <div className="bg-client-card rounded-lg shadow-sm mb-6">
      {/* Header - Always visible */}
      <div className="p-4 border-b border-client-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaFilter
              className="text-client-text-secondary"
              aria-hidden="true"
            />
            <h2 className="font-semibold text-client-text-primary">Filters</h2>
            {activeFilterCount > 0 && (
              <span className="bg-client-rose-DEFAULT text-white text-xs px-2 py-1 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <button
                onClick={onClearAll}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClearAll();
                  }
                }}
                className="text-sm text-client-rose-DEFAULT hover:text-client-rose-dark 
                           transition-all duration-200
                           hover:scale-105 active:scale-95
                           px-2 py-1"
                aria-label="Clear all filters"
              >
                Clear all
              </button>
            )}

            {/* Desktop expand/collapse */}
            <button
              onClick={toggleExpanded}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleExpanded();
                }
              }}
              className="hidden lg:flex items-center gap-1 text-sm 
                         text-client-text-secondary hover:text-client-text-primary
                         transition-all duration-200 hover:scale-105 active:scale-95"
              aria-expanded={isExpanded}
              aria-controls="filter-sections"
            >
              {isExpanded ? "Show less" : "Show more filters"}
              {isExpanded ? (
                <FaChevronUp
                  size={12}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              ) : (
                <FaChevronDown
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              )}
            </button>

            {/* Mobile toggle button */}
            <button
              onClick={toggleExpanded}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleExpanded();
                }
              }}
              className="lg:hidden p-2 hover:bg-client-bg rounded-lg 
                         transition-all duration-200 hover:scale-110 active:scale-95
                         min-h-[44px] min-w-[44px]"
              aria-label={isExpanded ? "Collapse filters" : "Expand filters"}
            >
              {isExpanded ? (
                <FaChevronUp aria-hidden="true" />
              ) : (
                <FaChevronDown aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar - Always visible */}
        <div className="mt-4">
          <SearchBar
            value={filters.search}
            onChange={(value) => handleFilterChange("search", value)}
            placeholder="Search by name or description..."
          />
        </div>
      </div>

      {/* Expanded Filters - with smooth transition */}
      <div
        id="filter-sections"
        className={`
          transition-all duration-300 ease-in-out
          ${isExpanded ? "block" : "hidden lg:block"}
        `}
      >
        <div className="p-4 space-y-6">
          {/* City Filter */}
          <div>
            <label className="block text-sm font-medium text-client-text-primary mb-2">
              City
            </label>
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              className="w-full px-3 py-2 border border-client-border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-client-rose-DEFAULT/50
                         bg-client-card text-client-text-primary
                         transition-all duration-200 hover:border-client-rose-DEFAULT/50 hover:shadow-sm"
            >
              <option value="">All Cities</option>
              {options.cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* Area Filter */}
          <div>
            <label className="block text-sm font-medium text-client-text-primary mb-2">
              Area
            </label>
            <select
              value={filters.area}
              onChange={(e) => handleFilterChange("area", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              disabled={!filters.city && availableAreas.length === 0}
              className="w-full px-3 py-2 border border-client-border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-client-rose-DEFAULT/50
                         bg-client-card text-client-text-primary
                         disabled:bg-client-bg disabled:cursor-not-allowed
                         transition-all duration-200 hover:border-client-rose-DEFAULT/50 hover:shadow-sm"
            >
              <option value="">All Areas</option>
              {availableAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            {!filters.city && (
              <p className="text-xs text-client-text-secondary mt-1">
                Select a city first to filter by area
              </p>
            )}
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-client-text-primary mb-2">
              Price Range (per night)
            </label>
            <PriceRangeSlider
              min={options.priceRange.min}
              max={options.priceRange.max}
              value={filters.priceRange}
              onChange={(value) => handleFilterChange("priceRange", value)}
            />
          </div>

          {/* Bedrooms, Bathrooms, Guests */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-client-text-primary mb-2">
                Beds
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) => handleNumericChange(e, "bedrooms")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                className="w-full px-3 py-2 border border-client-border rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-client-rose-DEFAULT/50
                           bg-client-card text-client-text-primary
                           transition-all duration-200 hover:border-client-rose-DEFAULT/50 hover:shadow-sm"
              >
                <option value="">Any</option>
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}+
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-client-text-primary mb-2">
                Baths
              </label>
              <select
                value={filters.bathrooms}
                onChange={(e) => handleNumericChange(e, "bathrooms")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                className="w-full px-3 py-2 border border-client-border rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-client-rose-DEFAULT/50
                           bg-client-card text-client-text-primary
                           transition-all duration-200 hover:border-client-rose-DEFAULT/50 hover:shadow-sm"
              >
                <option value="">Any</option>
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}+
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-client-text-primary mb-2">
                Guests
              </label>
              <select
                value={filters.maxGuests}
                onChange={(e) => handleNumericChange(e, "maxGuests")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                className="w-full px-3 py-2 border border-client-border rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-client-rose-DEFAULT/50
                           bg-client-card text-client-text-primary
                           transition-all duration-200 hover:border-client-rose-DEFAULT/50 hover:shadow-sm"
              >
                <option value="">Any</option>
                {[2, 4, 6, 8].map((num) => (
                  <option key={num} value={num}>
                    {num}+
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-client-text-primary mb-2">
              Amenities
            </label>
            <AmenitiesFilter
              options={options.amenities}
              selected={filters.amenities}
              onChange={(value) => handleFilterChange("amenities", value)}
            />
          </div>
        </div>
      </div>

      {/* Apply filters button - Mobile only */}
      <div className="lg:hidden p-4 border-t border-client-border">
        <button
          onClick={toggleExpanded}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleExpanded();
            }
          }}
          className="w-full bg-client-rose-DEFAULT text-white py-3 rounded-lg
                     font-medium transition-all duration-200
                     hover:bg-client-rose-dark hover:scale-[1.02] 
                     active:scale-[0.98] shadow-sm hover:shadow-md
                     min-h-[44px]"
          aria-label={isExpanded ? "Apply filters" : "Show filters"}
        >
          {isExpanded ? "Apply Filters" : "Show Filters"}
        </button>
      </div>
    </div>
  );
};

export default FiltersPanel;
