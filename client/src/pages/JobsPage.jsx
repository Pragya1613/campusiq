import { useEffect, useState } from "react";
import PublicLayout from "../layouts/PublicLayout";
import { getAllJobs } from "../services/jobService";
import { applyForJob } from "../services/applicationService";
import toast from "react-hot-toast";

function JobsPage() {

  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = async () => {

    try {

      const data = await getAllJobs();

      setJobs(data);

    }

    catch (error) {

      console.log(error);

    }

  };

  const handleApply = async (jobId) => {

    try {

      const data = await applyForJob(jobId);

      toast.success(data.message);

    }

    catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Application Failed"
      );

    }

  };

  const filteredJobs =
    jobs.filter(
      (job) =>
        job.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        job.companyName
          .toLowerCase()
          .includes(search.toLowerCase())
    );

  return (

    <PublicLayout>

      <div className="min-h-screen bg-gray-100 px-6 py-10">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold text-[#172554] mb-2">

            Available Jobs

          </h1>

          <p className="text-gray-500 mb-8">

            Browse and apply for placement opportunities.

          </p>

          {/* Search */}

          <div className="mb-8">

            <input
              type="text"
              placeholder="Search by Job Title or Company..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full md:w-96 px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

          </div>

          {/* Jobs */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {filteredJobs.length > 0 ? (

              filteredJobs.map((job) => (

                <div
                  key={job._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200"
                >

                  <div className="flex justify-between items-start mb-4">

                    <div>

                      <h2 className="text-2xl font-bold text-[#172554]">

                        {job.title}

                      </h2>

                      <p className="text-gray-600 mt-1">

                        {job.companyName}

                      </p>

                    </div>

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">

                      {job.package
                        ? `₹ ${job.package} LPA`
                        : "Package N/A"}

                    </span>

                  </div>

                  <div className="space-y-3 text-gray-600 mb-6">

                    <p>

                      <i className="fa-solid fa-location-dot text-red-500 mr-2"></i>

                      {job.location}

                    </p>

                    <p>

                      <i className="fa-solid fa-chart-line text-orange-500 mr-2"></i>

                      Minimum CGPA :

                      <span className="font-semibold ml-1">

                        {job.eligibilityCgpa}

                      </span>

                    </p>

                    <p>

                      <i className="fa-solid fa-circle-check text-green-500 mr-2"></i>

                      Status :

                      <span
                        className={`ml-1 font-semibold ${
                          job.isActive
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >

                        {job.isActive
                          ? "Active"
                          : "Closed"}

                      </span>

                    </p>

                    {job.requiredSkills?.length > 0 && (

                      <div className="flex flex-wrap gap-2">

                        {job.requiredSkills.map(
                          (skill, index) => (

                            <span
                              key={index}
                              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                            >

                              {skill}

                            </span>

                          )
                        )}

                      </div>

                    )}

                    <p>

                      <i className="fa-solid fa-calendar-days text-blue-500 mr-2"></i>

                      Deadline :

                      <span className="font-semibold ml-1">

                        {job.deadline
                          ? new Date(
                              job.deadline
                            ).toLocaleDateString()
                          : "N/A"}

                      </span>

                    </p>

                  </div>

                  <button
                    onClick={() =>
                      handleApply(job._id)
                    }
                    className="w-full bg-[#172554] text-white py-3 rounded-xl font-semibold hover:bg-[#0f1d46] transition"
                  >

                    Apply Now

                  </button>

                </div>

              ))

            ) : (

              <div className="col-span-full bg-white rounded-2xl p-12 text-center">

                <i className="fa-solid fa-briefcase text-5xl text-gray-300 mb-5"></i>

                <h2 className="text-2xl font-bold">

                  No Jobs Found

                </h2>

                <p className="text-gray-500 mt-2">

                  No placement opportunities available.

                </p>

              </div>

            )}

          </div>

        </div>

      </div>

    </PublicLayout>

  );

}

export default JobsPage;