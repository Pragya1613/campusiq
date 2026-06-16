import api from "./api";

export const getAllApplications =
  async () => {
    const response =
      await api.get("/applications");

    return response.data;
  };

export const updateApplicationStatus =
  async (id, status) => {
    const response =
      await api.put(
        `/applications/${id}`,
        { status }
      );

    return response.data;
  };