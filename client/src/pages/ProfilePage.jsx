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

      <div className="min-h-screen bg-slate-50 py-12 px-6">

        <div className="max-w-5xl mx-auto">

          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-10">

            <div className="text-center mb-10">

              <div className="w-20 h-20 mx-auto rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-5">

              <i className="fa-regular fa-user text-3xl text-slate-600"></i>
              
              </div>

              <h1 className="text-2xl font-bold text-slate-900">

                <h1 className="text-3xl font-bold text-slate-900">
                  Welcome back, {formData.fullName.split(" ")[0]} 
                </h1>

                <p className="text-slate-500 font-medium mt-2">
                  Keep your profile updated to improve your placement opportunities.
                </p>

              </h1>

              <p className="text-slate-500 mt-3">

                Build your placement-ready profile

              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >
            
                          {/* Basic Information */}

              <div className="bg-white border border-slate-200 rounded-2xl p-7">

                <div className="flex items-center gap-3 mb-6">

                  <i className="fa-solid fa-address-card text-slate-700 text-lg"></i>

                  <h2 className="text-2xl font-semibold text-[#172554]">

                    Basic Information

                  </h2>

                </div>

                <div className="grid md:grid-cols-2 gap-5">

                  <input
                    type="text"
                    value={formData.fullName}
                    readOnly
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-700 font-medium shadow-sm"
                  />

                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-700 font-medium shadow-sm"
                  />

                  <input
                    type="text"
                    value={formData.enrollmentNumber}
                    readOnly
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-700 font-medium shadow-sm"
                  />

                  <input
                    type="text"
                    value={formData.branch}
                    readOnly
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-700 font-medium shadow-sm"
                  />

                </div>

              </div>

              {/* Academic Details */}

              <div className="bg-white border border-slate-200 rounded-2xl p-7">

                <div className="flex items-center gap-3 mb-6">

                  <i className="fa-solid fa-graduation-cap text-slate-700 text-lg"></i>

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
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#172554] focus:border-[#172554] transition-all duration-200"
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
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#172554] focus:border-[#172554] transition-all duration-200"
                  />

                  <input
                    type="number"
                    name="currentSemester"
                    min="1"
                    max="8"
                    placeholder="Current Semester"
                    value={formData.currentSemester}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#172554] focus:border-[#172554] transition-all duration-200"
                  />

                </div>

              </div>

              {/* Skills */}

              <div className="bg-white border border-slate-200 rounded-2xl p-7">

                <div className="flex items-center gap-3 mb-6">

                  <i className="fa-solid fa-layer-group text-slate-700 text-lg"></i>

                  <h2 className="text-2xl font-semibold text-[#172554]">

                    Technical Skills

                  </h2>

                </div>

                <textarea
                  name="skills"
                  rows="5"
                  placeholder="Example: React, Node.js, Express.js, MongoDB, Tailwind CSS, Java, C++, SQL"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#172554] focus:border-[#172554] transition-all duration-200"
                />

                <p className="text-sm text-gray-500 mt-2">

                  Separate each skill using commas.

                </p>

              </div>

              {/* Coding Profiles */}

              <div className="bg-white border border-slate-200 rounded-2xl p-7">

                <div className="flex items-center gap-3 mb-6">

                  <i className="fa-solid fa-link text-slate-700 text-lg"></i>

                  <h2 className="text-2xl font-semibold text-[#172554]">

                    Coding Profiles

                  </h2>

                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">

                    GitHub

                    </label>
                  <input
                    type="url"
                    name="githubUrl"
                    placeholder="GitHub Profile URL"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#172554] focus:border-[#172554] transition-all duration-200"
                  />

                  <label className="block text-sm font-medium text-slate-700 mb-2">

                      LinkedIn

                      </label>

                  <input
                    type="url"
                    name="linkedinUrl"
                    placeholder="LinkedIn Profile URL"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#172554] focus:border-[#172554] transition-all duration-200"
                  />

                  <label className="block text-sm font-medium text-slate-700 mb-2">

                    LeetCode  

                  </label>

                  <input
                    type="url"
                    name="leetcodeUrl"
                    placeholder="LeetCode Profile URL"
                    value={formData.leetcodeUrl}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#172554] focus:border-[#172554] transition-all duration-200"
                  />

                </div>

              </div>

                            {/* Resume */}

              <div className="bg-white border border-slate-200 rounded-2xl p-7">

                <div className="flex items-center gap-3 mb-6">

                  <i className="fa-solid fa-file-lines text-slate-700 text-lg"></i>

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

                          {formData.resumeUrl
                            ? "Resume Uploaded"
                            : "Upload Resume"}

                        </h3>

                        <p className="text-sm text-slate-500 mt-1">

                          Upload your latest placement-ready resume.

                        </p>

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

                            Selected

                            Waiting to save changes

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
                          Uploaded Successfully
                        </p>

                        <p className="text-xs text-slate-500 mt-1">

                          Ready for placement applications

                        </p>
                
                      </div>
                
                    </div>
                
                    <div className="flex gap-3">
                
                      <a
                        href={formData.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#172554] text-white hover:bg-[#0f1d46] transition"
                      >
                        <i className="fa-regular fa-eye"></i>
                        <span>Preview</span>
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
                  
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition"
                  
                        >
                  
                          <i className="fa-solid fa-download"></i>
                          <span>Download PDF</span>
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

                className="w-full bg-[#172554] hover scale-[1.01]:bg-[#0f1d46] text-white py-4 rounded-xl text-lg font-semibold transition duration-300"

              >

                Save Changes

              </button>

            </form>

          </div>

        </div>

      </div>

    </PublicLayout>

  );

}

export default ProfilePage;