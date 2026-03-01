// src/components/InquiryFilters.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";

const InquiryFilters = ({
  apartments,
  onFilterChange,
  onSortChange,
  totalCount,
  filteredCount,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApartment, setSelectedApartment] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  // 👇 NEW: Add read filter state
  const [readFilter, setReadFilter] = useState("all");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ type: "search", value });
  };

  const handleApartmentChange = (e) => {
    const value = e.target.value;
    setSelectedApartment(value);
    onFilterChange({ type: "apartment", value });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onSortChange(value);
  };

  const handleDateChange = (type, value) => {
    const newRange = { ...dateRange, [type]: value };
    setDateRange(newRange);
    onFilterChange({ type: "dateRange", value: newRange });
  };

  // 👇 NEW: Handle read filter change
  const handleReadFilterChange = (e) => {
    const value = e.target.value;
    setReadFilter(value);
    onFilterChange({ type: "readStatus", value });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedApartment("all");
    setDateRange({ from: "", to: "" });
    setSortBy("newest");
    setReadFilter("all"); // 👈 NEW: Reset read filter
    onFilterChange({ type: "clear" });
    onSortChange("newest");
  };

  return (
    <div className="bg-[#383838] rounded-lg p-4 mb-6">
      {/* Header with toggle */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <FaFilter className="text-[#4A7C59]" />
          <h3 className="text-white font-medium">Filters & Sorting</h3>
          <span className="text-xs bg-[#2C2C2C] text-text-secondary px-2 py-1 rounded-full">
            {filteredCount} of {totalCount}
          </span>
        </div>
        <button className="text-text-secondary hover:text-white transition-colors">
          {isExpanded ? <FaSortAmountUp /> : <FaSortAmountDown />}
        </button>
      </div>

      {/* Expanded filters */}
      {isExpanded && (
        <div className="mt-4 space-y-4 animate-slideIn">
          {/* Search */}
          <div>
            <label className="block text-text-secondary text-sm mb-2">
              Search by name, email, or message
            </label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="w-full bg-[#2C2C2C] text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    onFilterChange({ type: "search", value: "" });
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-white"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {/* Filter by Apartment */}
          <div>
            <label className="block text-text-secondary text-sm mb-2">
              Filter by Apartment
            </label>
            <select
              value={selectedApartment}
              onChange={handleApartmentChange}
              className="w-full bg-[#2C2C2C] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
            >
              <option value="all">All Apartments</option>
              {apartments.map((apt) => (
                <option key={apt._id} value={apt._id}>
                  {apt.name} - {apt.city}
                </option>
              ))}
            </select>
          </div>

          {/* 👇 NEW: Status Filter */}
          <div>
            <label className="block text-text-secondary text-sm mb-2">
              Filter by Status
            </label>
            <select
              value={readFilter}
              onChange={handleReadFilterChange}
              className="w-full bg-[#2C2C2C] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-secondary text-sm mb-2">
                From Date
              </label>
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => handleDateChange("from", e.target.value)}
                className="w-full bg-[#2C2C2C] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm mb-2">
                To Date
              </label>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => handleDateChange("to", e.target.value)}
                className="w-full bg-[#2C2C2C] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
              />
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-text-secondary text-sm mb-2">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-full bg-[#2C2C2C] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="nameAsc">Guest Name (A-Z)</option>
              <option value="nameDesc">Guest Name (Z-A)</option>
              <option value="emailAsc">Email (A-Z)</option>
              <option value="emailDesc">Email (Z-A)</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm bg-[#2C2C2C] text-text-secondary hover:text-white rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

InquiryFilters.propTypes = {
  apartments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string,
    }),
  ).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  filteredCount: PropTypes.number.isRequired,
};

export default InquiryFilters;
