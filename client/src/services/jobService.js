import api from "./api";

// =======================
// Get All Jobs
// =======================
export const getAllJobs = async ({
  page = 1,
  search = "",
  company = "All",
  status = "All",
  location = "All",
  cgpa = "All",
  package: minPackage = "All",
  sort = "Newest",
} = {}) => {
  const response = await api.get("/jobs", {
    params: {
      page,
      limit: 9,
      search,
      company,
      status,
      location,
      cgpa,
      package: minPackage,
      sort,
    },
  });

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