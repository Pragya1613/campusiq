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

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [company, setCompany] = useState("All");
  const [location, setLocation] = useState("All");
  const [cgpa, setCgpa] = useState("All");
  const [pkg, setPkg] = useState("All");
  const [sort, setSort] = useState("Newest");

  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setJobs(await getAllJobs());
    } catch (err) {
      console.error(err);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };


  const companies = useMemo(
    () => ["All", ...new Set(jobs.map((j) => j.companyName).filter(Boolean))],
    [jobs]
  );

  const locations = useMemo(
    () => ["All", ...new Set(jobs.map((j) => j.location).filter(Boolean))],
    [jobs]
  );

  const filteredJobs = useMemo(() => {
    let filtered = [...jobs];

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter((j) =>
        `${j.title || ""} ${j.companyName || ""} ${j.location || ""}`
          .toLowerCase()
          .includes(q)
      );
    }

    if (status !== "All") {
      filtered = filtered.filter((j) =>
        status === "Active" ? j.isActive : !j.isActive
      );
    }

    if (company !== "All") {
      filtered = filtered.filter((j) => j.companyName === company);
    }

    if (location !== "All") {
      filtered = filtered.filter((j) => j.location === location);
    }

    if (cgpa !== "All") {
      filtered = filtered.filter(
        (j) => Number(j.eligibilityCgpa || 0) >= Number(cgpa)
      );
    }

    if (pkg !== "All") {
      filtered = filtered.filter(
        (j) => Number(j.package || 0) >= Number(pkg)
      );
    }

    filtered.sort((a, b) => {
      switch (sort) {
        case "Oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "Highest Package":
          return Number(b.package || 0) - Number(a.package || 0);
        case "Lowest Package":
          return Number(a.package || 0) - Number(b.package || 0);
        case "Deadline":
          return new Date(a.deadline || 0) - new Date(b.deadline || 0);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return filtered;
  }, [jobs, search, status, company, location, cgpa, pkg, sort]);

  const handleEdit = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteJob(jobToDelete);
      toast.success("Job Deleted Successfully");
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
      await updateJob(selectedJob._id, formData);
      toast.success("Job Updated Successfully");
      setShowModal(false);
      setSelectedJob(null);
      fetchJobs();
    } catch (err) {
      console.error(err);
      toast.error("Failed To Update Job");
    }
  };

  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(isJobActive).length;
  const closedJobs = totalJobs - activeJobs;

  const resetFilters = () => {
    setSearch("");
    setStatus("All");
    setCompany("All");
    setLocation("All");
    setCgpa("All");
    setPkg("All");
    setSort("Newest");
  };

  if (loading) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex justify-center items-center">
          <h2 className="text-2xl font-semibold text-gray-600">
            Loading Jobs...
          </h2>
        </div>
      </PublicLayout>
    );
  }

  // return yahan se neeche aayega

  return (
  <PublicLayout>
    <div className="min-h-screen bg-slate-100 px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold text-[#172554]">
              Manage Jobs
            </h1>

            <p className="text-gray-500 mt-2">
              Manage, update and monitor placement opportunities.
            </p>
          </div>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">

            <div>
              <p className="text-gray-500">Total Jobs</p>
              <h2 className="text-3xl font-bold text-[#172554] mt-2">
                {totalJobs}
              </h2>
            </div>

            <i className="fa-solid fa-briefcase text-5xl text-[#172554]/20"></i>

          </div>

          <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">

            <div>
              <p className="text-gray-500">Active Jobs</p>
              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {activeJobs}
              </h2>
            </div>

            <i className="fa-solid fa-circle-check text-5xl text-green-500/30"></i>

          </div>

          <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">

            <div>
              <p className="text-gray-500">Closed Jobs</p>
              <h2 className="text-3xl font-bold text-red-500 mt-2">
                {closedJobs}
              </h2>
            </div>

            <i className="fa-solid fa-circle-xmark text-5xl text-red-500/30"></i>

          </div>

        </div>

        {/* Filters */}

        <div className="bg-white rounded-2xl shadow p-5 mb-8">

          {/* Search + Sort */}

          <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">

            <input
              type="text"
              placeholder="🔍 Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full lg:w-80 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#172554]"
            />

            <div className="flex gap-3">

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border rounded-xl px-4 py-3 min-w-[220px]"
              >
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Highest Package">Highest Package</option>
                <option value="Lowest Package">Lowest Package</option>
                <option value="Deadline">Nearest Deadline</option>
              </select>

              <button
                onClick={resetFilters}
                className="px-5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
              >
                <i className="fa-solid fa-rotate-left mr-2"></i>
                Reset
              </button>

            </div>

          </div>

          {/* Filter Row */}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded-xl px-4 py-3"
            >
              <option value="All">Status</option>
              <option value="Active">Active Jobs</option>
              <option value="Closed">Closed Jobs</option>
            </select>

            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="border rounded-xl px-4 py-3"
            >
              <option value="All">Company</option>

              {companies
                .filter((c) => c !== "All")
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}

            </select>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border rounded-xl px-4 py-3"
            >
              <option value="All">Location</option>

              {locations
                .filter((l) => l !== "All")
                .map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}

            </select>

            <select
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              className="border rounded-xl px-4 py-3"
            >
              <option value="All">Min CGPA</option>
              <option value="6">6+</option>
              <option value="7">7+</option>
              <option value="8">8+</option>
              <option value="9">9+</option>
            </select>

            <select
              value={pkg}
              onChange={(e) => setPkg(e.target.value)}
              className="border rounded-xl px-4 py-3"
            >
              <option value="All">Min Package</option>
              <option value="5">5+ LPA</option>
              <option value="10">10+ LPA</option>
              <option value="15">15+ LPA</option>
              <option value="20">20+ LPA</option>
            </select>

          </div>

        </div>

        {/* Jobs Grid Starts Here */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-4 gap-3">
                  <div className="min-w-0">
                    <h2 className="text-2xl font-bold text-[#172554] truncate">{job.title}</h2>
                    <p className="text-gray-600 font-medium mt-1 truncate">{job.companyName}</p>
                  </div>

                  <span className="shrink-0 bg-[#172554] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {job.package ? `${job.package} LPA` : "Package N/A"}
                  </span>
                </div>

                <div className="space-y-3 mb-6 text-gray-600">
                  <p><i className="fa-solid fa-location-dot text-red-500 mr-2"></i>{job.location || "N/A"}</p>

                  <p>
                    <i className="fa-solid fa-chart-line text-orange-500 mr-2"></i>
                    Minimum CGPA:
                    <span className="font-semibold ml-1">{job.eligibilityCgpa ?? "N/A"}</span>
                  </p>

                  <p>
                    <i className="fa-solid fa-circle-check text-green-500 mr-2"></i>
                    Status:
                    <span
                      className={`ml-1 inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        isJobActive(job) ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {isJobActive(job) ? "Active" : "Closed"}
                    </span>
                  </p>

                  {!!job.requiredSkills?.length && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {job.requiredSkills.map((skill, i) => (
                        <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="pt-1 text-gray-500 text-sm">
                    <i className="fa-solid fa-calendar-days text-blue-500 mr-2"></i>
                    Deadline:
                    <span className="font-medium ml-1">
                      {job.deadline ? new Date(job.deadline).toLocaleDateString() : "N/A"}
                    </span>
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(job)}
                    className="flex-1 bg-[#172554] text-white py-3 rounded-xl hover:bg-[#0f1d46] transition"
                  >
                    <i className="fa-solid fa-pen-to-square mr-2"></i>
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setJobToDelete(job._id);
                      setShowDeleteModal(true);
                    }}
                    className="flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
                  >
                    <i className="fa-solid fa-trash mr-2"></i>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-2xl p-12 text-center shadow">
              <i className="fa-solid fa-briefcase text-5xl text-gray-300 mb-5"></i>
              <h2 className="text-2xl font-bold text-[#172554]">No Jobs Found</h2>
              <p className="text-gray-500 mt-2">No jobs match your current filters.</p>
            </div>
          )}
        </div>
      </div>

      <EditJobModal
        isOpen={showModal}
        selectedJob={selectedJob}
        onClose={() => {
          setShowModal(false);
          setSelectedJob(null);
        }}
        onSave={handleSave}
      />

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
