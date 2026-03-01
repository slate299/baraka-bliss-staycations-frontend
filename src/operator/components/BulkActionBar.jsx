// src/components/BulkActionBar.jsx - Add bulk reply option
import React from "react";
import PropTypes from "prop-types";
import {
  FaTrash,
  FaDownload,
  FaTimes,
  FaCheckSquare,
  FaEnvelopeOpen,
  FaReplyAll,
} from "react-icons/fa";

const BulkActionBar = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  onBulkDelete,
  onBulkExport,
  onBulkMarkRead,
  onBulkMarkReplied, // 👈 NEW PROP
  isAllSelected,
  deleting,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-[#4A7C59] rounded-lg p-4 mb-6 sticky top-4 z-10 shadow-lg animate-slideIn">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Selected count */}
        <div className="flex items-center gap-3">
          <div className="bg-white bg-opacity-20 rounded-full p-2">
            <FaCheckSquare className="text-white" />
          </div>
          <div>
            <p className="text-white font-medium">
              {selectedCount} {selectedCount === 1 ? "inquiry" : "inquiries"}{" "}
              selected
            </p>
            <button
              onClick={onClearSelection}
              className="text-white text-sm opacity-80 hover:opacity-100 flex items-center gap-1"
            >
              <FaTimes size={12} />
              Clear selection
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            onClick={onSelectAll}
            className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors flex items-center gap-2 flex-1 sm:flex-none justify-center"
          >
            <FaCheckSquare />
            {isAllSelected ? "Deselect All" : "Select All"} ({totalCount})
          </button>

          {/* Mark as read button */}
          <button
            onClick={onBulkMarkRead}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 flex-1 sm:flex-none justify-center"
            disabled={selectedCount === 0}
          >
            <FaEnvelopeOpen />
            Mark as Read
          </button>

          {/* 👇 NEW: Mark as replied button */}
          <button
            onClick={onBulkMarkReplied}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 flex-1 sm:flex-none justify-center"
            disabled={selectedCount === 0}
          >
            <FaReplyAll />
            Mark as Replied
          </button>

          <button
            onClick={onBulkExport}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 flex-1 sm:flex-none justify-center"
            disabled={selectedCount === 0}
          >
            <FaDownload />
            Export Selected
          </button>

          <button
            onClick={onBulkDelete}
            disabled={deleting || selectedCount === 0}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 flex-1 sm:flex-none justify-center ${
              deleting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            } text-white`}
          >
            {deleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <FaTrash />
                Delete Selected
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

BulkActionBar.propTypes = {
  selectedCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onClearSelection: PropTypes.func.isRequired,
  onBulkDelete: PropTypes.func.isRequired,
  onBulkExport: PropTypes.func.isRequired,
  onBulkMarkRead: PropTypes.func.isRequired,
  onBulkMarkReplied: PropTypes.func.isRequired,
  isAllSelected: PropTypes.bool.isRequired,
  deleting: PropTypes.bool.isRequired,
};

export default BulkActionBar;
