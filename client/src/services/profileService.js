import api from "./api";

export const getProfile = async () => {

  const token =
    localStorage.getItem("token");

  const response =
    await api.get(
      "/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;

};

export const updateProfile =
  async (profileData) => {

    const token =
      localStorage.getItem("token");

    const formData =
      new FormData();

    formData.append(
      "phone",
      profileData.phone
    );

    formData.append(
      "cgpa",
      profileData.cgpa
    );

    formData.append(
      "currentSemester",
      profileData.currentSemester
    );

    formData.append(
      "skills",
      JSON.stringify(
        profileData.skills
      )
    );

    formData.append(
      "githubUrl",
      profileData.githubUrl
    );

    formData.append(
      "linkedinUrl",
      profileData.linkedinUrl
    );

    formData.append(
      "leetcodeUrl",
      profileData.leetcodeUrl
    );

    if (
      profileData.resume
    ) {

      formData.append(
        "resume",
        profileData.resume
      );

    }

    const response =
      await api.put(
        "/auth/profile",
        formData,
        {
          headers: {

            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "multipart/form-data",

          },
        }
      );

    return response.data;

  };