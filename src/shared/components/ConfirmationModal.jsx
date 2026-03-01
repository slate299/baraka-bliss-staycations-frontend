// src/shared/ConfirmationModal.jsx
import React from "react";
import PropTypes from "prop-types";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger", // "danger" or "warning"
}) => {
  if (!isOpen) return null;

  // Stop propagation to prevent closing when clicking inside modal
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose} // Close when clicking backdrop
    >
      <div
        className="bg-[#383838] rounded-lg max-w-md w-full animate-fadeIn"
        onClick={handleModalClick}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FaExclamationTriangle
                className={`text-2xl ${type === "danger" ? "text-red-500" : "text-yellow-500"}`}
              />
              <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-white hover:bg-[#2C2C2C] rounded-lg transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          {/* Message */}
          <p className="text-text-secondary mb-6">{message}</p>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#2C2C2C] text-white rounded-lg hover:bg-[#404040] transition-colors duration-300"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                type === "danger"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-yellow-600 hover:bg-yellow-700"
              } text-white`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  type: PropTypes.oneOf(["danger", "warning"]),
};

export default ConfirmationModal;
