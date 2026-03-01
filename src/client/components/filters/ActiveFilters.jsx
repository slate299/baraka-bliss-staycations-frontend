// src/client/components/filters/ActiveFilters.jsx
import FilterTag from "./FilterTag";

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll }) => {
  // Generate display labels for active filters
  const getActiveFiltersList = () => {
    const activeFilters = [];

    // Search
    if (filters.search) {
      activeFilters.push({
        key: "search",
        label: `"${filters.search}"`,
        type: "search",
      });
    }

    // City
    if (filters.city) {
      activeFilters.push({
        key: "city",
        label: filters.city,
        type: "city",
      });
    }

    // Area
    if (filters.area) {
      activeFilters.push({
        key: "area",
        label: filters.area,
        type: "city",
      });
    }

    // Price Range
    if (filters.priceRange.min > 0 || filters.priceRange.max < 10000) {
      activeFilters.push({
        key: "priceRange",
        label: `KSh ${filters.priceRange.min.toLocaleString()} - ${filters.priceRange.max.toLocaleString()}`,
        type: "price",
      });
    }

    // Bedrooms
    if (filters.bedrooms) {
      activeFilters.push({
        key: "bedrooms",
        label: `${filters.bedrooms} Bedroom${filters.bedrooms > 1 ? "s" : ""}`,
        type: "default",
      });
    }

    // Bathrooms
    if (filters.bathrooms) {
      activeFilters.push({
        key: "bathrooms",
        label: `${filters.bathrooms} Bathroom${filters.bathrooms > 1 ? "s" : ""}`,
        type: "default",
      });
    }

    // Max Guests
    if (filters.maxGuests) {
      activeFilters.push({
        key: "maxGuests",
        label: `Up to ${filters.maxGuests} Guests`,
        type: "default",
      });
    }

    // Amenities (show count instead of list)
    if (filters.amenities.length > 0) {
      activeFilters.push({
        key: "amenities",
        label: `${filters.amenities.length} Amenit${filters.amenities.length > 1 ? "ies" : "y"}`,
        type: "amenity",
      });
    }

    return activeFilters;
  };

  const activeFilters = getActiveFiltersList();

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm text-client-text-secondary">
        Active filters:
      </span>

      {activeFilters.map((filter) => (
        <FilterTag
          key={filter.key}
          label={filter.label}
          type={filter.type}
          onRemove={() => onRemoveFilter(filter.key)}
        />
      ))}

      <button
        onClick={onClearAll}
        className="text-sm text-client-rose hover:text-client-rose/80 
                   transition-colors ml-2 underline underline-offset-2"
      >
        Clear all
      </button>
    </div>
  );
};

export default ActiveFilters;
