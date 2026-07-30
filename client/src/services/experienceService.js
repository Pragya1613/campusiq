import api from "./api";

/*
==========================================
Get All Companies
GET /api/interview-experiences/companies
==========================================
*/

export const getCompanies = async (
  search = "",
  sort = "Most Recent"
) => {
  const response = await api.get(
    "/interview-experiences/companies",
    {
      params: {
        search,
        sort,
      },
    }
  );

  return response.data.companies;
};

/*
==========================================
Get Company Experiences
GET /api/interview-experiences/company/:companyName
==========================================
*/

export const getCompanyExperiences = async (
  companyName,
  page = 1,
  limit = 10,
  sort = "Most Recent"
) => {
  const response = await api.get(
    `/interview-experiences/company/${companyName}`,
    {
      params: {
        page,
        limit,
        sort,
      },
    }
  );

  return response.data;
};

/*
==========================================
Get Single Experience
GET /api/interview-experiences/:id
==========================================
*/

export const getExperienceById = async (experienceId) => {
  const response = await api.get(
    `/interview-experiences/${experienceId}`
  );

  return response.data.experience;
};

/*
==========================================
Create Experience
POST /api/interview-experiences
==========================================
*/

export const createExperience = async (experienceData) => {
  const response = await api.post(
    "/interview-experiences",
    experienceData
  );

  return response.data;
};

/*
==========================================
Update Experience
PUT /api/interview-experiences/:id
==========================================
*/

export const updateExperience = async (
  experienceId,
  updatedData
) => {
  const response = await api.put(
    `/interview-experiences/${experienceId}`,
    updatedData
  );

  return response.data;
};

/*
==========================================
Delete Experience
DELETE /api/interview-experiences/:id
==========================================
*/

export const deleteExperience = async (
  experienceId
) => {
  const response = await api.delete(
    `/interview-experiences/${experienceId}`
  );

  return response.data;
};

/*
==========================================
Toggle Upvote
POST /api/interview-experiences/:id/upvote
==========================================
*/

export const toggleUpvote = async (
  experienceId
) => {
  const response = await api.post(
    `/interview-experiences/${experienceId}/upvote`
  );

  return response.data;
};