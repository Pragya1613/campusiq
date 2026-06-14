import api from "./api";

export const applyForJob =
  async (jobId) => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await api.post(
        "/applications",
        { jobId },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const getMyApplications =
  async () => {
    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await api.get(
        "/applications/my",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };