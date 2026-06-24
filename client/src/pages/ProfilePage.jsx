import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import {
  getProfile,
  updateProfile,
} from "../services/profileService";

function ProfilePage() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      phone: "",
      cgpa: "",
      currentSemester: "",
      skills: "",
      resumeUrl: "",
      githubUrl: "",
      linkedinUrl: "",
      leetcodeUrl: "",
    });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile =
    async () => {

      try {

        const data =
          await getProfile();

        setFormData({
          phone:
            data.phone || "",

          cgpa:
            data.cgpa || "",

          currentSemester:
            data.currentSemester || "",

          skills:
            data.skills?.join(", ") ||
            "",

          resumeUrl:
            data.resumeUrl || "",

          githubUrl:
            data.githubUrl || "",

          linkedinUrl:
            data.linkedinUrl || "",

          leetcodeUrl:
            data.leetcodeUrl || "",
        });

      } catch (error) {

        console.log(error);

      }
    };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await updateProfile({
          ...formData,

          skills:
            formData.skills
              .split(",")
              .map(
                (skill) =>
                  skill.trim()
              ),
        });

        alert(
          "Profile Updated Successfully"
        );

        navigate("/dashboard");

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Update Profile"
        );

      }

    };

  return (
    <PublicLayout>
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-3xl mx-auto">

        <div className="bg-white shadow-xl rounded-2xl p-8">

          <h1 className="text-4xl font-bold text-[#1E3A8A] mb-8 text-center">
            Complete Your Profile
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="number"
              name="cgpa"
              placeholder="CGPA"
              value={formData.cgpa}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="number"
              name="currentSemester"
              placeholder="Current Semester"
              value={
                formData.currentSemester
              }
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              name="skills"
              placeholder="Skills (comma separated)"
              value={formData.skills}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              name="resumeUrl"
              placeholder="Resume URL"
              value={
                formData.resumeUrl
              }
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              name="githubUrl"
              placeholder="GitHub URL"
              value={
                formData.githubUrl
              }
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              name="linkedinUrl"
              placeholder="LinkedIn URL"
              value={
                formData.linkedinUrl
              }
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              name="leetcodeUrl"
              placeholder="LeetCode URL"
              value={
                formData.leetcodeUrl
              }
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
            >
              Save Profile
            </button>

          </form>

        </div>

      </div>

    </div>
   </PublicLayout>
  );
}

export default ProfilePage;