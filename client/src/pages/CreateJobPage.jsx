import { useState } from "react";
import { createJob } from "../services/jobService";
import PublicLayout from "../layouts/PublicLayout";

function CreateJobPage() {

  const [title, setTitle] =
    useState("");

  const [
    companyName,
    setCompanyName,
  ] = useState("");

  const [location, setLocation] =
    useState("");

  const [jobPackage, setJobPackage] =
    useState("");

  const [
    eligibilityCgpa,
    setEligibilityCgpa,
  ] = useState("");

  const [
    requiredSkills,
    setRequiredSkills,
  ] = useState("");

  const [deadline, setDeadline] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const jobData = {

          title,

          companyName,

          location,

          package: Number(
            jobPackage
          ),

          eligibilityCgpa:
            Number(
              eligibilityCgpa
            ),

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

        alert(
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

        alert(
          "Failed To Create Job"
        );

      }

    };

  return (

    <PublicLayout>

      <div className="min-h-screen bg-gray-100 py-12 px-6">

        <div className="max-w-4xl mx-auto">

          <div className="bg-white rounded-3xl shadow-xl p-10">

            <div className="text-center mb-10">

              <i className="fa-solid fa-briefcase text-5xl text-orange-500 mb-4"></i>

              <h1 className="text-4xl font-bold text-[#172554]">

                Create New Job

              </h1>

              <p className="text-gray-500 mt-2">

                Publish a placement opportunity

              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
            
                          {/* Job Title */}

              <div className="relative">

                <i className="fa-solid fa-briefcase absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

                <input
                  type="text"
                  placeholder="Job Title"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />

              </div>

              {/* Company & Location */}

              <div className="grid md:grid-cols-2 gap-5">

                <div className="relative">

                  <i className="fa-solid fa-building-columns absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

                  <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) =>
                      setCompanyName(e.target.value)
                    }
                    className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />

                </div>

                <div className="relative">

                  <i className="fa-solid fa-location-crosshairs absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                    className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />

                </div>

              </div>

              {/* Package & CGPA */}

              <div className="grid md:grid-cols-2 gap-5">

                <div className="relative">

                  <i className="fa-solid fa-sack-dollar absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

                  <input
                    type="number"
                    placeholder="Package (LPA)"
                    value={jobPackage}
                    onChange={(e) =>
                      setJobPackage(e.target.value)
                    }
                    className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />

                </div>

                <div className="relative">

                  <i className="fa-solid fa-chart-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.01"
                    placeholder="Minimum CGPA"
                    value={eligibilityCgpa}
                    onChange={(e) =>
                      setEligibilityCgpa(
                        e.target.value
                      )
                    }
                    className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />

                </div>

              </div>

              {/* Skills */}

              <div className="relative">

                <i className="fa-solid fa-layer-group absolute left-4 top-5 text-gray-500"></i>

                <textarea
                  rows="3"
                  placeholder="Required Skills (React, Node.js, MongoDB)"
                  value={requiredSkills}
                  onChange={(e) =>
                    setRequiredSkills(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl pt-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />

              </div>

              {/* Deadline */}

              <div className="relative">

                <i className="fa-solid fa-calendar-days absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

                <input
                  type="date"
                  value={deadline}
                  onChange={(e) =>
                    setDeadline(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />

              </div>

              {/* Description */}

              <div className="relative">

                <i className="fa-solid fa-align-left absolute left-4 top-5 text-gray-500"></i>

                <textarea
                  rows="6"
                  placeholder="Job Description"
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl pt-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />

              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-4 rounded-xl text-lg font-semibold hover:bg-orange-600 transition"
              >
                Create Job
              </button>

            </form>

          </div>

        </div>

      </div>

    </PublicLayout>

  );

}

export default CreateJobPage;