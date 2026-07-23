import api from "./api";

// =======================
// Get All Jobs
// =======================
export const getAllJobs = async () => {
  const response = await api.get("/jobs");
  return response.data;
};

// =======================
// Get Single Job
// =======================
export const getJobById = async (jobId) => {
  const response = await api.get(`/jobs/${jobId}`);
  return response.data;
};

// =======================
// Create Job
// =======================
export const createJob = async (jobData) => {
  const response = await api.post("/jobs", jobData);
  return response.data;
};

// =======================
// Update Job
// =======================
export const updateJob = async (jobId, jobData) => {
  const response = await api.put(`/jobs/${jobId}`, jobData);
  return response.data;
};

// =======================
// Delete Job
// =======================
export const deleteJob = async (jobId) => {
  const response = await api.delete(`/jobs/${jobId}`);
  return response.data;
};