// src/components/InquiryTableRow.jsx - Add reply column
import React from "react";
import PropTypes from "prop-types";
import { FaEye, FaTrash, FaPhone, FaReply } from "react-icons/fa";
import ReadStatusBadge from "./ReadStatusBadge";
import ReplyBadge from "./ReplyBadge"; // 👈 NEW IMPORT

const InquiryTableRow = ({
  inquiry,
  apartmentName,
  onView,
  onDelete,
  onToggleRead,
  onReply, // 👈 NEW PROP
  deleting,
  selected,
  onSelectChange,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    onSelectChange(inquiry._id, e.target.checked);
  };

  return (
    <tr
      className={`hover:bg-[#2C2C2C] transition-colors ${!inquiry.isRead ? "bg-blue-900 bg-opacity-10" : ""}`}
    >
      {/* Checkbox column */}
      <td className="px-6 py-4 w-12">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selected}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-[#4A7C59] bg-[#2C2C2C] border-gray-600 rounded focus:ring-[#4A7C59] cursor-pointer"
          />
        </div>
      </td>

      {/* Read Status column */}
      <td className="px-6 py-4">
        <ReadStatusBadge
          isRead={inquiry.isRead}
          onClick={() => onToggleRead(inquiry._id)}
        />
      </td>

      {/* 👇 NEW: Reply Status column */}
      <td className="px-6 py-4">
        <ReplyBadge
          replied={inquiry.replied}
          repliedAt={inquiry.repliedAt}
          onClick={() => onReply(inquiry)}
        />
      </td>

      <td className="px-6 py-4">
        <span className="text-white text-sm">{apartmentName}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-white text-sm font-medium">{inquiry.name}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <FaPhone className="text-[#4A7C59] text-xs" />
          <span className="text-white text-sm font-medium">
            {inquiry.phone || "No phone provided"}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-text-secondary text-sm max-w-xs truncate">
          {inquiry.message || "No message"}
        </p>
      </td>
      <td className="px-6 py-4">
        <span className="text-text-secondary text-sm">
          {formatDate(inquiry.createdAt)}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onReply(inquiry)}
            className="p-2 text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 rounded-lg transition-colors"
            title="Reply"
            disabled={deleting}
          >
            <FaReply />
          </button>
          <button
            onClick={() => onView(inquiry)}
            className="p-2 text-[#4A7C59] hover:bg-[#4A7C59] hover:bg-opacity-10 rounded-lg transition-colors"
            title="View Details"
            disabled={deleting}
          >
            <FaEye />
          </button>
          <button
            onClick={() => onDelete(inquiry._id)}
            className="p-2 text-red-500 hover:bg-red-500 hover:bg-opacity-10 rounded-lg transition-colors"
            title="Delete"
            disabled={deleting}
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
};

InquiryTableRow.propTypes = {
  inquiry: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    message: PropTypes.string,
    isRead: PropTypes.bool,
    replied: PropTypes.bool,
    repliedAt: PropTypes.string,
    createdAt: PropTypes.string,
    apartmentId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
  apartmentName: PropTypes.string.isRequired,
  onView: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleRead: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
  deleting: PropTypes.bool,
  selected: PropTypes.bool.isRequired,
  onSelectChange: PropTypes.func.isRequired,
};

export default InquiryTableRow;
