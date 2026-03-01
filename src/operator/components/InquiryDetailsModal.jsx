// src/components/InquiryDetailsModal.jsx
import React from "react";
import PropTypes from "prop-types";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaHome,
  FaCalendarAlt,
  FaComment,
} from "react-icons/fa";

const InquiryDetailsModal = ({ inquiry, apartmentName, onClose }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (!inquiry) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#383838] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#2C2C2C]">
          <h2 className="text-xl font-bold text-white">Inquiry Details</h2>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-white hover:bg-[#2C2C2C] rounded-lg transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Apartment Info */}
          <div className="bg-[#2C2C2C] rounded-lg p-4">
            <h3 className="text-sm font-medium text-text-secondary mb-3 flex items-center gap-2">
              <FaHome className="text-[#4A7C59]" />
              Apartment
            </h3>
            <p className="text-white text-lg">{apartmentName}</p>
            {inquiry.apartmentId && typeof inquiry.apartmentId === "object" && (
              <div className="mt-2 text-sm text-text-secondary">
                {inquiry.apartmentId.city && (
                  <span>{inquiry.apartmentId.city}</span>
                )}
                {inquiry.apartmentId.area && (
                  <span> • {inquiry.apartmentId.area}</span>
                )}
              </div>
            )}
          </div>

          {/* Guest Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#2C2C2C] rounded-lg p-4">
              <h3 className="text-sm font-medium text-text-secondary mb-3 flex items-center gap-2">
                <FaUser className="text-[#4A7C59]" />
                Guest Name
              </h3>
              <p className="text-white">{inquiry.name}</p>
            </div>
            <div className="bg-[#2C2C2C] rounded-lg p-4">
              <h3 className="text-sm font-medium text-text-secondary mb-3 flex items-center gap-2">
                <FaEnvelope className="text-[#4A7C59]" />
                Email
              </h3>
              <a
                href={`mailto:${inquiry.email}`}
                className="text-[#4A7C59] hover:underline break-all"
              >
                {inquiry.email}
              </a>
            </div>
          </div>

          {/* Date */}
          <div className="bg-[#2C2C2C] rounded-lg p-4">
            <h3 className="text-sm font-medium text-text-secondary mb-3 flex items-center gap-2">
              <FaCalendarAlt className="text-[#4A7C59]" />
              Received On
            </h3>
            <p className="text-white">{formatDate(inquiry.createdAt)}</p>
          </div>

          {/* Message */}
          <div className="bg-[#2C2C2C] rounded-lg p-4">
            <h3 className="text-sm font-medium text-text-secondary mb-3 flex items-center gap-2">
              <FaComment className="text-[#4A7C59]" />
              Message
            </h3>
            <p className="text-white whitespace-pre-wrap leading-relaxed">
              {inquiry.message || "No message provided"}
            </p>
          </div>

          {/* Reply Button */}
          <div className="flex justify-end pt-4 border-t border-[#2C2C2C]">
            <a
              href={`mailto:${inquiry.email}?subject=Re: Inquiry about ${apartmentName}`}
              className="px-6 py-2 bg-[#4A7C59] text-white rounded-lg hover:bg-opacity-90 transition-colors inline-flex items-center gap-2"
            >
              <FaEnvelope />
              Reply via Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

InquiryDetailsModal.propTypes = {
  inquiry: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    message: PropTypes.string,
    createdAt: PropTypes.string,
    apartmentId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
  apartmentName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InquiryDetailsModal;
