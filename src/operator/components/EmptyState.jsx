// src/operator/components/EmptyState.jsx
import React from "react";
import PropTypes from "prop-types";
import {
  FaSearch,
  FaEnvelope,
  FaEnvelopeOpen,
  FaReply,
  FaCheckSquare,
  FaFilter,
  FaInbox,
  FaHome,
} from "react-icons/fa";

const EmptyState = ({ type, onClearFilters, onSelectAll, apartmentName }) => {
  // Configure different empty states
  const config = {
    "no-inquiries": {
      icon: <FaInbox className="text-6xl text-gray-500" />,
      title: "No inquiries yet",
      message: "When guests inquire about your apartments, they'll appear here",
      action: null,
    },
    "no-search-results": {
      icon: <FaSearch className="text-6xl text-gray-500" />,
      title: "No matching inquiries",
      message:
        "Try adjusting your search terms to find what you're looking for",
      action: {
        label: "Clear Search",
        onClick: onClearFilters,
      },
    },
    "no-unread": {
      icon: <FaEnvelope className="text-6xl text-gray-500" />,
      title: "No unread inquiries",
      message: "You're all caught up! All inquiries have been read",
      action: {
        label: "Show All",
        onClick: onClearFilters,
      },
    },
    "no-read": {
      icon: <FaEnvelopeOpen className="text-6xl text-gray-500" />,
      title: "No read inquiries",
      message: "All your inquiries are currently unread",
      action: {
        label: "Show All",
        onClick: onClearFilters,
      },
    },
    "no-replied": {
      icon: <FaReply className="text-6xl text-gray-500" />,
      title: "No replied inquiries",
      message: "You haven't replied to any inquiries yet",
      action: {
        label: "Show All",
        onClick: onClearFilters,
      },
    },
    "no-pending-reply": {
      icon: <FaReply className="text-6xl text-gray-500" />,
      title: "No pending replies",
      message: "All inquiries have been replied to",
      action: {
        label: "Show All",
        onClick: onClearFilters,
      },
    },
    "no-selected": {
      icon: <FaCheckSquare className="text-6xl text-gray-500" />,
      title: "No items selected",
      message: "Select inquiries using the checkboxes to perform bulk actions",
      action: {
        label: "Select All",
        onClick: onSelectAll,
      },
    },
    "no-filtered": {
      icon: <FaFilter className="text-6xl text-gray-500" />,
      title: "No results match your filters",
      message: "Try adjusting your filters to see more results",
      action: {
        label: "Clear Filters",
        onClick: onClearFilters,
      },
    },
    "no-apartment-inquiries": {
      icon: <FaHome className="text-6xl text-gray-500" />,
      title: `No inquiries for ${apartmentName || "this apartment"}`,
      message: "This apartment hasn't received any inquiries yet",
      action: null,
    },
  };

  const currentConfig = config[type] || config["no-inquiries"];

  return (
    <div className="bg-[#383838] rounded-lg p-12 text-center animate-fadeIn">
      <div className="flex flex-col items-center">
        {/* Icon */}
        <div className="mb-4">{currentConfig.icon}</div>

        {/* Title */}
        <h3 className="text-white text-xl font-semibold mb-2">
          {currentConfig.title}
        </h3>

        {/* Message */}
        <p className="text-text-secondary text-sm mb-6 max-w-md">
          {currentConfig.message}
        </p>

        {/* Action Button (if any) */}
        {currentConfig.action && (
          <button
            onClick={currentConfig.action.onClick}
            className="px-6 py-2 bg-[#4A7C59] text-white rounded-lg hover:bg-opacity-80 transition-colors inline-flex items-center gap-2"
          >
            {currentConfig.action.label === "Clear Search" && <FaSearch />}
            {currentConfig.action.label === "Clear Filters" && <FaFilter />}
            {currentConfig.action.label === "Select All" && <FaCheckSquare />}
            {currentConfig.action.label}
          </button>
        )}
      </div>
    </div>
  );
};

EmptyState.propTypes = {
  type: PropTypes.oneOf([
    "no-inquiries",
    "no-search-results",
    "no-unread",
    "no-read",
    "no-replied",
    "no-pending-reply",
    "no-selected",
    "no-filtered",
    "no-apartment-inquiries",
  ]).isRequired,
  onClearFilters: PropTypes.func,
  onSelectAll: PropTypes.func,
  apartmentName: PropTypes.string,
};

export default EmptyState;
