import { useEffect, useState } from "react";
import PublicLayout from "../layouts/PublicLayout";
import { getAllJobs } from "../services/jobService";
import { applyForJob } from "../services/applicationService";

function JobsPage() {

  const [jobs, setJobs] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs =
    async () => {

      try {

        const data =
          await getAllJobs();

        setJobs(data);

      } catch (error) {
        console.log(error);
      }

    };

  const handleApply =
    async (jobId) => {

      try {

        const data =
          await applyForJob(jobId);

        alert(data.message);

      } catch (error) {

        alert(
          error.response?.data
            ?.message ||
            "Application Failed"
        );

      }

    };

  const filteredJobs =
    jobs.filter((job) =>
      job.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      job.companyName
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <PublicLayout>

      <div className="min-h-screen bg-gray-100 px-6 py-10">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold text-[#172554] mb-6">
            Available Jobs
          </h1>

          {/* Search Bar */}

          <div className="mb-8">

            <input
              type="text"
              placeholder="Search jobs or companies..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full md:w-96 px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

          </div>

          {/* Jobs Grid */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {filteredJobs.length >
            0 ? (

              filteredJobs.map(
                (job) => (

                  <div
                    key={job._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 border border-gray-100"
                  >

                    <div className="flex justify-between items-start mb-4">

                      <div>

                        <h2 className="text-2xl font-bold text-[#172554]">
                          {job.title}
                        </h2>

                        <p className="text-gray-600 font-medium mt-1">
                          {job.companyName}
                        </p>

                      </div>

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {job.package ||
                          "Package N/A"}
                      </span>

                    </div>

                    <div className="space-y-2 mb-6 text-gray-600">

                      <p>
                        {" "}
                        {job.location}
                      </p>

                      <p>
                         Eligible
                        Students
                      </p>

                      <p>
                         Active
                        Opportunity
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        handleApply(
                          job._id
                        )
                      }
                      className="w-full bg-[#1E3A8A] text-white py-3 rounded-xl font-semibold hover:bg-[#172554] transition"
                    >
                      Apply Now
                    </button>

                  </div>

                )
              )

            ) : (

              <div className="col-span-full text-center text-gray-500 text-lg">
                No Jobs Found
              </div>

            )}

          </div>

        </div>

      </div>

    </PublicLayout>
  );
}

export default JobsPage;
