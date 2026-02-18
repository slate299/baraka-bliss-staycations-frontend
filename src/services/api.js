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
    console.error("Error fetching apartments:", error.response?.data || error.message);
    throw error;
  }
};

// Get single apartment by ID
export const getApartmentById = async (id) => {
  try {
    const response = await API.get(`/api/apartments/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching apartment:", error.response?.data || error.message);
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
    console.error("Error creating apartment:", error.response?.data || error.message);
    throw error;
  }
};

// Update apartment
export const updateApartment = async (id, formData) => {
  try {
    const response = await API.put(`/api/apartments/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating apartment:", error.response?.data || error.message);
    throw error;
  }
};

// Delete apartment
export const deleteApartment = async (id) => {
  try {
    const response = await API.delete(`/api/apartments/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting apartment:", error.response?.data || error.message);
    throw error;
  }
};



/* ================================
   INQUIRY ENDPOINTS
================================ */

// Get all inquiries
export const getInquiries = async () => {
  try {
    const response = await API.get("/api/inquiries");
    return response.data;
  } catch (error) {
    console.error("Error fetching inquiries:", error.response?.data || error.message);
    throw error;
  }
};

