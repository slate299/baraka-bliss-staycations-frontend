// src/services/api.js
import axios from "axios";

/* ================================
   AXIOS BASE INSTANCE
================================ */
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

/* ================================
   APARTMENT ENDPOINTS
================================ */

// Get all apartments
export const getApartments = async () => {
  try {
    const response = await API.get("/api/apartments");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching apartments:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Get single apartment by ID
export const getApartmentById = async (id) => {
  try {
    const response = await API.get(`/api/apartments/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching apartment:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Create new apartment (with media upload)
export const createApartment = async (formData) => {
  try {
    const response = await API.post("/api/apartments", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating apartment:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Update apartment
export const updateApartment = async (id, formData) => {
  try {
    // 🔍 DEBUG: Log everything
    console.log("🔍 UPDATE APARTMENT DEBUG:");
    console.log("  - ID:", id);
    console.log("  - Base URL:", API.defaults.baseURL);
    console.log(
      "  - Full URL:",
      `${API.defaults.baseURL}/api/apartments/${id}`,
    );
    console.log("  - Method: PUT");

    // Log FormData contents
    console.log("  - FormData entries:");
    for (let pair of formData.entries()) {
      console.log(`    ${pair[0]}:`, pair[1]);
    }

    const response = await API.put(`/api/apartments/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Update successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating apartment:");
    console.error("  - Status:", error.response?.status);
    console.error("  - Status Text:", error.response?.statusText);
    console.error("  - Data:", error.response?.data);
    console.error("  - URL attempted:", error.config?.url);
    console.error("  - Method:", error.config?.method);
    console.error("  - Base URL:", API.defaults.baseURL);
    throw error;
  }
};

// Delete apartment
export const deleteApartment = async (id) => {
  try {
    const response = await API.delete(`/api/apartments/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting apartment:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// src/services/api.js - Add deleteInquiry export

/* ================================
   INQUIRY ENDPOINTS
================================ */

// Get all inquiries (Admin)
export const getInquiries = async () => {
  try {
    const response = await API.get("/api/inquiries");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching inquiries:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Get inquiries for a specific apartment
export const getInquiriesByApartment = async (apartmentId) => {
  try {
    const response = await API.get(`/api/inquiries/apartment/${apartmentId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching apartment inquiries:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// src/services/api.js - Add these two functions at the end of the file

// 👇 ADD THIS: Toggle read status
export const toggleReadStatus = async (id) => {
  try {
    const response = await API.patch(`/api/inquiries/${id}/toggle-read`);
    return response.data;
  } catch (error) {
    console.error(
      "Error toggling read status:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// 👇 ADD THIS: Mark multiple inquiries as read
export const markMultipleAsRead = async (ids) => {
  try {
    const response = await API.patch("/api/inquiries/mark-read", { ids });
    return response.data;
  } catch (error) {
    console.error(
      "Error marking as read:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// src/services/api.js - Add new reply functions

// 👇 NEW: Mark as replied
export const markAsReplied = async (id, replyMessage = "") => {
  try {
    const response = await API.patch(`/api/inquiries/${id}/mark-replied`, {
      replyMessage,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error marking as replied:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// 👇 NEW: Mark multiple as replied
export const markMultipleAsReplied = async (ids) => {
  try {
    const response = await API.patch("/api/inquiries/mark-replied", { ids });
    return response.data;
  } catch (error) {
    console.error(
      "Error marking as replied:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// 👇 NEW: Add reply message
export const addReply = async (id, replyMessage) => {
  try {
    const response = await API.patch(`/api/inquiries/${id}/reply`, {
      replyMessage,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding reply:", error.response?.data || error.message);
    throw error;
  }
};

// DELETE inquiry - Add this!
export const deleteInquiry = async (id) => {
  try {
    const response = await API.delete(`/api/inquiries/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting inquiry:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
