import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/ai`;

// ==========================================
// STEP 1
// Extract Profile From Resume
// ==========================================

export const extractProfile = async (formData) => {
  try {
    const response = await axios.post(
      `${API}/extract-profile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Extract Profile Error:", error);

    throw error;
  }
};

// ==========================================
// STEP 2
// Analyze Extracted Profile
// ==========================================

export const analyzeProfile = async (profile) => {
  try {
    const response = await axios.post(
      `${API}/analyze-profile`,
      {
        profile,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Analyze Profile Error:", error);

    throw error;
  }
};


export const extractExistingResume = async () => {
  try {

    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API}/extract-existing-profile`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "Extract Existing Resume Error:",
      error
    );

    throw error;

  }
};



export const saveAIScan = async (scanData) => {
  try {

    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API}/save-scan`,
      scanData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "Save AI Scan Error:",
      error
    );

    throw error;

  }
};




export const getAIScanHistory = async () => {
  try {

    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${API}/history`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "Get AI Scan History Error:",
      error
    );

    throw error;

  }
};




export const getAIScanById = async (id) => {
  try {

    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${API}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "Get AI Scan Error:",
      error
    );

    throw error;

  }
};




export const deleteAIScan = async (id) => {
  try {

    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `${API}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "Delete AI Scan Error:",
      error
    );

    throw error;

  }
};