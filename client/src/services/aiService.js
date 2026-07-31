import api from "./api";

export const extractProfile = async (resumeFile) => {
  try {
    const formData = new FormData();

    formData.append("resume", resumeFile);

    const { data } = await api.post(
      "/ai/extract-profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    console.error("AI Service Error:", error);

    throw error;
  }
};