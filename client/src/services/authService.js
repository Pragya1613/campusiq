import api from "./api";

export const loginUser = async (
  email,
  password
) => {
  const response =
    await api.post("/auth/login", {
      email,
      password,
    });

  return response.data;
};

export const registerStudent =
  async (studentData) => {

  const response =
    await api.post(
      "/auth/register",
      studentData
    );

  return response.data;
};

export const deleteAccount = async () => {

  const response =
    await api.delete(
      "/auth/delete-account"
    );

  return response.data;

};