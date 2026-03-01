// src/client/hooks/useFilterOptions.js

import { useState, useEffect, useCallback } from "react";
import { getFilterOptions } from "../../services/clientApi";
import { handleApiError } from "../utils/errorHandler";

const useFilterOptions = () => {
  const [options, setOptions] = useState({
    cities: [], // [{ name: "Nairobi", areas: ["Kilimani", "Westlands"] }]
    areas: [], // Flat list of all areas
    priceRange: { min: 0, max: 10000 },
    amenities: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch filter options from API
  const fetchOptions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getFilterOptions();

      if (response.success && response.data) {
        setOptions({
          cities: response.data.cities || [],
          areas: response.data.areas || [],
          priceRange: response.data.priceRange || { min: 0, max: 10000 },
          amenities: response.data.amenities || [],
        });
      }
    } catch (err) {
      const errorInfo = handleApiError(err, {
        network: "Unable to load filter options. Please refresh the page.",
      });
      setError(errorInfo.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load options on mount
  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  // Get areas for a specific city
  const getAreasByCity = useCallback(
    (cityName) => {
      if (!cityName) return [];

      const city = options.cities.find((c) => c.name === cityName);
      return city?.areas || [];
    },
    [options.cities],
  );

  // Format price for display
  const formatPrice = useCallback((price) => {
    return `KSh ${price.toLocaleString()}`;
  }, []);

  return {
    options,
    loading,
    error,
    refresh: fetchOptions,
    getAreasByCity,
    formatPrice,
  };
};

export default useFilterOptions;
