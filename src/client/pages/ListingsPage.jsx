// src/client/pages/ListingsPage.jsx
import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ApartmentGrid from "../components/apartments/ApartmentGrid";
import DesktopFiltersSidebar from "../components/filters/DesktopFiltersSidebar";
import ActiveFilters from "../components/filters/ActiveFilters";
import MobileFilterDrawer from "../components/filters/MobileFilterDrawer";
import Pagination from "../components/listings/Pagination";
import LiveRegion from "../components/common/LiveRegion";
import SearchBar from "../components/filters/SearchBar";
import { getPublicApartments } from "../../services/clientApi";
import { handleApiError } from "../utils/errorHandler";
import useFilters from "../hooks/useFilters";
import { FaFilter } from "react-icons/fa";

const ListingsPage = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [retryCount, setRetryCount] = useState(0);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  // Screen reader announcements
  const [announcement, setAnnouncement] = useState("");

  // Use our filters hook
  const {
    filters,
    activeFilterCount,
    updateFilter,
    removeFilter,
    clearAllFilters,
    getApiParams,
  } = useFilters();

  // Fetch apartments with filters and pagination
  const fetchApartments = async (page = currentPage) => {
    try {
      setLoading(true);
      setError(null);
      setAnnouncement("Loading apartments...");

      // Get API params from filters and add pagination
      const params = {
        ...getApiParams(),
        page,
        limit: 9, // Show 9 apartments per page
      };

      const response = await getPublicApartments(params);

      setApartments(response.data || []);
      setTotalCount(response.total || 0);
      setTotalPages(response.pages || 1);
      setCurrentPage(response.page || 1);

      // Announce results
      if (response.data.length === 0) {
        setAnnouncement("No apartments found matching your criteria");
      } else {
        setAnnouncement(
          `Found ${response.total} apartments. Page ${response.page} of ${response.pages}`,
        );
      }
    } catch (err) {
      const errorInfo = handleApiError(err, {
        network: "Unable to load apartments. Please check your connection.",
      });
      setError(errorInfo.message);
      setAnnouncement("Error loading apartments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch when filters change or retry count changes
  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when filters change
    fetchApartments(1);
  }, [retryCount, filters]);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchApartments(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top when page changes
    setAnnouncement(`Loading page ${newPage} of ${totalPages}`);
  };

  // Announce filter changes
  useEffect(() => {
    if (activeFilterCount > 0) {
      setAnnouncement(
        `${activeFilterCount} filters applied. ${totalCount} apartments found.`,
      );
    }
  }, [activeFilterCount, totalCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    setAnnouncement("Retrying...");
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    const key = Object.keys(newFilters)[0];
    const value = Object.values(newFilters)[0];
    updateFilter(key, value);

    // Announce which filter changed
    if (key === "search" && value) {
      setAnnouncement(`Searching for: ${value}`);
    } else if (key === "city" && value) {
      setAnnouncement(`Filtering by city: ${value}`);
    } else if (key === "priceRange") {
      setAnnouncement(`Price range updated`);
    }
  };

  const handleRemoveFilter = (key) => {
    removeFilter(key);
    setAnnouncement(`Filter removed`);
  };

  const handleClearAll = () => {
    clearAllFilters();
    setAnnouncement("All filters cleared");
  };

  return (
    <div className="min-h-screen bg-client-bg flex flex-col">
      <Navbar />

      {/* Screen reader live region */}
      <LiveRegion message={announcement} />

      <main id="main-content" className="flex-1 container mx-auto px-4 py-8">
        {/* Header with title and mobile filter button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Available Staycations
          </h1>

          {/* Mobile filter button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-client-card 
                       border border-client-border rounded-lg px-4 py-2
                       text-client-text-primary hover:bg-client-bg
                       transition-colors"
            aria-label="Open filters"
            aria-expanded={isMobileFilterOpen}
          >
            <FaFilter className="text-client-rose" aria-hidden="true" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span
                className="bg-client-rose text-white text-xs px-2 py-1 rounded-full"
                aria-label={`${activeFilterCount} filters active`}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
        {/* 👇 ADD THIS - Enhanced Search Bar */}
        <div className="mb-8">
          <SearchBar
            value={filters.search}
            onChange={(value) => updateFilter("search", value)}
            placeholder="Search apartments by name, city, or area..."
          />
        </div>
        {/* Two-column layout for desktop */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters - Hidden on mobile */}
          <aside className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-20">
              <DesktopFiltersSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAll}
                activeFilterCount={activeFilterCount}
              />
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Result count and active filters */}
            <div className="mb-4">
              {!loading && !error && (
                <p className="text-client-text-secondary text-sm mb-2">
                  Showing{" "}
                  <span className="font-medium text-client-text-primary">
                    {apartments.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-client-text-primary">
                    {totalCount}
                  </span>{" "}
                  apartments
                  {activeFilterCount > 0 && " with filters applied"}
                </p>
              )}

              {/* Active Filters Tags */}
              <ActiveFilters
                filters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearAll}
              />
            </div>

            {/* Apartment Grid */}
            <ApartmentGrid
              apartments={apartments}
              loading={loading}
              error={error}
              onRetry={handleRetry}
              totalCount={totalCount}
              activeFilterCount={activeFilterCount}
              onClearFilters={handleClearAll}
            />

            {/* Pagination */}
            {!loading && !error && apartments.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>{" "}
        {/* ← This closes the two-column div */}
        {/* Mobile Filter Drawer */}
        <MobileFilterDrawer
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
          activeFilterCount={activeFilterCount}
        />
      </main>

      <Footer />
    </div>
  );
};

export default ListingsPage;
