// src/services/clientApi.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
});

// ================================
// PUBLIC APARTMENT ENDPOINTS
// ================================

// Get all available apartments (with optional filters)
export const getPublicApartments = async (params = {}) => {
  try {
    const response = await API.get("/api/public/apartments", { params });
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
export const getPublicApartmentById = async (id) => {
  try {
    const response = await API.get(`/api/public/apartments/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching apartment:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// ================================
// PUBLIC INQUIRY ENDPOINTS
// ================================

// Submit new inquiry
export const submitPublicInquiry = async (inquiryData) => {
  try {
    const response = await API.post("/api/public/inquiries", inquiryData);
    return response.data;
  } catch (error) {
    console.error(
      "Error submitting inquiry:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// ================================
// FILTER OPTIONS (we built this earlier)
// ================================

export const getFilterOptions = async () => {
  try {
    const response = await API.get("/api/public/filter-options");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching filter options:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
