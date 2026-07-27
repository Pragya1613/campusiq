import { useEffect, useState } from "react";
import PublicLayout from "../layouts/PublicLayout";
import { getAllJobs } from "../services/jobService";
import { applyForJob } from "../services/applicationService";
import toast from "react-hot-toast";
import {
  isJobActive,
  isJobExpired,
  formatDate,
  formatPackage,
} from "../utils/jobUtils";


function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);
  
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchData(currentPage, debouncedSearch);
  }, [currentPage, debouncedSearch]);


  const fetchData = async (
    page = currentPage,
    searchText = debouncedSearch
  ) => {

    setLoading(true);
    setError("");
    try {
      const data = await getAllJobs({
        page,
        search: searchText,
      });

      if (page > data.totalPages && data.totalPages > 0) {
        setCurrentPage(data.totalPages);
        return;
      }

      setJobs(data.jobs);
      setTotalPages(data.totalPages);
    
    } catch (error) {
      console.log(error);
      setError("Failed to load jobs.");
      toast.error("Failed to load jobs");
    }
    finally {
      setLoading(false);
}
  };

  const handleApply = async (jobId) => {
    try {
      const data = await applyForJob(jobId);

      toast.success(data.message);

      // Refresh jobs after applying
      fetchData(currentPage, debouncedSearch);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Application Failed"
      );
    }
  };

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
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full md:w-96 px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>


          {loading && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 rounded-xl p-4 mb-6 text-center">
              Loading jobs...
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-center">
              {error}
            </div>
          )}


          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {jobs.length > 0 ? (
              jobs.map((job) => {
                const alreadyApplied = job.alreadyApplied;
                const eligible = job.eligible;
                const closed = !isJobActive(job);

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
                            isJobActive(job)
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {isJobActive(job) ? "Active" : "Closed"}
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
                  {search.trim()
                    ? `No jobs found for "${search.trim()}".`
                    : "No placement opportunities available."}
                </p>

              </div>
            )}

            {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#172554] text-white hover:bg-[#0f1d46]"
                }`}
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-lg font-semibold transition ${
                    currentPage === index + 1
                      ? "bg-orange-500 text-white"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#172554] text-white hover:bg-[#0f1d46]"
                }`}
              >
                Next
              </button>
            </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

export default JobsPage;