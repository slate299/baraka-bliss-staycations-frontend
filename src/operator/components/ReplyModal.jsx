// src/components/ReplyModal.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaTimes, FaPaperPlane, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

const ReplyModal = ({ inquiry, apartmentName, onClose, onReplySent }) => {
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSendReply = async () => {
    if (!replyMessage.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    try {
      setSending(true);
      await onReplySent(inquiry._id, replyMessage);
      toast.success("Reply sent successfully");
      onClose();
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  const handleEmailClient = () => {
    const subject = encodeURIComponent(`Re: Inquiry about ${apartmentName}`);
    const body = encodeURIComponent(
      `\n\n--- Original Message ---\nFrom: ${inquiry.name}\nMessage: ${inquiry.message}`,
    );
    window.open(`mailto:${inquiry.email}?subject=${subject}&body=${body}`);

    // Mark as replied when using email client
    onReplySent(inquiry._id, "Sent via email client");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#383838] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#2C2C2C]">
          <h2 className="text-xl font-bold text-white">Reply to Inquiry</h2>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-white hover:bg-[#2C2C2C] rounded-lg transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Guest Info */}
          <div className="bg-[#2C2C2C] rounded-lg p-4">
            <p className="text-text-secondary text-sm mb-2">To:</p>
            <p className="text-white font-medium">{inquiry.name}</p>
            <p className="text-[#4A7C59]">{inquiry.email}</p>
          </div>

          {/* Original Message */}
          <div className="bg-[#2C2C2C] rounded-lg p-4">
            <p className="text-text-secondary text-sm mb-2">
              Original Message:
            </p>
            <p className="text-white">{inquiry.message}</p>
          </div>

          {/* Reply Input */}
          <div>
            <label className="block text-text-secondary text-sm mb-2">
              Your Reply:
            </label>
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your reply here..."
              rows="6"
              className="w-full bg-[#2C2C2C] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-[#2C2C2C]">
            <button
              onClick={handleEmailClient}
              className="px-6 py-2 bg-[#2C2C2C] text-white rounded-lg hover:bg-[#404040] transition-colors flex items-center gap-2 justify-center"
            >
              Open in Email Client
            </button>
            <button
              onClick={handleSendReply}
              disabled={sending}
              className="px-6 py-2 bg-[#4A7C59] text-white rounded-lg hover:bg-opacity-80 transition-colors flex items-center gap-2 justify-center disabled:opacity-50"
            >
              {sending ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Send Reply
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ReplyModal.propTypes = {
  inquiry: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    message: PropTypes.string,
  }).isRequired,
  apartmentName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onReplySent: PropTypes.func.isRequired,
};

export default ReplyModal;
