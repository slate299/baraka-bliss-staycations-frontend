// src/client/utils/errorHandler.js
import toast from "react-hot-toast";

export const handleApiError = (error, customMessages = {}) => {
  // Network error (no response)
  if (!error.response) {
    toast.error(
      customMessages.network ||
        "Unable to connect. Please check your internet.",
    );
    return {
      message: customMessages.network || "Network error",
      type: "network",
    };
  }

  const { status, data } = error.response;

  // Rate limiting (429)
  if (status === 429) {
    const message =
      data?.message || "Too many requests. Please wait 15 minutes.";
    toast.error(message);
    return {
      message,
      type: "rate_limit",
    };
  }

  // Not found (404)
  if (status === 404) {
    toast.error(customMessages.notFound || "Resource not found");
    return {
      message: customMessages.notFound || "Not found",
      type: "not_found",
    };
  }

  // Validation errors (400)
  if (status === 400 && data?.errors) {
    // Show first validation error
    if (data.errors[0]?.message) {
      toast.error(data.errors[0].message);
    }
    return {
      message: "Validation error",
      type: "validation",
      errors: data.errors,
    };
  }

  // Server error (500)
  if (status >= 500) {
    toast.error(
      customMessages.server || "Something went wrong. Try again later.",
    );
    return {
      message: customMessages.server || "Server error",
      type: "server",
    };
  }

  // Default error
  toast.error(customMessages.default || data?.message || "An error occurred");
  return {
    message: data?.message || "Unknown error",
    type: "unknown",
  };
};
