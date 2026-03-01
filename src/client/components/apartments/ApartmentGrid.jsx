// src/client/components/apartments/ApartmentGrid.jsx
import ApartmentCard from "./ApartmentCard";
import ApartmentCardSkeleton from "./ApartmentCardSkeleton";
import { FaExclamationTriangle, FaRedo, FaFilter } from "react-icons/fa";

const ApartmentGrid = ({
  apartments = [],
  loading = false,
  error = null,
  onRetry,
  totalCount = 0,
  activeFilterCount = 0,
  onClearFilters,
}) => {
  // Loading state - show 6 skeletons
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <ApartmentCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <FaExclamationTriangle className="text-5xl text-red-400 mx-auto mb-4" />
        <p className="text-client-text-secondary mb-4">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-client-rose text-white rounded-lg 
                       hover:bg-client-rose/90 transition inline-flex items-center gap-2"
          >
            <FaRedo /> Try Again
          </button>
        )}
      </div>
    );
  }

  // Empty state with filters active
  if (!apartments || apartments.length === 0) {
    // If filters are active, show "no matches" message
    if (activeFilterCount > 0) {
      return (
        <div className="text-center py-16">
          <div className="bg-client-rose/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <FaFilter className="text-3xl text-client-rose" />
          </div>
          <h3 className="text-xl font-semibold text-client-text-primary mb-2">
            No matching apartments
          </h3>
          <p className="text-client-text-secondary mb-6 max-w-md mx-auto">
            We couldn't find any apartments that match your current filters. Try
            adjusting your search criteria or clear some filters.
          </p>
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="px-6 py-2 bg-client-rose text-white rounded-lg 
                         hover:bg-client-rose/90 transition inline-flex items-center gap-2"
            >
              Clear All Filters
            </button>
          )}
        </div>
      );
    }

    // No filters active, but no apartments at all
    return (
      <div className="text-center py-16">
        <p className="text-client-text-secondary text-lg">
          No apartments available at the moment.
        </p>
        <p className="text-client-text-secondary mt-2">
          Please check back later for new listings.
        </p>
      </div>
    );
  }

  // Show filter summary above grid
  const showFilterSummary = activeFilterCount > 0 && totalCount > 0;

  return (
    <div>
      {/* Filter summary - shows when filters are active */}
      {showFilterSummary && (
        <div className="mb-4 text-sm text-client-text-secondary">
          Showing{" "}
          <span className="font-medium text-client-text-primary">
            {apartments.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-client-text-primary">
            {totalCount}
          </span>{" "}
          apartments
          {activeFilterCount > 0 && <span> matching your filters</span>}
        </div>
      )}

      {/* Grid of apartments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apartments.map((apartment) => (
          <ApartmentCard key={apartment._id} apartment={apartment} />
        ))}
      </div>
    </div>
  );
};

export default ApartmentGrid;
