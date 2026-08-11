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

import toast from "react-hot-toast";

import {
  deleteAccount,
} from "../services/authService";

import {
  extractProfile,
  analyzeProfile,
  extractExistingResume,
  saveAIScan,
} from "../services/aiService";

import ConfirmModal from "../components/ConfirmModal";

import AIReviewModal from "../components/ai/AIReviewModal";


function ProfilePage() {

  const navigate = useNavigate();


  const [resumeFile, setResumeFile] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [isReviewing, setIsReviewing] =
    useState(false);

  const [showAIReview, setShowAIReview] =
    useState(false);

  const [aiReviewData, setAIReviewData] =
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


  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    if (name === "phone") {

      if (!/^\d*$/.test(value))
        return;

      if (value.length > 10)
        return;

    }


    setFormData({

      ...formData,

      [name]: value,

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

        toast.error(
          "Only PDF resumes are allowed."
        );

        return;

      }


      if (
        file.size >
        5 * 1024 * 1024
      ) {

        toast.error(
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
              .filter(Boolean),

          resume:
            resumeFile,

        });


        toast.success(
          "Profile Updated Successfully"
        );

        await fetchProfile();

      }

      catch (error) {

        console.log(error);

        toast.error(

          error.response?.data
            ?.message ||

          "Failed To Update Profile"

        );

      }

    };


  const handleAIReview =
    async () => {

      try {

        setIsReviewing(true);

        let extractedResponse;


        // ===========================================
        // STEP 1 : Extract Profile
        // ===========================================

        if (resumeFile) {

          const formData =
            new FormData();

          formData.append(
            "resume",
            resumeFile
          );

          extractedResponse =
            await extractProfile(
              formData
            );

        }

        else if (formData.resumeUrl) {

          extractedResponse =
            await extractExistingResume();

        }

        else {

          toast.error(
            "Please upload a resume first."
          );

          return;

        }


        console.log(
          "Extracted Profile:",
          extractedResponse
        );


        // ===========================================
        // STEP 2 : Analyze Profile
        // ===========================================

        const analysisResponse =
          await analyzeProfile(
            extractedResponse.data
          );


        console.log(
          "Analysis:",
          analysisResponse
        );


        // ===========================================
        // STEP 3 : Merge Both Responses
        // ===========================================

        const finalAIData = {

          ...extractedResponse.data,

          analysis:
            analysisResponse.data,

        };


        console.log(
          "========== EXTRACTED =========="
        );

        console.log(
          extractedResponse
        );

        console.log(
          "========== ANALYSIS =========="
        );

        console.log(
          analysisResponse
        );

        console.log(
          "========== FINAL =========="
        );

        console.log(
          finalAIData
        );


        setAIReviewData(
          finalAIData
        );

        setShowAIReview(true);

      }

      catch (error) {

        console.error(error);

        toast.error(

          error.response?.data?.message ||

          "AI Review Failed"

        );

      }

      finally {

        setIsReviewing(false);

      }

    };


  const handleSaveAIScan =
    async () => {

      try {

        if (!aiReviewData) {

          toast.error(
            "Nothing to save."
          );

          return;

        }


        const payload = {

          extractedProfile: {

            fullName:
              aiReviewData.fullName,

            email:
              aiReviewData.email,

            phone:
              aiReviewData.phone,

            branch:
              aiReviewData.branch,

            passingYear:
              aiReviewData.passingYear,

            cgpa:
              aiReviewData.cgpa,

            githubUrl:
              aiReviewData.githubUrl,

            linkedinUrl:
              aiReviewData.linkedinUrl,

            leetcodeUrl:
              aiReviewData.leetcodeUrl,

            portfolioUrl:
              aiReviewData.portfolioUrl,

            skills:
              aiReviewData.skills,

            projects:
              aiReviewData.projects,

            internships:
              aiReviewData.internships,

            certifications:
              aiReviewData.certifications,

            achievements:
              aiReviewData.achievements,

            positionsOfResponsibility:
              aiReviewData.positionsOfResponsibility,

          },

          ...aiReviewData.analysis,

        };


        const response =
          await saveAIScan(
            payload
          );


        toast.success(
          response.message
        );


        setShowAIReview(false);

        setAIReviewData(null);

      }

      catch (error) {

        console.error(error);

        toast.error(

          error.response?.data?.message ||

          "Failed to save AI Scan."

        );

      }

    };


  const handleDeleteAccount =
    async () => {

      try {

        const data =
          await deleteAccount();


        toast.success(
          data.message
        );


        setShowDeleteModal(false);


        sessionStorage.removeItem(
          "token"
        );

        sessionStorage.removeItem(
          "student"
        );


        navigate(
          "/login",
          {
            replace: true,
          }
        );

      }

      catch (error) {

        toast.error(

          error.response?.data?.message ||

          "Failed to delete account"

        );

      }

    };


  return (

    <PublicLayout>

      <div className="min-h-screen bg-[#f8fafc]">

        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10 lg:py-12">


          {/* =====================================
              PAGE HEADER
          ===================================== */}

          <div className="mb-10">

            <p className="text-sm font-semibold tracking-[0.22em] text-orange-500 uppercase mb-3">
              PROFILE & SETTINGS
            </p>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

              <div>

                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#172554]">
                  Your Profile
                </h1>

                <p className="mt-3 text-base lg:text-lg text-slate-500 max-w-2xl">
                  Keep your profile updated to improve your placement opportunities.
                </p>

              </div>


              {/* Profile status */}

              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-4 py-2.5 shadow-sm self-start">

                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>

                <span className="text-sm font-medium text-slate-600">
                  Placement Profile
                </span>

              </div>

            </div>

          </div>


          {/* =====================================
              MAIN PROFILE CONTAINER
          ===================================== */}

          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 lg:p-8">


            {/* =====================================
                PROFILE INTRO
            ===================================== */}

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-8 mb-8 border-b border-slate-100">

              <div className="w-16 h-16 shrink-0 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">

                <i className="fa-regular fa-user text-2xl text-[#172554]"></i>

              </div>


              <div className="text-center sm:text-left">

                <h2 className="text-2xl lg:text-3xl font-bold text-[#172554]">

                  Welcome back,{" "}

                  {formData.fullName.split(" ")[0]}

                </h2>

                <p className="text-slate-500 mt-1.5">
                  Build and maintain your placement-ready profile.
                </p>

              </div>

            </div>


            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >


              {/* =====================================
                  BASIC INFORMATION
              ===================================== */}

              <div className="border border-slate-200 rounded-2xl overflow-hidden">

                <div className="px-6 py-5 bg-slate-50/70 border-b border-slate-200 flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

                    <i className="fa-solid fa-address-card text-[#172554]"></i>

                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-[#172554]">
                      Basic Information
                    </h2>

                    <p className="text-sm text-slate-500">
                      Your registered college and account details.
                    </p>

                  </div>

                </div>


                <div className="p-6">

                  <div className="grid md:grid-cols-2 gap-5">


                    <div>

                      <label className="block text-sm font-semibold text-slate-600 mb-2">
                        Full Name
                      </label>

                      <div className="relative">

                        <i className="fa-regular fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                        <input
                          type="text"
                          value={formData.fullName}
                          readOnly
                          className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 font-medium outline-none cursor-not-allowed"
                        />

                      </div>

                    </div>


                    <div>

                      <label className="block text-sm font-semibold text-slate-600 mb-2">
                        Email
                      </label>

                      <div className="relative">

                        <i className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                        <input
                          type="email"
                          value={formData.email}
                          readOnly
                          className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 font-medium outline-none cursor-not-allowed"
                        />

                      </div>

                    </div>


                    <div>

                      <label className="block text-sm font-semibold text-slate-600 mb-2">
                        Enrollment Number
                      </label>

                      <div className="relative">

                        <i className="fa-solid fa-id-card absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                        <input
                          type="text"
                          value={formData.enrollmentNumber}
                          readOnly
                          className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 font-medium outline-none cursor-not-allowed"
                        />

                      </div>

                    </div>


                    <div>

                      <label className="block text-sm font-semibold text-slate-600 mb-2">
                        Branch
                      </label>

                      <div className="relative">

                        <i className="fa-solid fa-code-branch absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                        <input
                          type="text"
                          value={formData.branch}
                          readOnly
                          className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 font-medium outline-none cursor-not-allowed"
                        />

                      </div>

                    </div>

                  </div>

                </div>

              </div>


              {/* =====================================
                  ACADEMIC DETAILS
              ===================================== */}

              <div className="border border-slate-200 rounded-2xl overflow-hidden">

                <div className="px-6 py-5 bg-slate-50/70 border-b border-slate-200 flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">

                    <i className="fa-solid fa-graduation-cap text-purple-600"></i>

                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-[#172554]">
                      Academic Details
                    </h2>

                    <p className="text-sm text-slate-500">
                      Keep your current academic information updated.
                    </p>

                  </div>

                </div>


                <div className="p-6">

                  <div className="grid md:grid-cols-3 gap-5">


                    <div>

                      <label className="block text-sm font-semibold text-slate-600 mb-2">
                        Phone Number
                      </label>

                      <div className="relative">

                        <i className="fa-solid fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="10-digit number"
                          maxLength={10}
                          pattern="[0-9]{10}"
                          className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#172554]/15 focus:border-[#172554] transition"
                        />

                      </div>

                    </div>


                    <div>

                      <label className="block text-sm font-semibold text-slate-600 mb-2">
                        CGPA
                      </label>

                      <div className="relative">

                        <i className="fa-solid fa-chart-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                        <input
                          type="number"
                          name="cgpa"
                          min="0"
                          max="10"
                          step="0.01"
                          placeholder="e.g. 9.3"
                          value={formData.cgpa}
                          onChange={handleChange}
                          className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#172554]/15 focus:border-[#172554] transition"
                        />

                      </div>

                    </div>


                    <div>

                      <label className="block text-sm font-semibold text-slate-600 mb-2">
                        Current Semester
                      </label>

                      <div className="relative">

                        <i className="fa-solid fa-calendar-days absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                        <input
                          type="number"
                          name="currentSemester"
                          min="1"
                          max="8"
                          placeholder="e.g. 5"
                          value={formData.currentSemester}
                          onChange={handleChange}
                          className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#172554]/15 focus:border-[#172554] transition"
                        />

                      </div>

                    </div>

                  </div>

                </div>

              </div>


              {/* =====================================
                  TECHNICAL SKILLS
              ===================================== */}

              <div className="border border-slate-200 rounded-2xl overflow-hidden">

                <div className="px-6 py-5 bg-slate-50/70 border-b border-slate-200 flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">

                    <i className="fa-solid fa-layer-group text-orange-500"></i>

                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-[#172554]">
                      Technical Skills
                    </h2>

                    <p className="text-sm text-slate-500">
                      Add technologies and skills relevant to placements.
                    </p>

                  </div>

                </div>


                <div className="p-6">

                  <textarea
                    name="skills"
                    rows="4"
                    placeholder="Example: React, Node.js, Express.js, MongoDB, Tailwind CSS, C++, SQL"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-[#172554]/15 focus:border-[#172554] transition"
                  />

                  <div className="flex items-center gap-2 mt-2">

                    <i className="fa-solid fa-circle-info text-xs text-slate-400"></i>

                    <p className="text-sm text-slate-500">
                      Separate each skill using commas.
                    </p>

                  </div>

                </div>

              </div>


              {/* =====================================
                  CODING PROFILES
              ===================================== */}

              <div className="border border-slate-200 rounded-2xl overflow-hidden">

                <div className="px-6 py-5 bg-slate-50/70 border-b border-slate-200 flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

                    <i className="fa-solid fa-link text-blue-600"></i>

                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-[#172554]">
                      Coding Profiles
                    </h2>

                    <p className="text-sm text-slate-500">
                      Add your professional and coding platform profiles.
                    </p>

                  </div>

                </div>


                <div className="p-6 space-y-5">


                  <div>

                    <label className="block text-sm font-semibold text-slate-600 mb-2">
                      GitHub
                    </label>

                    <div className="relative">

                      <i className="fa-brands fa-github absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                      <input
                        type="url"
                        name="githubUrl"
                        placeholder="https://github.com/username"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#172554]/15 focus:border-[#172554] transition"
                      />

                    </div>

                  </div>


                  <div>

                    <label className="block text-sm font-semibold text-slate-600 mb-2">
                      LinkedIn
                    </label>

                    <div className="relative">

                      <i className="fa-brands fa-linkedin absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                      <input
                        type="url"
                        name="linkedinUrl"
                        placeholder="https://linkedin.com/in/username"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#172554]/15 focus:border-[#172554] transition"
                      />

                    </div>

                  </div>


                  <div>

                    <label className="block text-sm font-semibold text-slate-600 mb-2">
                      LeetCode
                    </label>

                    <div className="relative">

                      <i className="fa-solid fa-code absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                      <input
                        type="url"
                        name="leetcodeUrl"
                        placeholder="https://leetcode.com/username"
                        value={formData.leetcodeUrl}
                        onChange={handleChange}
                        className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#172554]/15 focus:border-[#172554] transition"
                      />

                    </div>

                  </div>

                </div>

              </div>


              {/* =====================================
                  RESUME
              ===================================== */}

              <div className="border border-slate-200 rounded-2xl overflow-hidden">

                <div className="px-6 py-5 bg-slate-50/70 border-b border-slate-200 flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">

                    <i className="fa-solid fa-file-lines text-red-500"></i>

                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-[#172554]">
                      Resume
                    </h2>

                    <p className="text-sm text-slate-500">
                      Upload your latest placement-ready resume.
                    </p>

                  </div>

                </div>


                <div className="p-6">


                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 lg:p-7 bg-slate-50/40 hover:border-orange-300 transition">

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">


                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 shrink-0 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">

                          <i className="fa-solid fa-file-pdf text-red-500 text-2xl"></i>

                        </div>


                        <div>

                          <h3 className="text-lg font-bold text-[#172554]">

                            {formData.resumeUrl
                              ? "Resume Uploaded"
                              : "Upload Resume"}

                          </h3>

                          <p className="text-sm text-slate-500 mt-1">
                            PDF only • Maximum 5 MB
                          </p>

                        </div>

                      </div>


                      <label className="cursor-pointer shrink-0 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition shadow-sm">

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


                    {/* Newly selected file */}

                    {resumeFile && (

                      <div className="mt-5 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">

                        <i className="fa-solid fa-circle-check text-emerald-600"></i>

                        <div>

                          <p className="font-semibold text-emerald-700">
                            {resumeFile.name}
                          </p>

                          <p className="text-sm text-slate-500 mt-0.5">
                            Selected • Waiting to save changes
                          </p>

                        </div>

                      </div>

                    )}


                    {/* Existing resume */}

                    {formData.resumeUrl && (

                      <div className="mt-5 bg-emerald-50 border border-emerald-200 rounded-xl p-5">

                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">


                          <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-white border border-red-100 flex items-center justify-center">

                              <i className="fa-solid fa-file-pdf text-red-500 text-xl"></i>

                            </div>


                            <div>

                              <p className="font-semibold text-slate-800">
                                {formData.resumeName || "Resume.pdf"}
                              </p>

                              <p className="text-sm text-emerald-600 mt-0.5">
                                Uploaded Successfully
                              </p>

                              <p className="text-xs text-slate-500 mt-1">
                                Ready for placement applications
                              </p>

                            </div>

                          </div>


                          <div className="flex flex-wrap gap-2">


                            <a
                              href={formData.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#172554] text-white hover:bg-[#0f1d46] transition font-medium"
                            >

                              <i className="fa-regular fa-eye"></i>

                              <span>
                                Preview
                              </span>

                            </a>


                            <button
                              type="button"
                              onClick={async () => {

                                const response =
                                  await fetch(
                                    formData.resumeUrl
                                  );

                                const blob =
                                  await response.blob();

                                const url =
                                  window.URL.createObjectURL(
                                    blob
                                  );

                                const link =
                                  document.createElement(
                                    "a"
                                  );

                                link.href =
                                  url;

                                link.download =
                                  formData.resumeName ||
                                  "Resume.pdf";

                                document.body.appendChild(
                                  link
                                );

                                link.click();

                                link.remove();

                                window.URL.revokeObjectURL(
                                  url
                                );

                              }}
                              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition font-medium"
                            >

                              <i className="fa-solid fa-download"></i>

                              <span>
                                Download PDF
                              </span>

                            </button>


                            <button
                              type="button"
                              onClick={handleAIReview}
                              disabled={isReviewing}
                              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition font-medium disabled:opacity-60"
                            >

                              <i className="fa-solid fa-wand-magic-sparkles"></i>

                              {isReviewing
                                ? "Reviewing..."
                                : "AI Review"}

                            </button>


                          </div>

                        </div>

                      </div>

                    )}

                  </div>

                </div>

              </div>


              {/* =====================================
                  SAVE CHANGES
              ===================================== */}

              <div className="pt-2">

                <button
                  type="submit"
                  className="w-full bg-[#172554] hover:bg-[#0f1d46] text-white py-4 rounded-xl text-base lg:text-lg font-semibold transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                >

                  <i className="fa-solid fa-floppy-disk mr-2"></i>

                  Save Changes

                </button>

              </div>


              {/* =====================================
                  DANGER ZONE
              ===================================== */}

              <div className="mt-10 border border-red-200 rounded-2xl bg-red-50/60 overflow-hidden">

                <div className="px-6 py-5 border-b border-red-100 flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">

                    <i className="fa-solid fa-triangle-exclamation text-red-600"></i>

                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-red-700">
                      Danger Zone
                    </h2>

                    <p className="text-sm text-red-600/70 mt-0.5">
                      Irreversible account actions
                    </p>

                  </div>

                </div>


                <div className="p-6">

                  <p className="text-slate-600 leading-relaxed max-w-3xl">

                    Deleting your account will permanently remove
                    your profile, applications and uploaded resume.
                    This action cannot be undone.

                  </p>


                  <button
                    type="button"
                    onClick={() =>
                      setShowDeleteModal(true)
                    }
                    className="mt-5 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold transition"
                  >

                    <i className="fa-solid fa-trash mr-2"></i>

                    Delete My Account

                  </button>

                </div>

              </div>


            </form>

          </div>

        </div>

      </div>


      {/* =====================================
          DELETE MODAL
      ===================================== */}

      <ConfirmModal

        isOpen={
          showDeleteModal
        }

        title="Delete Account"

        message="Your profile, applications and resume will be permanently deleted. This action cannot be undone."

        confirmText="Delete Forever"

        cancelText="Cancel"

        onConfirm={
          handleDeleteAccount
        }

        onClose={() =>
          setShowDeleteModal(false)
        }

      />


      {/* =====================================
          AI REVIEW MODAL
      ===================================== */}

      <AIReviewModal

        isOpen={
          showAIReview
        }

        onClose={() =>
          setShowAIReview(false)
        }

        onSave={
          handleSaveAIScan
        }

        data={
          aiReviewData
        }

        loading={
          isReviewing
        }

      />


    </PublicLayout>

  );

}


export default ProfilePage;