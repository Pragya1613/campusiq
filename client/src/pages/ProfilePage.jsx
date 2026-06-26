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

  const [resumeFile, setResumeFile] =
    useState(null);

  const [formData, setFormData] =
    useState({

      fullName: "",

      email: "",

      enrollmentNumber: "",

      branch: "",

      phone: "",

      cgpa: "",

      currentSemester: "",

      skills: "",

      githubUrl: "",

      linkedinUrl: "",

      leetcodeUrl: "",

      resumeUrl: "",

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

          fullName:
            data.fullName || "",

          email:
            data.email || "",

          enrollmentNumber:
            data.enrollmentNumber || "",

          branch:
            data.branch || "",

          phone:
            data.phone || "",

          cgpa:
            data.cgpa || "",

          currentSemester:
            data.currentSemester || "",

          skills:
            data.skills?.join(", ") ||
            "",

          githubUrl:
            data.githubUrl || "",

          linkedinUrl:
            data.linkedinUrl || "",

          leetcodeUrl:
            data.leetcodeUrl || "",

          resumeUrl:
            data.resumeUrl || "",

        });

      }

      catch (error) {

        console.log(error);

      }

    };

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,

      });

    };

  const handleResumeChange =
    (e) => {

      const file =
        e.target.files[0];

      if (!file)
        return;

      if (
        file.type !==
        "application/pdf"
      ) {

        alert(
          "Only PDF resumes are allowed."
        );

        return;

      }

      if (
        file.size >
        5 * 1024 * 1024
      ) {

        alert(
          "Maximum file size is 5 MB."
        );

        return;

      }

      setResumeFile(file);

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

              .map((skill) =>
                skill.trim()
              )

              .filter(
                Boolean
              ),

          resume:
            resumeFile,

        });

        alert(
          "Profile Updated Successfully"
        );

        navigate(
          "/dashboard"
        );

      }

      catch (error) {

        console.log(error);

        alert(

          error.response?.data
            ?.message ||

          "Failed To Update Profile"

        );

      }

    };

  return (

    <PublicLayout>

      <div className="min-h-screen bg-gray-100 py-10 px-6">

        <div className="max-w-5xl mx-auto">

          <div className="bg-white rounded-3xl shadow-xl p-10">

            <div className="text-center mb-10">

              <i className="fa-solid fa-user-graduate text-5xl text-orange-500 mb-4"></i>

              <h1 className="text-4xl font-bold text-[#172554]">

                Complete Your Profile

              </h1>

              <p className="text-gray-500 mt-2">

                Build your placement-ready profile

              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-10"
            >
            
                          {/* Basic Information */}

              <div>

                <div className="flex items-center gap-3 mb-6">

                  <i className="fa-solid fa-address-card text-orange-500 text-xl"></i>

                  <h2 className="text-2xl font-semibold text-[#172554]">

                    Basic Information

                  </h2>

                </div>

                <div className="grid md:grid-cols-2 gap-5">

                  <input
                    type="text"
                    value={formData.fullName}
                    readOnly
                    className="border rounded-xl p-3 bg-gray-100 text-gray-600"
                  />

                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    className="border rounded-xl p-3 bg-gray-100 text-gray-600"
                  />

                  <input
                    type="text"
                    value={formData.enrollmentNumber}
                    readOnly
                    className="border rounded-xl p-3 bg-gray-100 text-gray-600"
                  />

                  <input
                    type="text"
                    value={formData.branch}
                    readOnly
                    className="border rounded-xl p-3 bg-gray-100 text-gray-600"
                  />

                </div>

              </div>

              {/* Academic Details */}

              <div>

                <div className="flex items-center gap-3 mb-6">

                  <i className="fa-solid fa-graduation-cap text-orange-500 text-xl"></i>

                  <h2 className="text-2xl font-semibold text-[#172554]">

                    Academic Details

                  </h2>

                </div>

                <div className="grid md:grid-cols-3 gap-5">

                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />

                  <input
                    type="number"
                    name="cgpa"
                    min="0"
                    max="10"
                    step="0.01"
                    placeholder="CGPA"
                    value={formData.cgpa}
                    onChange={handleChange}
                    className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />

                  <input
                    type="number"
                    name="currentSemester"
                    min="1"
                    max="8"
                    placeholder="Current Semester"
                    value={formData.currentSemester}
                    onChange={handleChange}
                    className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />

                </div>

              </div>

              {/* Skills */}

              <div>

                <div className="flex items-center gap-3 mb-6">

                  <i className="fa-solid fa-layer-group text-orange-500 text-xl"></i>

                  <h2 className="text-2xl font-semibold text-[#172554]">

                    Technical Skills

                  </h2>

                </div>

                <textarea
                  name="skills"
                  rows="4"
                  placeholder="React, Node.js, Express, MongoDB, Tailwind CSS..."
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />

                <p className="text-sm text-gray-500 mt-2">

                  Separate each skill using commas.

                </p>

              </div>

              {/* Coding Profiles */}

              <div>

                <div className="flex items-center gap-3 mb-6">

                  <i className="fa-solid fa-link text-orange-500 text-xl"></i>

                  <h2 className="text-2xl font-semibold text-[#172554]">

                    Coding Profiles

                  </h2>

                </div>

                <div className="space-y-4">

                  <input
                    type="url"
                    name="githubUrl"
                    placeholder="GitHub Profile URL"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />

                  <input
                    type="url"
                    name="linkedinUrl"
                    placeholder="LinkedIn Profile URL"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />

                  <input
                    type="url"
                    name="leetcodeUrl"
                    placeholder="LeetCode Profile URL"
                    value={formData.leetcodeUrl}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />

                </div>

              </div>

                            {/* Resume */}

              <div>

                <div className="flex items-center gap-3 mb-6">

                  <i className="fa-solid fa-file-lines text-orange-500 text-xl"></i>

                  <h2 className="text-2xl font-semibold text-[#172554]">

                    Resume

                  </h2>

                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:border-orange-400 transition">

                  <div className="flex items-center justify-between flex-wrap gap-6">

                    <div className="flex items-center gap-4">

                      <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">

                        <i className="fa-solid fa-file-pdf text-red-500 text-3xl"></i>

                      </div>

                      <div>

                        <h3 className="text-xl font-semibold text-[#172554]">

                          Upload Resume

                        </h3>

                        <p className="text-gray-500 text-sm">

                          PDF only • Maximum 5 MB

                        </p>

                      </div>

                    </div>

                    <label className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition">

                      {resumeFile || formData.resumeUrl
                          ? "Replace Resume"
                            : "Choose Resume"}

                      <input
                        type="file"
                        accept=".pdf"
                        hidden
                        onChange={handleResumeChange}
                      />

                    </label>

                  </div>

                  {resumeFile && (

                    <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <i className="fa-solid fa-circle-check text-green-600"></i>

                        <div>

                          <p className="font-medium text-green-700">

                            {resumeFile.name}

                          </p>

                          <p className="text-sm text-gray-500">

                            Ready to upload

                          </p>

                        </div>

                      </div>

                    </div>

                  )}

                {formData.resumeUrl && (
                
                <div className="mt-5 p-4 rounded-xl border border-green-200 bg-green-50">
                
                  <div className="flex items-center justify-between">
                
                    <div className="flex items-center gap-3">
                
                      <i className="fa-solid fa-file-pdf text-red-500 text-2xl"></i>
                
                      <div>
                
                        <p className="font-semibold text-gray-800">
                          {formData.resumeName || "Resume.pdf"}
                        </p>
                
                        <p className="text-sm text-green-600">
                          Resume uploaded successfully
                        </p>
                
                      </div>
                
                    </div>
                
                    <div className="flex gap-3">
                
                      <a
                        href={formData.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-lg bg-[#172554] text-white hover:bg-[#0f1d46] transition"
                      >
                        View
                      </a>
                
                      <button
                
                        onClick={async () => {
                
                          const response =
                            await fetch(formData.resumeUrl);
                
                          const blob =
                            await response.blob();
                
                          const url =
                            window.URL.createObjectURL(blob);
                
                          const link =
                            document.createElement("a");
                
                          link.href = url;
                
                          link.download =
                            formData.resumeName || "Resume.pdf";
                
                          document.body.appendChild(link);
                
                          link.click();
                
                          link.remove();
                
                          window.URL.revokeObjectURL(url);
                
                        }}
                  
                          className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
                  
                        >
                  
                          Download
                  
                        </button>
                  
                      </div>
                  
                    </div>
                  
                  </div>
                  
                )}  

                </div>

              </div>

              {/* Submit */}

              <button

                type="submit"

                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl text-lg font-semibold transition duration-300"

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