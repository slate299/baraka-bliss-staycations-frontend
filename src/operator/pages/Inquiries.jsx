// src/operator/pages/Inquiries.jsx
import React, { useState, useEffect } from "react";
import {
  getInquiries,
  getApartments,
  deleteInquiry,
  toggleReadStatus,
  markMultipleAsRead,
  markMultipleAsReplied,
  addReply,
} from "../../services/api";
import {
  FaSpinner,
  FaSync,
  FaExclamationTriangle,
  FaHome,
} from "react-icons/fa";
import toast from "react-hot-toast";

// Import our components
import InquiryCard from "../components/InquiryCard";
import InquiryTableRow from "../components/InquiryTableRow";
import InquiryDetailsModal from "../components/InquiryDetailsModal";
import InquiryFilters from "../components/InquiryFilters";
import ExportButtonWithOptions from "../components/ExportButtonWithOptions";
import BulkActionBar from "../components/BulkActionBar";
import ReplyModal from "../components/ReplyModal";
import InquiryTableSkeleton from "../components/InquiryTableSkeleton";
import InquiryCardSkeleton from "../components/InquiryCardSkeleton";
import EmptyState from "../components/EmptyState";
import ConfirmationModal from "../../shared/components/ConfirmationModal";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [apartmentMap, setApartmentMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [togglingRead, setTogglingRead] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyInquiry, setReplyInquiry] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState(null);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);

  // Bulk selection states
  const [selectedInquiries, setSelectedInquiries] = useState(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApartment, setSelectedApartment] = useState("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [sortBy, setSortBy] = useState("newest");
  const [readFilter, setReadFilter] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  // Define filterInquiries and sortInquiries inside the component
  const filterInquiries = (inquiriesList) => {
    return inquiriesList.filter((inquiry) => {
      // Search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const nameMatch = inquiry.name?.toLowerCase().includes(term);
        const phoneMatch = inquiry.phone?.toLowerCase().includes(term);
        const messageMatch = inquiry.message?.toLowerCase().includes(term);
        if (!nameMatch && !phoneMatch && !messageMatch) return false;
      }

      // Apartment filter
      if (selectedApartment !== "all") {
        const inquiryApartmentId =
          typeof inquiry.apartmentId === "object"
            ? inquiry.apartmentId._id
            : inquiry.apartmentId;
        if (inquiryApartmentId !== selectedApartment) return false;
      }

      // Date range filter
      if (dateRange.from || dateRange.to) {
        const inquiryDate = new Date(inquiry.createdAt);

        if (dateRange.from) {
          const fromDate = new Date(dateRange.from);
          if (inquiryDate < fromDate) return false;
        }

        if (dateRange.to) {
          const toDate = new Date(dateRange.to);
          toDate.setHours(23, 59, 59, 999);
          if (inquiryDate > toDate) return false;
        }
      }

      // Add read status filter
      if (readFilter !== "all") {
        const isRead = readFilter === "read";
        if (inquiry.isRead !== isRead) return false;
      }

      return true;
    });
  };

  const sortInquiries = (inquiriesToSort) => {
    const sorted = [...inquiriesToSort];

    switch (sortBy) {
      case "newest":
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
      case "oldest":
        return sorted.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
      case "nameAsc":
        return sorted.sort((a, b) =>
          (a.name || "").localeCompare(b.name || ""),
        );
      case "nameDesc":
        return sorted.sort((a, b) =>
          (b.name || "").localeCompare(a.name || ""),
        );
      case "phoneAsc":
        return sorted.sort((a, b) =>
          (a.phone || "").localeCompare(b.phone || ""),
        );
      case "phoneDesc":
        return sorted.sort((a, b) =>
          (b.phone || "").localeCompare(a.phone || ""),
        );
      default:
        return sorted;
    }
  };

  // Apply filters and sorting
  useEffect(() => {
    if (inquiries.length > 0) {
      const filtered = filterInquiries(inquiries);
      const sorted = sortInquiries(filtered);
      setFilteredInquiries(sorted);
      setSelectedInquiries(new Set());
    }
  }, [inquiries, searchTerm, selectedApartment, dateRange, sortBy, readFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [inquiriesData, apartmentsData] = await Promise.all([
        getInquiries(),
        getApartments(),
      ]);

      // console.log("📥 Fetched inquiries:", inquiriesData);
      // console.log("📥 Fetched apartments:", apartmentsData);

      const map = {};
      apartmentsData.forEach((apt) => {
        map[apt._id] = apt;
      });

      setInquiries(inquiriesData);
      setApartments(apartmentsData);
      setApartmentMap(map);
    } catch (err) {
      console.error("❌ Error fetching data:", err);
      setError(err.response?.data?.message || "Failed to load inquiries");
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  const getApartmentName = (inquiry) => {
    if (!inquiry.apartmentId) return "Unknown Apartment";

    if (typeof inquiry.apartmentId === "object" && inquiry.apartmentId.name) {
      return inquiry.apartmentId.name;
    }

    const apartment = apartmentMap[inquiry.apartmentId];
    return apartment?.name || "Unknown Apartment";
  };

  const handleFilterChange = ({ type, value }) => {
    switch (type) {
      case "search":
        setSearchTerm(value);
        break;
      case "apartment":
        setSelectedApartment(value);
        break;
      case "dateRange":
        setDateRange(value);
        break;
      case "clear":
        setSearchTerm("");
        setSelectedApartment("all");
        setDateRange({ from: "", to: "" });
        setReadFilter("all");
        break;
      default:
        break;
    }
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleViewDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowDetailsModal(true);
  };

  const handleDelete = (id) => {
    setInquiryToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!inquiryToDelete) return;

    try {
      setDeleting(true);
      await deleteInquiry(inquiryToDelete);

      setInquiries(inquiries.filter((inq) => inq._id !== inquiryToDelete));
      toast.success("Inquiry deleted successfully");
    } catch (err) {
      console.error("❌ Error deleting inquiry:", err);
      toast.error(err.response?.data?.message || "Failed to delete inquiry");
    } finally {
      setDeleting(false);
      setInquiryToDelete(null);
    }
  };

  // Bulk action handlers
  const handleSelectAll = () => {
    if (selectedInquiries.size === filteredInquiries.length) {
      setSelectedInquiries(new Set());
    } else {
      const allIds = filteredInquiries.map((inq) => inq._id);
      setSelectedInquiries(new Set(allIds));
    }
  };

  const handleSelectOne = (id, checked) => {
    const newSelected = new Set(selectedInquiries);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedInquiries(newSelected);
  };

  const handleClearSelection = () => {
    setSelectedInquiries(new Set());
  };

  const handleToggleRead = async (id) => {
    try {
      setTogglingRead(true);
      const updatedInquiry = await toggleReadStatus(id);

      setInquiries(
        inquiries.map((inq) =>
          inq._id === id ? { ...inq, isRead: updatedInquiry.isRead } : inq,
        ),
      );

      toast.success(`Marked as ${updatedInquiry.isRead ? "read" : "unread"}`);
    } catch (err) {
      console.error("Error toggling read status:", err);
      toast.error("Failed to update status");
    } finally {
      setTogglingRead(false);
    }
  };

  // Reply handlers
  const handleReply = (inquiry) => {
    setReplyInquiry(inquiry);
    setShowReplyModal(true);
  };

  const handleReplySent = async (id, replyMessage) => {
    try {
      await addReply(id, replyMessage);

      setInquiries(
        inquiries.map((inq) =>
          inq._id === id
            ? { ...inq, replied: true, repliedAt: new Date(), replyMessage }
            : inq,
        ),
      );

      toast.success("Reply recorded successfully");
    } catch (error) {
      console.error("Error recording reply:", error);
      toast.error("Failed to record reply");
      throw error;
    }
  };

  const handleBulkMarkReplied = async () => {
    const count = selectedInquiries.size;
    if (count === 0) return;

    try {
      await markMultipleAsReplied(Array.from(selectedInquiries));

      setInquiries(
        inquiries.map((inq) =>
          selectedInquiries.has(inq._id)
            ? { ...inq, replied: true, repliedAt: new Date() }
            : inq,
        ),
      );

      setSelectedInquiries(new Set());
      toast.success(`Marked ${count} inquiries as replied`);
    } catch (err) {
      console.error("Error bulk marking as replied:", err);
      toast.error("Failed to mark as replied");
    }
  };

  const handleBulkMarkRead = async () => {
    const count = selectedInquiries.size;
    if (count === 0) return;

    try {
      await markMultipleAsRead(Array.from(selectedInquiries));

      setInquiries(
        inquiries.map((inq) =>
          selectedInquiries.has(inq._id) ? { ...inq, isRead: true } : inq,
        ),
      );

      setSelectedInquiries(new Set());
      toast.success(`Marked ${count} inquiries as read`);
    } catch (err) {
      console.error("Error bulk marking as read:", err);
      toast.error("Failed to mark as read");
    }
  };

  const handleBulkDelete = () => {
    if (selectedInquiries.size === 0) return;
    setShowBulkDeleteModal(true);
  };

  const confirmBulkDelete = async () => {
    const count = selectedInquiries.size;

    try {
      setBulkDeleting(true);

      const deletePromises = Array.from(selectedInquiries).map((id) =>
        deleteInquiry(id),
      );

      await Promise.all(deletePromises);

      setInquiries(inquiries.filter((inq) => !selectedInquiries.has(inq._id)));
      setSelectedInquiries(new Set());

      toast.success(
        `Successfully deleted ${count} ${count === 1 ? "inquiry" : "inquiries"}`,
      );
    } catch (err) {
      console.error("❌ Error bulk deleting:", err);
      toast.error("Failed to delete some inquiries");
    } finally {
      setBulkDeleting(false);
      setShowBulkDeleteModal(false);
    }
  };

  const handleBulkExport = () => {
    const selectedData = filteredInquiries.filter((inq) =>
      selectedInquiries.has(inq._id),
    );

    if (selectedData.length === 0) return;

    const csvContent = convertSelectedToCSV(selectedData);

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    const date = new Date().toISOString().split("T")[0];
    link.setAttribute("href", url);
    link.setAttribute("download", `selected_inquiries_${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`Exported ${selectedData.length} inquiries`);
  };

  // Helper for bulk export
  const convertSelectedToCSV = (data) => {
    const headers = [
      "ID",
      "Guest Name",
      "Phone Number", // 👈 Changed from "Email"
      "Message",
      "Apartment ID",
      "Apartment Name",
      "Apartment City",
      "Apartment Area",
      "Apartment Price",
      "Received Date",
      "Last Updated",
    ];

    const getApartmentDetails = (inquiry) => {
      if (!inquiry.apartmentId)
        return { name: "Unknown", city: "", area: "", price: "" };

      if (typeof inquiry.apartmentId === "object") {
        return {
          name: inquiry.apartmentId.name || "Unknown",
          city: inquiry.apartmentId.city || "",
          area: inquiry.apartmentId.area || "",
          price: inquiry.apartmentId.price || "",
        };
      }

      const apartment = apartmentMap[inquiry.apartmentId];
      return {
        name: apartment?.name || "Unknown",
        city: apartment?.city || "",
        area: apartment?.area || "",
        price: apartment?.price || "",
      };
    };

    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleString("en-US").replace(",", "");
    };

    const rows = data.map((inquiry) => {
      const aptDetails = getApartmentDetails(inquiry);
      return [
        `"${inquiry._id || ""}"`,
        `"${inquiry.name || ""}"`,
        `"${inquiry.phone || "No phone provided"}"`,
        `"${(inquiry.message || "").replace(/"/g, '""')}"`,
        `"${typeof inquiry.apartmentId === "object" ? inquiry.apartmentId._id : inquiry.apartmentId || ""}"`,
        `"${aptDetails.name}"`,
        `"${aptDetails.city}"`,
        `"${aptDetails.area}"`,
        `"${aptDetails.price}"`,
        `"${formatDate(inquiry.createdAt)}"`,
        `"${formatDate(inquiry.updatedAt)}"`,
      ].join(",");
    });

    return [headers.join(","), ...rows].join("\n");
  };

  // Clear all filters function
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedApartment("all");
    setDateRange({ from: "", to: "" });
    setSortBy("newest");
    setReadFilter("all");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-primary-dark p-5">
        <div className="max-w-7xl mx-auto">
          {/* Header skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <div className="h-8 bg-gray-600 rounded w-48 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-600 rounded w-64 animate-pulse"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-10 bg-gray-600 rounded-lg w-32 animate-pulse"></div>
              <div className="h-10 bg-gray-600 rounded-lg w-24 animate-pulse"></div>
            </div>
          </div>

          {/* Stats card skeleton */}
          <div className="bg-[#383838] rounded-lg p-4 mb-6 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-600 rounded"></div>
              <div className="h-6 bg-gray-600 rounded w-48"></div>
            </div>
          </div>

          {/* Filters skeleton */}
          <div className="bg-[#383838] rounded-lg p-4 mb-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-600 rounded"></div>
                <div className="h-5 bg-gray-600 rounded w-32"></div>
              </div>
              <div className="w-5 h-5 bg-gray-600 rounded"></div>
            </div>
          </div>

          {/* Table skeleton for desktop */}
          <InquiryTableSkeleton />

          {/* Card skeleton for mobile */}
          <InquiryCardSkeleton />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-primary-dark p-5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#383838] p-5 rounded-lg text-center">
            <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchData}
              className="px-6 py-2 bg-[#4A7C59] text-white rounded-lg hover:bg-opacity-80 transition-colors inline-flex items-center gap-2"
            >
              <FaSync className={loading ? "animate-spin" : ""} />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-dark p-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Inquiries</h1>
            <p className="text-text-secondary text-sm mt-1">
              View and manage guest inquiries for your apartments
            </p>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <ExportButtonWithOptions
              allInquiries={inquiries}
              filteredInquiries={filteredInquiries}
              apartments={apartments}
              apartmentMap={apartmentMap}
            />

            <button
              onClick={fetchData}
              className="px-4 py-2 bg-[#383838] text-white rounded-lg hover:bg-[#404040] transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
              disabled={loading}
            >
              <FaSync className={loading ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-[#383838] rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <FaHome className="text-[#4A7C59] text-xl" />
            <p className="text-text-secondary">
              Total Inquiries:{" "}
              <span className="text-white font-semibold text-lg ml-2">
                {inquiries.length}
              </span>
              {inquiries.length !== filteredInquiries.length && (
                <span className="ml-2 text-sm text-[#4A7C59]">
                  (Showing {filteredInquiries.length})
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Filters Component */}
        <InquiryFilters
          apartments={apartments}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          totalCount={inquiries.length}
          filteredCount={filteredInquiries.length}
        />

        {/* Bulk Action Bar - Only show if there are items to select */}
        {filteredInquiries.length > 0 && (
          <BulkActionBar
            selectedCount={selectedInquiries.size}
            totalCount={filteredInquiries.length}
            onSelectAll={handleSelectAll}
            onClearSelection={handleClearSelection}
            onBulkDelete={handleBulkDelete}
            onBulkExport={handleBulkExport}
            onBulkMarkRead={handleBulkMarkRead}
            onBulkMarkReplied={handleBulkMarkReplied}
            isAllSelected={selectedInquiries.size === filteredInquiries.length}
            deleting={bulkDeleting}
          />
        )}

        {/* Empty States - Using EmptyState component */}

        {/* Case 1: No inquiries at all */}
        {inquiries.length === 0 && <EmptyState type="no-inquiries" />}

        {/* Case 2: Filters active but no results */}
        {inquiries.length > 0 && filteredInquiries.length === 0 && (
          <>
            {/* Search filter active */}
            {searchTerm && (
              <EmptyState
                type="no-search-results"
                onClearFilters={clearAllFilters}
              />
            )}

            {/* Apartment filter active */}
            {!searchTerm && selectedApartment !== "all" && (
              <EmptyState type="no-filtered" onClearFilters={clearAllFilters} />
            )}

            {/* Date range filter active */}
            {!searchTerm &&
              selectedApartment === "all" &&
              (dateRange.from || dateRange.to) && (
                <EmptyState
                  type="no-filtered"
                  onClearFilters={clearAllFilters}
                />
              )}

            {/* Read status filter active */}
            {!searchTerm &&
              selectedApartment === "all" &&
              !dateRange.from &&
              !dateRange.to &&
              readFilter !== "all" && (
                <>
                  {readFilter === "unread" && (
                    <EmptyState
                      type="no-unread"
                      onClearFilters={clearAllFilters}
                    />
                  )}
                  {readFilter === "read" && (
                    <EmptyState
                      type="no-read"
                      onClearFilters={clearAllFilters}
                    />
                  )}
                </>
              )}

            {/* Default filter state (should not happen but just in case) */}
            {!searchTerm &&
              selectedApartment === "all" &&
              !dateRange.from &&
              !dateRange.to &&
              readFilter === "all" && (
                <EmptyState
                  type="no-filtered"
                  onClearFilters={clearAllFilters}
                />
              )}
          </>
        )}

        {/* Desktop Table View - Only show if there are results */}
        {filteredInquiries.length > 0 && (
          <>
            <div className="hidden md:block bg-[#383838] rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#2C2C2C]">
                    <tr>
                      <th className="px-6 py-4 w-12">
                        <input
                          type="checkbox"
                          checked={
                            selectedInquiries.size ===
                              filteredInquiries.length &&
                            filteredInquiries.length > 0
                          }
                          onChange={handleSelectAll}
                          className="w-4 h-4 text-[#4A7C59] bg-[#2C2C2C] border-gray-600 rounded focus:ring-[#4A7C59] cursor-pointer"
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
                        Read
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
                        Reply
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
                        Apartment
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
                        Guest Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
                        Phone Number
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
                        Message
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2C2C2C]">
                    {filteredInquiries.map((inquiry) => (
                      <InquiryTableRow
                        key={inquiry._id}
                        inquiry={inquiry}
                        apartmentName={getApartmentName(inquiry)}
                        onView={handleViewDetails}
                        onDelete={handleDelete}
                        onToggleRead={handleToggleRead}
                        onReply={handleReply}
                        deleting={deleting}
                        selected={selectedInquiries.has(inquiry._id)}
                        onSelectChange={handleSelectOne}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {filteredInquiries.map((inquiry) => (
                <InquiryCard
                  key={inquiry._id}
                  inquiry={inquiry}
                  apartmentName={getApartmentName(inquiry)}
                  onView={handleViewDetails}
                  onDelete={handleDelete}
                  onToggleRead={handleToggleRead}
                  onReply={handleReply}
                  deleting={deleting}
                  selected={selectedInquiries.has(inquiry._id)}
                  onSelectChange={handleSelectOne}
                />
              ))}
            </div>
          </>
        )}

        {/* Empty selected state - Show when there are results but no items selected (optional) */}
        {filteredInquiries.length > 0 &&
          selectedInquiries.size === 0 &&
          false && (
            <div className="mt-4">
              <EmptyState type="no-selected" onSelectAll={handleSelectAll} />
            </div>
          )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedInquiry && (
        <InquiryDetailsModal
          inquiry={selectedInquiry}
          apartmentName={getApartmentName(selectedInquiry)}
          onClose={() => setShowDetailsModal(false)}
        />
      )}

      {/* Reply Modal */}
      {showReplyModal && replyInquiry && (
        <ReplyModal
          inquiry={replyInquiry}
          apartmentName={getApartmentName(replyInquiry)}
          onClose={() => {
            setShowReplyModal(false);
            setReplyInquiry(null);
          }}
          onReplySent={handleReplySent}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setInquiryToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Inquiry"
        message="Are you sure you want to delete this inquiry? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      {/* Bulk Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showBulkDeleteModal}
        onClose={() => setShowBulkDeleteModal(false)}
        onConfirm={confirmBulkDelete}
        title="Delete Multiple Inquiries"
        message={`Are you sure you want to delete ${selectedInquiries.size} ${selectedInquiries.size === 1 ? "inquiry" : "inquiries"}? This action cannot be undone.`}
        confirmText="Delete All"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default Inquiries;
