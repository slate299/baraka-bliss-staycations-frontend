// src/components/InquiryCard.jsx - Add reply button
import React from "react";
import PropTypes from "prop-types";
import {
  FaEye,
  FaTrash,
  FaEnvelope,
  FaUser,
  FaHome,
  FaCalendarAlt,
  FaReply,
  FaPhone,
} from "react-icons/fa";
import ReadStatusBadge from "./ReadStatusBadge";
import ReplyBadge from "./ReplyBadge"; // 👈 NEW IMPORT

const InquiryCard = ({
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
    <div
      className={`bg-[#2C2C2C] rounded-lg p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative ${!inquiry.isRead ? "border-l-4 border-blue-500" : ""}`}
    >
      {/* Checkbox for selection */}
      <div className="absolute top-4 left-4 z-10">
        <input
          type="checkbox"
          checked={selected}
          onChange={handleCheckboxChange}
          className="w-4 h-4 text-[#4A7C59] bg-[#383838] border-gray-600 rounded focus:ring-[#4A7C59] cursor-pointer"
        />
      </div>

      {/* Header with Apartment Name and Actions */}
      <div className="flex justify-between items-start mb-3 ml-8">
        <div className="flex items-center gap-2 text-[#4A7C59]">
          <FaHome />
          <h3 className="text-white font-medium">{apartmentName}</h3>
        </div>
        <div className="flex items-center gap-2">
          {/* Reply Status Badge */}
          <ReplyBadge
            replied={inquiry.replied}
            repliedAt={inquiry.repliedAt}
            onClick={() => onReply(inquiry)}
          />
          <ReadStatusBadge
            isRead={inquiry.isRead}
            onClick={() => onToggleRead(inquiry._id)}
          />
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
      </div>

      {/* Guest Info */}
      <div className="space-y-2 mb-3 ml-8">
        <div className="flex items-center gap-2 text-text-secondary">
          <FaUser className="text-sm" />
          <span className="text-white">{inquiry.name}</span>
        </div>
        <div className="flex items-center gap-2 text-text-secondary">
          <FaEnvelope className="text-sm" />
          <span className="text-white text-sm">
            {inquiry.phone || "No phone provided"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-text-secondary">
          <FaCalendarAlt className="text-sm" />
          <span className="text-sm">{formatDate(inquiry.createdAt)}</span>
        </div>
      </div>

      {/* Message Preview */}
      <div className="bg-[#383838] rounded-lg p-3 ml-8">
        <p className="text-text-secondary text-sm line-clamp-2">
          {inquiry.message || "No message"}
        </p>
      </div>
    </div>
  );
};

InquiryCard.propTypes = {
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

export default InquiryCard;
