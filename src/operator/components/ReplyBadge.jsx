// src/components/ReplyBadge.jsx
import React from "react";
import PropTypes from "prop-types";
import { FaReply, FaCheckCircle, FaClock } from "react-icons/fa";

const ReplyBadge = ({ replied, repliedAt, onClick }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
        replied
          ? "bg-green-500 bg-opacity-20 text-green-400 hover:bg-opacity-30"
          : "bg-yellow-500 bg-opacity-20 text-yellow-400 hover:bg-opacity-30"
      }`}
      title={
        replied ? `Replied on ${formatDate(repliedAt)}` : "Not replied yet"
      }
    >
      {replied ? <FaCheckCircle /> : <FaClock />}
      {replied ? "Replied" : "Pending"}
    </button>
  );
};

ReplyBadge.propTypes = {
  replied: PropTypes.bool.isRequired,
  repliedAt: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default ReplyBadge;
