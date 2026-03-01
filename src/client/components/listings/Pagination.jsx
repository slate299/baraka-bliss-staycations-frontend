// src/client/components/listings/Pagination.jsx
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Don't render if only one page
  if (totalPages <= 1) return null;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  // Handle page change with keyboard support
  const handlePageClick = (page) => {
    if (typeof page === "number" && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleKeyDown = (e, page) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePageClick(page);
    }
  };

  return (
    <nav
      className="flex justify-center items-center gap-2 mt-8"
      aria-label="Pagination"
    >
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        onKeyDown={(e) => e.key === "Enter" && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="min-h-[44px] min-w-[44px] flex items-center justify-center
                   rounded-lg border border-client-border bg-client-card
                   text-client-text-primary hover:bg-client-bg
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200 hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-client-rose/50"
        aria-label="Go to previous page"
      >
        <FaChevronLeft size={16} aria-hidden="true" />
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          onKeyDown={(e) => handleKeyDown(e, page)}
          disabled={page === "..."}
          className={`min-h-[44px] min-w-[44px] flex items-center justify-center
                     rounded-lg transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-client-rose/50
                     ${
                       page === currentPage
                         ? "bg-client-rose text-white font-semibold hover:bg-client-rose/90"
                         : page === "..."
                           ? "text-client-text-secondary cursor-default"
                           : "border border-client-border bg-client-card text-client-text-primary hover:bg-client-bg hover:scale-105 active:scale-95"
                     }`}
          aria-label={page === "..." ? "More pages" : `Go to page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        onKeyDown={(e) => e.key === "Enter" && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="min-h-[44px] min-w-[44px] flex items-center justify-center
                   rounded-lg border border-client-border bg-client-card
                   text-client-text-primary hover:bg-client-bg
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200 hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-client-rose/50"
        aria-label="Go to next page"
      >
        <FaChevronRight size={16} aria-hidden="true" />
      </button>
    </nav>
  );
};

export default Pagination;
