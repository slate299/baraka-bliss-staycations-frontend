// src/components/ReadStatusBadge.jsx
import React from "react";
import PropTypes from "prop-types";
import { FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";

const ReadStatusBadge = ({ isRead, onClick, showLabel = false }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
        isRead
          ? "bg-green-500 bg-opacity-20 text-green-400 hover:bg-opacity-30"
          : "bg-blue-500 bg-opacity-20 text-blue-400 hover:bg-opacity-30"
      }`}
      title={isRead ? "Mark as unread" : "Mark as read"}
    >
      {isRead ? <FaEnvelopeOpen /> : <FaEnvelope />}
      {showLabel && (isRead ? "Read" : "Unread")}
    </button>
  );
};

ReadStatusBadge.propTypes = {
  isRead: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  showLabel: PropTypes.bool,
};

export default ReadStatusBadge;
