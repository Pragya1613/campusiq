import { useState } from "react";
import { createJob } from "../services/jobService";
import PublicLayout from "../layouts/PublicLayout";
import toast from "react-hot-toast";

function CreateJobPage() {
  const [title, setTitle] = useState("");

  const [companyName, setCompanyName] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [jobPackage, setJobPackage] =
    useState("");

  const [eligibilityCgpa, setEligibilityCgpa] =
    useState("");

  const [requiredSkills, setRequiredSkills] =
    useState("");

  const [deadline, setDeadline] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);

    try {
      const jobData = {
        title,

        companyName,

        location,

        package: Number(jobPackage),

        eligibilityCgpa:
          Number(eligibilityCgpa),

        requiredSkills:
          requiredSkills
            .split(",")
            .map((skill) =>
              skill.trim()
            ),

        deadline,

        description,
      };

      await createJob(jobData);

      toast.success(
        "Job Created Successfully"
      );

      setTitle("");

      setCompanyName("");

      setLocation("");

      setJobPackage("");

      setEligibilityCgpa("");

      setRequiredSkills("");

      setDeadline("");

      setDescription("");
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed To Create Job"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicLayout>

      <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8 py-10 lg:py-12">

        <div className="max-w-5xl mx-auto">

          <div className="bg-white border border-slate-200 rounded-[28px] shadow-sm overflow-hidden">

            {/* Header */}

            <div className="px-6 sm:px-10 lg:px-12 pt-9 sm:pt-11 pb-8 border-b border-slate-100">

              <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-briefcase text-2xl text-orange-500"></i>
                </div>

                <div>

                  <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-orange-500 uppercase">
                    Placement Opportunity
                  </p>

                  <h1 className="mt-1 text-3xl sm:text-4xl font-bold text-[#172554]">
                    Create New Job
                  </h1>

                  <p className="mt-2 text-slate-500">
                    Publish a placement opportunity for eligible students.
                  </p>

                </div>

              </div>

            </div>


            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="px-6 sm:px-10 lg:px-12 py-8 sm:py-10"
            >

              {/* Basic Information */}

              <div className="mb-8">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                    <i className="fa-solid fa-circle-info text-blue-600"></i>
                  </div>

                  <div>

                    <h2 className="text-lg font-semibold text-[#172554]">
                      Job Information
                    </h2>

                    <p className="text-sm text-slate-500">
                      Enter the basic details of the placement opportunity.
                    </p>

                  </div>

                </div>


                {/* Job Title */}

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Job Title
                  </label>

                  <div className="relative">

                    <i className="fa-solid fa-briefcase absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"></i>

                    <input
                      type="text"
                      placeholder="e.g. Full Stack Developer"
                      value={title}
                      onChange={(e) =>
                        setTitle(e.target.value)
                      }
                      className="w-full border border-slate-200 bg-slate-50 rounded-xl py-3.5 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition duration-200"
                      required
                    />

                  </div>

                </div>


                {/* Company + Location */}

                <div className="grid md:grid-cols-2 gap-5 mt-5">

                  <div>

                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Company Name
                    </label>

                    <div className="relative">

                      <i className="fa-solid fa-building-columns absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"></i>

                      <input
                        type="text"
                        placeholder="e.g. Adobe"
                        value={companyName}
                        onChange={(e) =>
                          setCompanyName(
                            e.target.value
                          )
                        }
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl py-3.5 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition duration-200"
                        required
                      />

                    </div>

                  </div>


                  <div>

                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Location
                    </label>

                    <div className="relative">

                      <i className="fa-solid fa-location-crosshairs absolute left-4 top-1/2 -translate-y-1/2 text-red-500"></i>

                      <input
                        type="text"
                        placeholder="e.g. Delhi NCR"
                        value={location}
                        onChange={(e) =>
                          setLocation(
                            e.target.value
                          )
                        }
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl py-3.5 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-100 transition duration-200"
                        required
                      />

                    </div>

                  </div>

                </div>

              </div>


              {/* Eligibility & Compensation */}

              <div className="mb-8">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <i className="fa-solid fa-chart-line text-emerald-600"></i>
                  </div>

                  <div>

                    <h2 className="text-lg font-semibold text-[#172554]">
                      Eligibility & Compensation
                    </h2>

                    <p className="text-sm text-slate-500">
                      Define package and minimum academic eligibility.
                    </p>

                  </div>

                </div>


                <div className="grid md:grid-cols-2 gap-5">

                  {/* Package */}

                  <div>

                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Package (LPA)
                    </label>

                    <div className="relative">

                      <i className="fa-solid fa-sack-dollar absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500"></i>

                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="e.g. 12"
                        value={jobPackage}
                        onKeyDown={(e) => {
                          if (
                            e.key === "-" ||
                            e.key === "+" ||
                            e.key.toLowerCase() === "e"
                          ) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          const value =
                            e.target.value;

                          if (value === "") {
                            setJobPackage("");
                            return;
                          }

                          const numberValue =
                            Number(value);

                          if (
                            numberValue < 0
                          ) {
                            setJobPackage("0");
                          } else {
                            setJobPackage(value);
                          }
                        }}
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl py-3.5 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition duration-200"
                        required
                      />

                    </div>

                  </div>


                  {/* CGPA */}

                  <div>

                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Minimum CGPA
                    </label>

                    <div className="relative">

                      <i className="fa-solid fa-chart-line absolute left-4 top-1/2 -translate-y-1/2 text-purple-500"></i>

                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.01"
                        placeholder="e.g. 7.5"
                        value={eligibilityCgpa}
                        onKeyDown={(e) => {
                          if (
                            e.key === "-" ||
                            e.key === "+" ||
                            e.key.toLowerCase() === "e"
                          ) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          const value =
                            e.target.value;

                          if (value === "") {
                            setEligibilityCgpa("");
                            return;
                          }

                          const numberValue =
                            Number(value);

                          if (
                            numberValue > 10
                          ) {
                            setEligibilityCgpa(
                              "10"
                            );
                          } else if (
                            numberValue < 0
                          ) {
                            setEligibilityCgpa(
                              "0"
                            );
                          } else {
                            setEligibilityCgpa(
                              value
                            );
                          }
                        }}
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl py-3.5 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition duration-200"
                        required
                      />

                    </div>

                  </div>

                </div>

              </div>


              {/* Skills */}

              <div className="mb-8">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
                    <i className="fa-solid fa-layer-group text-purple-600"></i>
                  </div>

                  <div>

                    <h2 className="text-lg font-semibold text-[#172554]">
                      Required Skills
                    </h2>

                    <p className="text-sm text-slate-500">
                      Add skills separated by commas.
                    </p>

                  </div>

                </div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Skills
                </label>

                <div className="relative">

                  <i className="fa-solid fa-code absolute left-4 top-5 text-purple-500"></i>

                  <textarea
                    rows="3"
                    placeholder="React, Node.js, MongoDB, Express.js"
                    value={requiredSkills}
                    onChange={(e) =>
                      setRequiredSkills(
                        e.target.value
                      )
                    }
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl pt-4 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 resize-none focus:outline-none focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition duration-200"
                    required
                  />

                </div>

              </div>


              {/* Deadline */}

              <div className="mb-8">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                    <i className="fa-solid fa-calendar-days text-blue-600"></i>
                  </div>

                  <div>

                    <h2 className="text-lg font-semibold text-[#172554]">
                      Application Deadline
                    </h2>

                    <p className="text-sm text-slate-500">
                      Select the final date for applications.
                    </p>

                  </div>

                </div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Deadline
                </label>

                <div className="relative">

                  <i className="fa-solid fa-calendar-days absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"></i>

                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) =>
                      setDeadline(
                        e.target.value
                      )
                    }
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl py-3.5 pl-12 pr-4 text-slate-800 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition duration-200"
                    required
                  />

                </div>

              </div>


              {/* Description */}

              <div className="mb-8">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                    <i className="fa-solid fa-align-left text-orange-500"></i>
                  </div>

                  <div>

                    <h2 className="text-lg font-semibold text-[#172554]">
                      Job Description
                    </h2>

                    <p className="text-sm text-slate-500">
                      Provide details students should know about this role.
                    </p>

                  </div>

                </div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>

                <div className="relative">

                  <i className="fa-solid fa-align-left absolute left-4 top-5 text-orange-500"></i>

                  <textarea
                    rows="6"
                    placeholder="Describe the role, responsibilities, requirements and other important details..."
                    value={description}
                    onChange={(e) =>
                      setDescription(
                        e.target.value
                      )
                    }
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl pt-4 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 resize-none focus:outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition duration-200"
                    required
                  />

                </div>

              </div>


              {/* Submit */}

              <div className="pt-2 border-t border-slate-100">

                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full mt-6 py-3.5 rounded-xl text-base font-semibold text-white shadow-sm transition-all duration-200
                    ${
                      submitting
                        ? "bg-slate-400 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    }`}
                >

                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      Creating Job...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fa-solid fa-plus"></i>
                      Create Job
                    </span>
                  )}

                </button>

                <p className="text-center text-xs text-slate-400 mt-3">
                  Make sure all job details are accurate before publishing.
                </p>

              </div>

            </form>

          </div>

        </div>

      </div>

    </PublicLayout>
  );
}

export default CreateJobPage;