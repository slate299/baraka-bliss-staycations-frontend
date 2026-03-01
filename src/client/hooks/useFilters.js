// src/client/hooks/useFilters.js

import { useState, useCallback, useMemo, useEffect } from "react";

const useFilters = () => {
  // ======================
  // 1. FILTER STATE
  // ======================
  const [filters, setFilters] = useState({
    search: "",
    city: "",
    area: "",
    priceRange: { min: 0, max: 10000 }, // Will be updated from API
    bedrooms: "",
    bathrooms: "",
    maxGuests: "",
    amenities: [],
  });

  // Track if filters have been modified from default
  const [isFilterActive, setIsFilterActive] = useState(false);

  // ======================
  // 2. UPDATE SINGLE FILTER
  // ======================
  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => {
      // Special handling for dependent filters
      if (key === "city") {
        // Reset area when city changes
        return {
          ...prev,
          city: value,
          area: "", // Reset area
        };
      }

      return {
        ...prev,
        [key]: value,
      };
    });
  }, []);

  // ======================
  // 3. UPDATE MULTIPLE FILTERS
  // ======================
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  // ======================
  // 4. REMOVE SINGLE FILTER
  // ======================
  const removeFilter = useCallback((key) => {
    setFilters((prev) => {
      // Set appropriate default values based on filter type
      switch (key) {
        case "search":
          return { ...prev, search: "" };
        case "city":
          return { ...prev, city: "", area: "" }; // Also clear dependent area
        case "area":
          return { ...prev, area: "" };
        case "priceRange":
          return { ...prev, priceRange: { min: 0, max: 10000 } };
        case "bedrooms":
          return { ...prev, bedrooms: "" };
        case "bathrooms":
          return { ...prev, bathrooms: "" };
        case "maxGuests":
          return { ...prev, maxGuests: "" };
        case "amenities":
          return { ...prev, amenities: [] };
        default:
          return prev;
      }
    });
  }, []);

  // ======================
  // 5. CLEAR ALL FILTERS
  // ======================
  const clearAllFilters = useCallback(() => {
    setFilters({
      search: "",
      city: "",
      area: "",
      priceRange: { min: 0, max: 10000 },
      bedrooms: "",
      bathrooms: "",
      maxGuests: "",
      amenities: [],
    });
  }, []);

  // ======================
  // 6. CHECK IF FILTERS ARE ACTIVE
  // ======================
  useEffect(() => {
    const hasActiveFilters =
      filters.search !== "" ||
      filters.city !== "" ||
      filters.area !== "" ||
      filters.bedrooms !== "" ||
      filters.bathrooms !== "" ||
      filters.maxGuests !== "" ||
      filters.amenities.length > 0 ||
      filters.priceRange.min > 0 ||
      filters.priceRange.max < 10000;

    setIsFilterActive(hasActiveFilters);
  }, [filters]);

  // ======================
  // 7. COUNT ACTIVE FILTERS
  // ======================
  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (filters.search) count++;
    if (filters.city) count++;
    if (filters.area) count++;
    if (filters.bedrooms) count++;
    if (filters.bathrooms) count++;
    if (filters.maxGuests) count++;
    if (filters.amenities.length) count++;
    if (filters.priceRange.min > 0) count++;
    if (filters.priceRange.max < 10000) count++;

    return count;
  }, [filters]);

  // ======================
  // 8. GENERATE API PARAMS
  // ======================
  const getApiParams = useCallback(() => {
    const params = {};

    // Only add filters that have values
    if (filters.search) params.search = filters.search;
    if (filters.city) params.city = filters.city;
    if (filters.area) params.area = filters.area;

    // Price range - only if different from defaults
    if (filters.priceRange.min > 0) {
      params.minPrice = filters.priceRange.min;
    }
    if (filters.priceRange.max < 10000) {
      params.maxPrice = filters.priceRange.max;
    }

    if (filters.bedrooms) params.bedrooms = filters.bedrooms;
    if (filters.bathrooms) params.bathrooms = filters.bathrooms;
    if (filters.maxGuests) params.maxGuests = filters.maxGuests;

    // Convert amenities array to comma-separated string
    if (filters.amenities.length > 0) {
      params.amenities = filters.amenities.join(",");
    }

    return params;
  }, [filters]);

  // ======================
  // 9. FORMAT FILTER FOR DISPLAY (for FilterTag)
  // ======================
  const getFilterDisplay = useCallback(
    (key) => {
      switch (key) {
        case "search":
          return filters.search ? `Search: "${filters.search}"` : null;
        case "city":
          return filters.city ? `City: ${filters.city}` : null;
        case "area":
          return filters.area ? `Area: ${filters.area}` : null;
        case "priceRange":
          if (filters.priceRange.min > 0 || filters.priceRange.max < 10000) {
            return `Price: KSh ${filters.priceRange.min.toLocaleString()} - ${filters.priceRange.max.toLocaleString()}`;
          }
          return null;
        case "bedrooms":
          return filters.bedrooms
            ? `${filters.bedrooms} Bedroom${filters.bedrooms > 1 ? "s" : ""}`
            : null;
        case "bathrooms":
          return filters.bathrooms
            ? `${filters.bathrooms} Bathroom${filters.bathrooms > 1 ? "s" : ""}`
            : null;
        case "maxGuests":
          return filters.maxGuests ? `Up to ${filters.maxGuests} Guests` : null;
        case "amenities":
          return filters.amenities.length
            ? `${filters.amenities.length} Amenit${filters.amenities.length > 1 ? "ies" : "y"}`
            : null;
        default:
          return null;
      }
    },
    [filters],
  );

  return {
    // State
    filters,
    isFilterActive,
    activeFilterCount,

    // Actions
    updateFilter,
    updateFilters,
    removeFilter,
    clearAllFilters,

    // Utilities
    getApiParams,
    getFilterDisplay,
  };
};

export default useFilters;
