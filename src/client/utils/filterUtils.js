// src/client/utils/filterUtils.js

/**
 * Utility functions for filter operations
 */

/**
 * Convert filter state to API parameters
 * @param {Object} filters - Current filter state
 * @returns {Object} API query parameters
 */
export const filtersToApiParams = (filters) => {
  const params = {};

  if (filters.search) params.search = filters.search;
  if (filters.city) params.city = filters.city;
  if (filters.area) params.area = filters.area;

  // Only add price filters if they differ from defaults
  if (filters.priceRange?.min > 0) {
    params.minPrice = filters.priceRange.min;
  }
  if (filters.priceRange?.max < 10000) {
    params.maxPrice = filters.priceRange.max;
  }

  if (filters.bedrooms) params.bedrooms = filters.bedrooms;
  if (filters.bathrooms) params.bathrooms = filters.bathrooms;
  if (filters.maxGuests) params.maxGuests = filters.maxGuests;

  if (filters.amenities?.length > 0) {
    params.amenities = filters.amenities.join(",");
  }

  return params;
};

/**
 * Check if a filter has a value (not empty/default)
 * @param {*} value - Filter value
 * @returns {boolean} True if filter has value
 */
export const hasFilterValue = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim() !== "";
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") {
    // For priceRange, check if it's not default
    if (value.min !== undefined && value.max !== undefined) {
      return value.min > 0 || value.max < 10000;
    }
    return Object.keys(value).length > 0;
  }
  return Boolean(value);
};

/**
 * Get human-readable label for a filter
 * @param {string} key - Filter key
 * @param {*} value - Filter value
 * @returns {string} Display label
 */
export const getFilterLabel = (key, value) => {
  switch (key) {
    case "search":
      return `"${value}"`;
    case "city":
      return value;
    case "area":
      return value;
    case "priceRange":
      return `KSh ${value.min.toLocaleString()} - ${value.max.toLocaleString()}`;
    case "bedrooms":
      return `${value} ${value > 1 ? "Bedrooms" : "Bedroom"}`;
    case "bathrooms":
      return `${value} ${value > 1 ? "Bathrooms" : "Bathroom"}`;
    case "maxGuests":
      return `Up to ${value} Guests`;
    case "amenities":
      return `${value.length} ${value.length > 1 ? "Amenities" : "Amenity"}`;
    default:
      return value?.toString() || "";
  }
};

/**
 * Group apartments by city for filter options
 * @param {Array} apartments - List of apartments
 * @returns {Array} Grouped cities with areas
 */
export const groupByCity = (apartments) => {
  const cityMap = new Map();

  apartments.forEach((apt) => {
    if (!cityMap.has(apt.city)) {
      cityMap.set(apt.city, new Set());
    }
    cityMap.get(apt.city).add(apt.area);
  });

  return Array.from(cityMap.entries())
    .map(([city, areas]) => ({
      name: city,
      areas: Array.from(areas).sort(),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Get all unique amenities from apartments
 * @param {Array} apartments - List of apartments
 * @returns {Array} Sorted unique amenities
 */
export const getAllAmenities = (apartments) => {
  const amenitiesSet = new Set();

  apartments.forEach((apt) => {
    apt.amenities?.forEach((amenity) => {
      amenitiesSet.add(amenity);
    });
  });

  return Array.from(amenitiesSet).sort();
};

/**
 * Get min and max prices from apartments
 * @param {Array} apartments - List of apartments
 * @returns {Object} Min and max prices
 */
export const getPriceRange = (apartments) => {
  if (!apartments.length) {
    return { min: 0, max: 10000 };
  }

  const prices = apartments.map((apt) => apt.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

/**
 * Debounce function for search input
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Format filter summary text
 * @param {Object} filters - Current filters
 * @param {number} totalResults - Number of results
 * @param {number} totalAvailable - Total available apartments
 * @returns {string} Summary text
 */
export const getFilterSummary = (filters, totalResults, totalAvailable) => {
  const activeCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "priceRange") {
      return value.min > 0 || value.max < 10000;
    }
    return hasFilterValue(value);
  }).length;

  if (activeCount === 0) {
    return `Showing all ${totalAvailable} apartments`;
  }

  return `Showing ${totalResults} of ${totalAvailable} apartments`;
};
