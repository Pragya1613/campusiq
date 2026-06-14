import api from "./api";

export const getMyApplications =
  async () => {
    const token =
      localStorage.getItem("token");

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