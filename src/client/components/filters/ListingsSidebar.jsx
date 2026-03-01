// src/client/components/filters/DesktopFiltersSidebar.jsx
import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import SearchBar from "./SearchBar";
import PriceRangeSlider from "./PriceRangeSlider";
import AmenitiesFilter from "./AmenitiesFilter";
import useFilterOptions from "../../hooks/useFilterOptions";

const DesktopFiltersSidebar = ({
  filters,
  onFilterChange,
  onClearAll,
  activeFilterCount,
}) => {
  const { options, loading } = useFilterOptions();
  const [selectedCity, setSelectedCity] = useState(filters.city);
  const [availableAreas, setAvailableAreas] = useState([]);

  // Update local state when filters change
  useEffect(() => {
    setSelectedCity(filters.city);
  }, [filters.city]);

  // Update available areas when city changes
  useEffect(() => {
    if (filters.city && options.cities) {
      const city = options.cities.find((c) => c.name === filters.city);
      setAvailableAreas(city?.areas || []);
    } else {
      // When no city selected, show all areas
      const allAreas = options.cities?.flatMap((city) => city.areas) || [];
      setAvailableAreas([...new Set(allAreas)]); // Remove duplicates
    }
  }, [filters.city, options.cities]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    onFilterChange({ [key]: value });
  };

  // Handle numeric select changes
  const handleNumericChange = (e, key) => {
    const value = e.target.value;
    handleFilterChange(key, value || "");
  };

  // Loading state
  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-client-card rounded-xl shadow-sm p-6 sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FaFilter className="text-client-text-secondary" aria-hidden="true" />
          <h2 className="font-semibold text-client-text-primary">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="bg-client-rose text-white text-xs px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm text-client-rose hover:text-client-rose-dark 
                       transition-colors px-2 py-1"
            aria-label="Clear all filters"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filters Content */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div>
          <label className="block text-sm font-medium text-client-text-primary mb-2">
            Search
          </label>
          <SearchBar
            value={filters.search}
            onChange={(value) => handleFilterChange("search", value)}
            placeholder="Search by name..."
          />
        </div>

        {/* City Filter */}
        <div>
          <label className="block text-sm font-medium text-client-text-primary mb-2">
            City
          </label>
          <select
            value={filters.city}
            onChange={(e) => handleFilterChange("city", e.target.value)}
            className="w-full px-3 py-2 border border-client-border rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-client-rose/50
                       bg-client-card text-client-text-primary"
          >
            <option value="">All Cities</option>
            {options.cities?.map((city) => (
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
            className="w-full px-3 py-2 border border-client-border rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-client-rose/50
                       bg-client-card text-client-text-primary"
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
            min={options.priceRange?.min || 0}
            max={options.priceRange?.max || 10000}
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
              className="w-full px-3 py-2 border border-client-border rounded-lg"
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
              className="w-full px-3 py-2 border border-client-border rounded-lg"
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
              className="w-full px-3 py-2 border border-client-border rounded-lg"
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
            options={options.amenities || []}
            selected={filters.amenities}
            onChange={(value) => handleFilterChange("amenities", value)}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopFiltersSidebar;
