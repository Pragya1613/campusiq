import {
  useEffect,
  useMemo,
  useState,
} from "react";

import PublicLayout from "../layouts/PublicLayout";

import {
  getMyApplications,
} from "../services/applicationService";

function MyApplicationsPage() {
  const [
    applications,
    setApplications,
  ] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Selected application for job details
  const [selectedApplication, setSelectedApplication] =
    useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getMyApplications();

        setApplications(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-50 text-blue-700 border-blue-100";

      case "Shortlisted":
        return "bg-amber-50 text-amber-700 border-amber-100";

      case "Interview Scheduled":
        return "bg-purple-50 text-purple-700 border-purple-100";

      case "Selected":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";

      case "Rejected":
        return "bg-red-50 text-red-700 border-red-100";

      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Applied":
        return "fa-solid fa-file-circle-check";

      case "Shortlisted":
        return "fa-solid fa-star";

      case "Interview Scheduled":
        return "fa-solid fa-comments";

      case "Selected":
        return "fa-solid fa-circle-check";

      case "Rejected":
        return "fa-solid fa-circle-xmark";

      default:
        return "fa-solid fa-clock";
    }
  };

  // =========================
  // Search + Status Filter
  // =========================

  const filteredApplications = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return applications.filter((application) => {
      const title =
        application.jobId?.title?.toLowerCase() || "";

      const company =
        application.jobId?.companyName?.toLowerCase() || "";

      const location =
        application.jobId?.location?.toLowerCase() || "";

      const matchesSearch =
        !search ||
        title.includes(search) ||
        company.includes(search) ||
        location.includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [
    applications,
    searchTerm,
    statusFilter,
  ]);

  return (
    <PublicLayout>

      <div className="min-h-screen bg-[#f8fafc] px-5 sm:px-7 lg:px-10 xl:px-12 py-10">

        <div className="max-w-7xl mx-auto">

          {/* =========================
              Page Header
          ========================== */}

          <div className="mb-7">

            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500">
              Placement Journey
            </p>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mt-2">

              <div>

                <h1 className="text-3xl sm:text-4xl font-bold text-[#172554]">
                  My Applications
                </h1>

                <p className="mt-2 text-slate-500 text-base">
                  Track the progress of every placement application in one place.
                </p>

              </div>

              {applications.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-slate-500 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm w-fit">

                  <i className="fa-solid fa-file-lines text-blue-500"></i>

                  <span>
                    {applications.length}{" "}
                    {applications.length === 1
                      ? "Application"
                      : "Applications"}
                  </span>

                </div>
              )}

            </div>
          </div>


          {/* =========================
              Search + Filter
          ========================== */}

          {applications.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 mb-8">

              <div className="flex flex-col md:flex-row gap-3">

                {/* Search */}

                <div className="relative flex-1">

                  <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                    placeholder="Search by job title, company or location..."
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                {/* Status Filter */}

                <div className="relative md:w-56">

                  <i className="fa-solid fa-filter absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>

                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value)
                    }
                    className="w-full h-12 pl-11 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 outline-none appearance-none cursor-pointer transition focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="All">
                      All Status
                    </option>

                    <option value="Applied">
                      Applied
                    </option>

                    <option value="Shortlisted">
                      Shortlisted
                    </option>

                    <option value="Interview Scheduled">
                      Interview Scheduled
                    </option>

                    <option value="Selected">
                      Selected
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>
                  </select>

                  <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>

                </div>

              </div>


              {/* Active filter result count */}

              {(searchTerm || statusFilter !== "All") && (
                <div className="mt-3 flex items-center justify-between gap-3">

                  <p className="text-sm text-slate-500">

                    Showing{" "}

                    <span className="font-semibold text-slate-700">
                      {filteredApplications.length}
                    </span>{" "}

                    of{" "}

                    <span className="font-semibold text-slate-700">
                      {applications.length}
                    </span>{" "}

                    applications

                  </p>

                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("All");
                    }}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
                  >
                    Clear filters
                  </button>

                </div>
              )}

            </div>
          )}


          {/* =========================
              Empty State
          ========================== */}

          {applications.length === 0 ? (

            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm px-6 py-16 sm:py-20 text-center">

              <div className="w-20 h-20 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center">

                <i className="fa-solid fa-file-circle-xmark text-4xl text-blue-500"></i>

              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#172554]">
                No Applications Yet
              </h2>

              <p className="max-w-md mx-auto mt-3 text-slate-500 leading-7">
                You haven't applied to any placement opportunities yet.
                Start exploring available jobs and your applications will
                appear here.
              </p>

            </div>

          ) : filteredApplications.length === 0 ? (

            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm px-6 py-16 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center">

                <i className="fa-solid fa-magnifying-glass text-2xl text-slate-400"></i>

              </div>

              <h2 className="mt-5 text-xl font-bold text-[#172554]">
                No Matching Applications
              </h2>

              <p className="mt-2 text-slate-500">
                Try a different keyword or change the status filter.
              </p>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                }}
                className="mt-5 px-5 py-2.5 rounded-xl bg-[#172554] text-white font-medium hover:bg-[#1e3a8a] transition"
              >
                Clear Filters
              </button>

            </div>

          ) : (

            /* =========================
                Applications Grid
            ========================== */

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7">

              {filteredApplications.map(
                (application) => (

                  <div
                    key={application._id}
                    onClick={() =>
                      setSelectedApplication(application)
                    }
                    className="group relative cursor-pointer bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                  >

                    {/* Upper-right detail arrow */}

                    <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-600 transition-all duration-200">

                      <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>

                    </div>


                    <div className="p-6 flex flex-col flex-1">

                      {/* Job Header */}

                      <div className="flex items-start justify-between gap-4 pr-10">

                        <div className="min-w-0">

                          <h2 className="text-xl lg:text-[22px] font-bold text-[#172554] leading-snug group-hover:text-blue-700 transition">

                            {application.jobId?.title}

                          </h2>

                          <p className="mt-1.5 text-slate-500 font-medium">

                            {application.jobId?.companyName}

                          </p>

                        </div>


                        <div className="shrink-0 mt-6 w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">

                          <i className="fa-solid fa-briefcase text-orange-500 text-lg"></i>

                        </div>

                      </div>


                      {/* Divider */}

                      <div className="h-px bg-slate-100 my-5"></div>


                      {/* Application Details */}

                      <div className="space-y-4">

                        {/* Location */}

                        <div className="flex items-center gap-3">

                          <div className="w-9 h-9 shrink-0 rounded-lg bg-rose-50 flex items-center justify-center">

                            <i className="fa-solid fa-location-dot text-rose-500 text-sm"></i>

                          </div>

                          <div>

                            <p className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">
                              Location
                            </p>

                            <p className="text-sm font-medium text-slate-700 mt-0.5">

                              {application.jobId?.location ||
                                "Location Not Available"}

                            </p>

                          </div>

                        </div>


                        {/* Applied Date */}

                        <div className="flex items-center gap-3">

                          <div className="w-9 h-9 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">

                            <i className="fa-solid fa-calendar-days text-blue-500 text-sm"></i>

                          </div>

                          <div>

                            <p className="text-[11px] uppercase tracking-wide font-semibold text-slate-400">
                              Applied On
                            </p>

                            <p className="text-sm font-medium text-slate-700 mt-0.5">

                              {new Date(
                                application.createdAt
                              ).toLocaleDateString()}

                            </p>

                          </div>

                        </div>

                      </div>


                      {/* Status */}

                      <div className="mt-auto pt-6">

                        <div
                          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold ${getStatusColor(
                            application.status
                          )}`}
                        >

                          <i
                            className={`${getStatusIcon(
                              application.status
                            )} text-sm`}
                          ></i>

                          <span>
                            {application.status}
                          </span>

                        </div>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>
          )}

        </div>

      </div>


      {/* =========================
          APPLICATION JOB DETAILS
      ========================== */}

      {selectedApplication && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
          onClick={() => setSelectedApplication(null)}
        >

          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}

            <div className="sticky top-0 z-10 border-b border-slate-100 bg-white px-6 py-5">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
                    Application Details
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-[#172554]">
                    {selectedApplication.jobId?.title}
                  </h2>

                  <p className="mt-1 text-slate-500">
                    {selectedApplication.jobId?.companyName}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedApplication(null)
                  }
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>

              </div>

            </div>


            {/* Modal Content */}

            <div className="px-6 py-6">

              {/* Basic Information */}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-xs text-slate-400">
                    Company
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {selectedApplication.jobId?.companyName || "N/A"}
                  </p>

                </div>


                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-xs text-slate-400">
                    Location
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {selectedApplication.jobId?.location || "N/A"}
                  </p>

                </div>


                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-xs text-slate-400">
                    Applied On
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {new Date(
                      selectedApplication.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>


                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-xs text-slate-400">
                    Status
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {selectedApplication.status}
                  </p>

                </div>


                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-xs text-slate-400">
                    Package
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {selectedApplication.jobId?.package
                      ? `${selectedApplication.jobId.package} LPA`
                      : "N/A"}
                  </p>

                </div>


                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-xs text-slate-400">
                    Minimum CGPA
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {selectedApplication.jobId?.eligibilityCgpa ??
                      "No Limit"}
                  </p>

                </div>

              </div>


              {/* Full Description */}

              <div className="mt-7">

                <h3 className="text-sm font-bold text-[#172554]">
                  About the Role
                </h3>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {selectedApplication.jobId?.description ||
                    "No description available."}
                </p>

              </div>


              {/* Required Skills */}

              {selectedApplication.jobId?.requiredSkills?.length > 0 && (
                <div className="mt-7">

                  <h3 className="text-sm font-bold text-[#172554]">
                    Required Skills
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">

                    {selectedApplication.jobId.requiredSkills.map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
                        >
                          {skill}
                        </span>
                      )
                    )}

                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </PublicLayout>
  );
}

export default MyApplicationsPage;