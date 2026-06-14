import api from "./api";

export const getStudentDashboard =
  async () => {
    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        "/dashboard/student",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };