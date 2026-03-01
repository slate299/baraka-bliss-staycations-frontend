// src/client/hooks/useApartments.js
import { useState, useEffect, useCallback } from "react";
import { getPublicApartments } from "../services/clientApi";
import { handleApiError } from "../utils/errorHandler";

const useApartments = (initialFilters = {}) => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);

  const fetchApartments = useCallback(
    async (page = currentPage, filterParams = filters) => {
      try {
        setLoading(true);
        setError(null);

        // Add pagination to filters
        const params = {
          ...filterParams,
          page,
          limit: 9, // Show 9 apartments per page
        };

        const response = await getPublicApartments(params);

        if (response.success) {
          setApartments(response.data || []);
          setTotalCount(response.total || 0);
          setTotalPages(response.pages || 1);
          setCurrentPage(response.page || 1);
        } else {
          setApartments([]);
        }
      } catch (err) {
        const errorInfo = handleApiError(err, {
          network: "Unable to load apartments. Please check your connection.",
        });
        setError(errorInfo.message);
        setApartments([]);
      } finally {
        setLoading(false);
      }
    },
    [filters, currentPage],
  );

  // Fetch when filters or page changes
  useEffect(() => {
    fetchApartments();
  }, [fetchApartments]);

  // Update filters and reset to page 1
  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({});
    setCurrentPage(1);
  }, []);

  // Go to specific page
  const goToPage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // Retry fetching
  const retry = useCallback(() => {
    fetchApartments(currentPage, filters);
  }, [fetchApartments, currentPage, filters]);

  return {
    apartments,
    loading,
    error,
    totalCount,
    totalPages,
    currentPage,
    filters,
    updateFilters,
    clearFilters,
    goToPage,
    retry,
    refetch: fetchApartments,
  };
};

export default useApartments;
