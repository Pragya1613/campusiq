import { useEffect, useMemo, useState } from "react";
import PublicLayout from "../layouts/PublicLayout";
import EditJobModal from "../components/EditJobModal";
import ConfirmModal from "../components/ConfirmModal";
import {
  getAllJobs,
  updateJob,
  deleteJob,
} from "../services/jobService";
import toast from "react-hot-toast";
import {
  isJobActive,
  isJobExpired,
  formatDate,
  formatPackage,
} from "../utils/jobUtils";

function ManageJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [totalJobs, setTotalJobs] = useState(0);
  const [activeJobs, setActiveJobs] = useState(0);
  const [closedJobs, setClosedJobs] = useState(0);

  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [company, setCompany] = useState("All");
  const [location, setLocation] = useState("All");
  const [cgpa, setCgpa] = useState("All");
  const [pkg, setPkg] = useState("All");
  const [sort, setSort] = useState("Newest");

  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  const [companies, setCompanies] = useState(["All"]);

  useEffect(() => {
    fetchJobs(currentPage, debouncedSearch);
  }, [
    currentPage,
    debouncedSearch,
    company,
    status,
    location,
    cgpa,
    pkg,
    sort,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchJobs = async (
    page = currentPage,
    searchText = debouncedSearch
  ) => {
    try {
      setLoading(true);

      const data = await getAllJobs({
        page,
        search: searchText,
        company,
        status,
        location,
        cgpa,
        package: pkg,
        sort,
      });

      setJobs(data.jobs);

      setCompanies(["All", ...data.companies]);

      setTotalPages(data.totalPages);
      setTotalJobs(data.totalJobs);
      setActiveJobs(data.activeJobs);
      setClosedJobs(data.closedJobs);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const locations = useMemo(
    () => [
      "All",
      ...new Set(
        jobs
          .map((j) => j.location)
          .filter(Boolean)
      ),
    ],
    [jobs]
  );

  const handleEdit = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteJob(jobToDelete);

      toast.success(
        "Job Deleted Successfully"
      );

      setShowDeleteModal(false);
      setJobToDelete(null);

      fetchJobs();
    } catch (err) {
      console.error(err);
      toast.error("Failed To Delete Job");
    }
  };

  const handleSave = async (formData) => {
    try {
      await updateJob(
        selectedJob._id,
        formData
      );

      toast.success(
        "Job Updated Successfully"
      );

      setShowModal(false);
      setSelectedJob(null);

      fetchJobs();
    } catch (err) {
      console.error(err);
      toast.error("Failed To Update Job");
    }
  };

  const resetFilters = () => {
    setSearch("");
    setStatus("All");
    setCompany("All");
    setLocation("All");
    setCgpa("All");
    setPkg("All");
    setSort("Newest");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-slate-50 flex justify-center items-center">
          <div className="text-center">
            <i className="fa-solid fa-spinner fa-spin text-3xl text-orange-500 mb-4"></i>

            <h2 className="text-xl font-semibold text-[#172554]">
              Loading Jobs...
            </h2>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8 py-10 lg:py-12">

        <div className="max-w-7xl mx-auto">

          {/* ================= HEADER ================= */}

          <div className="mb-8">

            <p className="text-sm font-semibold tracking-[0.2em] text-orange-500 uppercase mb-2">
              Placement Opportunities
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#172554]">
              Manage Jobs
            </h1>

            <p className="text-slate-500 mt-2 text-base">
              Manage, update and monitor placement opportunities.
            </p>

          </div>


          {/* ================= STATISTICS ================= */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

            {/* Total Jobs */}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-6 flex justify-between items-center">

              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Total Jobs
                </p>

                <h2 className="text-3xl font-bold text-[#172554] mt-2">
                  {totalJobs}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                <i className="fa-solid fa-briefcase text-2xl text-blue-500"></i>
              </div>

            </div>


            {/* Active Jobs */}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-6 flex justify-between items-center">

              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Active Jobs
                </p>

                <h2 className="text-3xl font-bold text-emerald-600 mt-2">
                  {activeJobs}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <i className="fa-solid fa-circle-check text-2xl text-emerald-500"></i>
              </div>

            </div>


            {/* Closed Jobs */}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-6 flex justify-between items-center">

              <div>
                <p className="text-slate-500 text-sm font-medium">
                  Closed Jobs
                </p>

                <h2 className="text-3xl font-bold text-red-500 mt-2">
                  {closedJobs}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                <i className="fa-solid fa-circle-xmark text-2xl text-red-500"></i>
              </div>

            </div>

          </div>


          {/* ================= FILTERS ================= */}

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 mb-8">

            {/* Search + Sort */}

            <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">

              <div className="relative w-full lg:w-96">

                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"></i>

                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 pl-11 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition duration-200"
                />

              </div>


              <div className="flex flex-col sm:flex-row gap-3">

                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 min-w-[220px] text-slate-700 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition duration-200 cursor-pointer"
                >
                  <option value="Newest">
                    Newest
                  </option>

                  <option value="Oldest">
                    Oldest
                  </option>

                  <option value="Highest Package">
                    Highest Package
                  </option>

                  <option value="Lowest Package">
                    Lowest Package
                  </option>

                  <option value="Deadline">
                    Nearest Deadline
                  </option>
                </select>


                <button
                  onClick={resetFilters}
                  className="px-5 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  <i className="fa-solid fa-rotate-left mr-2"></i>
                  Reset
                </button>

              </div>

            </div>


            {/* Filter Row */}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">

              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition duration-200 cursor-pointer"
              >
                <option value="All">
                  Status
                </option>

                <option value="Active">
                  Active Jobs
                </option>

                <option value="Closed">
                  Closed Jobs
                </option>
              </select>


              <select
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition duration-200 cursor-pointer"
              >
                <option value="All">
                  Company
                </option>

                {companies
                  .filter((c) => c !== "All")
                  .map((c) => (
                    <option
                      key={c}
                      value={c}
                    >
                      {c}
                    </option>
                  ))}
              </select>


              <select
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition duration-200 cursor-pointer"
              >
                <option value="All">
                  Location
                </option>

                {locations
                  .filter((l) => l !== "All")
                  .map((l) => (
                    <option
                      key={l}
                      value={l}
                    >
                      {l}
                    </option>
                  ))}
              </select>


              <select
                value={cgpa}
                onChange={(e) => {
                  setCgpa(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition duration-200 cursor-pointer"
              >
                <option value="All">
                  Min CGPA
                </option>

                <option value="6">
                  6+
                </option>

                <option value="7">
                  7+
                </option>

                <option value="8">
                  8+
                </option>

                <option value="9">
                  9+
                </option>
              </select>


              <select
                value={pkg}
                onChange={(e) => {
                  setPkg(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition duration-200 cursor-pointer"
              >
                <option value="All">
                  Min Package
                </option>

                <option value="5">
                  5+ LPA
                </option>

                <option value="10">
                  10+ LPA
                </option>

                <option value="15">
                  15+ LPA
                </option>

                <option value="20">
                  20+ LPA
                </option>
              </select>

            </div>

          </div>


          {/* ================= JOB CARDS ================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {jobs.length > 0 ? (

              jobs.map((job) => (

                <div
                  key={job._id}
                  className="group bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 cursor-default"
                >

                  {/* Card Header */}

                  <div className="flex justify-between items-start gap-4 mb-5">

                    <div className="min-w-0">

                      <h2 className="text-xl font-bold text-[#172554] group-hover:text-blue-600 transition-colors duration-200 truncate">
                        {job.title}
                      </h2>

                      <p className="text-slate-500 font-medium mt-1 truncate">
                        {job.companyName}
                      </p>

                    </div>


                    {/* Package */}

                    <div className="shrink-0 flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">

                      <span className="text-xs font-semibold text-emerald-600">
                        PACKAGE
                      </span>

                      <span className="text-sm font-bold text-emerald-700">
                        {job.package
                          ? `${job.package} LPA`
                          : "N/A"}
                      </span>

                    </div>

                  </div>


                  {/* Divider */}

                  <div className="border-t border-slate-100 mb-5"></div>


                  {/* Job Details */}

                  <div className="space-y-4 mb-6">

                    {/* Location */}

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                        <i className="fa-solid fa-location-dot text-red-500"></i>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide font-semibold text-slate-400">
                          Location
                        </p>

                        <p className="text-sm font-medium text-slate-700 mt-0.5">
                          {job.location || "N/A"}
                        </p>
                      </div>

                    </div>


                    {/* CGPA */}

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                        <i className="fa-solid fa-chart-line text-orange-500"></i>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide font-semibold text-slate-400">
                          Minimum CGPA
                        </p>

                        <p className="text-sm font-medium text-slate-700 mt-0.5">
                          {job.eligibilityCgpa ?? "N/A"}
                        </p>
                      </div>

                    </div>


                    {/* Status */}

                    <div className="flex items-center gap-3">

                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isJobActive(job)
                            ? "bg-emerald-50"
                            : "bg-red-50"
                        }`}
                      >
                        <i
                          className={`fa-solid ${
                            isJobActive(job)
                              ? "fa-circle-check text-emerald-500"
                              : "fa-circle-xmark text-red-500"
                          }`}
                        ></i>
                      </div>

                      <div>

                        <p className="text-xs uppercase tracking-wide font-semibold text-slate-400">
                          Status
                        </p>

                        <p
                          className={`text-sm font-semibold mt-0.5 ${
                            isJobActive(job)
                              ? "text-emerald-600"
                              : "text-red-500"
                          }`}
                        >
                          {isJobActive(job)
                            ? "Active"
                            : "Closed"}
                        </p>

                      </div>

                    </div>


                    {/* Deadline */}

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <i className="fa-solid fa-calendar-days text-blue-500"></i>
                      </div>

                      <div>

                        <p className="text-xs uppercase tracking-wide font-semibold text-slate-400">
                          Deadline
                        </p>

                        <p className="text-sm font-medium text-slate-700 mt-0.5">
                          {job.deadline
                            ? new Date(
                                job.deadline
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>

                      </div>

                    </div>


                    {/* Required Skills */}

                    {!!job.requiredSkills?.length && (

                      <div className="pt-1">

                        <p className="text-xs uppercase tracking-wide font-semibold text-slate-400 mb-2">
                          Required Skills
                        </p>

                        <div className="flex flex-wrap gap-2">

                          {job.requiredSkills.map(
                            (skill, i) => (
                              <span
                                key={i}
                                className="bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg text-xs font-medium"
                              >
                                {skill}
                              </span>
                            )
                          )}

                        </div>

                      </div>

                    )}

                  </div>


                  {/* Actions */}

                  <div className="flex gap-3 pt-1">

                    <button
                      onClick={() =>
                        handleEdit(job)
                      }
                      className="flex-1 bg-[#172554] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 cursor-pointer"
                    >
                      <i className="fa-solid fa-pen-to-square mr-2"></i>
                      Edit
                    </button>


                    <button
                      onClick={() => {
                        setJobToDelete(
                          job._id
                        );
                        setShowDeleteModal(
                          true
                        );
                      }}
                      className="flex-1 bg-red-50 border border-red-100 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer"
                    >
                      <i className="fa-solid fa-trash mr-2"></i>
                      Delete
                    </button>

                  </div>

                </div>

              ))

            ) : (

              <div className="col-span-full bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">

                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
                  <i className="fa-solid fa-briefcase text-2xl text-slate-400"></i>
                </div>

                <h2 className="text-xl font-bold text-[#172554]">
                  No Jobs Found
                </h2>

                <p className="text-slate-500 mt-2">
                  No jobs match your current filters.
                </p>

              </div>

            )}

          </div>


          {/* ================= PAGINATION ================= */}

          {totalPages > 1 && (

            <div className="flex justify-center items-center gap-2 mt-10">

              <button
                onClick={() =>
                  setCurrentPage(
                    (prev) => prev - 1
                  )
                }
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  currentPage === 1
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-[#172554] text-white hover:bg-blue-700 cursor-pointer"
                }`}
              >
                <i className="fa-solid fa-chevron-left mr-2"></i>
                Previous
              </button>


              {Array.from(
                { length: totalPages },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setCurrentPage(
                        index + 1
                      )
                    }
                    className={`w-10 h-10 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
                      currentPage ===
                      index + 1
                        ? "bg-orange-500 text-white shadow-sm"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}


              <button
                onClick={() =>
                  setCurrentPage(
                    (prev) => prev + 1
                  )
                }
                disabled={
                  currentPage === totalPages
                }
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  currentPage === totalPages
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-[#172554] text-white hover:bg-blue-700 cursor-pointer"
                }`}
              >
                Next
                <i className="fa-solid fa-chevron-right ml-2"></i>
              </button>

            </div>

          )}

        </div>


        {/* ================= EDIT MODAL ================= */}

        <EditJobModal
          isOpen={showModal}
          selectedJob={selectedJob}
          onClose={() => {
            setShowModal(false);
            setSelectedJob(null);
          }}
          onSave={handleSave}
        />


        {/* ================= DELETE MODAL ================= */}

        <ConfirmModal
          isOpen={showDeleteModal}
          title="Delete Job"
          message="Are you sure you want to permanently delete this job? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setJobToDelete(null);
          }}
        />

      </div>
    </PublicLayout>
  );
}

export default ManageJobsPage;