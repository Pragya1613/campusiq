import { useEffect, useState } from "react";
import PublicLayout from "../layouts/PublicLayout";
import { getAllJobs } from "../services/jobService";
import { applyForJob } from "../services/applicationService";
import toast from "react-hot-toast";

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const jobsData = await getAllJobs();
      setJobs(jobsData);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load jobs");
    }
  };

  const handleApply = async (jobId) => {
    try {
      const data = await applyForJob(jobId);

      toast.success(data.message);

      // Refresh jobs after applying
      fetchData();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Application Failed"
      );
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.companyName.toLowerCase().includes(search.toLowerCase())
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

          <div className="mb-8">
            <input
              type="text"
              placeholder="Search by Job Title or Company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => {
                const alreadyApplied = job.alreadyApplied;
                const eligible = job.eligible;
                const closed = !job.isActive;

                return (
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
                          {job.eligibilityCgpa ?? "No Limit"}
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
                          {job.isActive ? "Active" : "Closed"}
                        </span>
                      </p>

                      {job.requiredSkills?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {job.requiredSkills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      <p>
                        <i className="fa-solid fa-calendar-days text-blue-500 mr-2"></i>
                        Deadline :
                        <span className="font-semibold ml-1">
                          {job.deadline
                            ? new Date(job.deadline).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </p>
                    </div>

                    <button
                      disabled={
                        alreadyApplied ||
                        !eligible ||
                        closed
                      }
                      onClick={() => handleApply(job._id)}
                      className={`w-full py-3 rounded-xl font-semibold transition ${
                        alreadyApplied
                          ? "bg-green-600 text-white cursor-not-allowed"
                          : !eligible
                          ? "bg-red-600 text-white cursor-not-allowed"
                          : closed
                          ? "bg-gray-500 text-white cursor-not-allowed"
                          : "bg-[#172554] hover:bg-[#0f1d46] text-white"
                      }`}
                    >
                      {alreadyApplied
                        ? "Already Applied"
                        : !eligible
                        ? "Not Eligible"
                        : closed
                        ? "Closed"
                        : "Apply Now"}
                    </button>
                  </div>
                );
              })
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