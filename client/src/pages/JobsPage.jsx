import { useEffect, useState } from "react";

import PublicLayout from "../layouts/PublicLayout";

import { getAllJobs } from "../services/jobService";
import { applyForJob } from "../services/applicationService";

import toast from "react-hot-toast";

import {
  isJobActive,
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

  const [selectedJob, setSelectedJob] = useState(null);


  /* ================= SEARCH DEBOUNCE ================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);


  /* ================= FETCH JOBS ================= */

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

      if (
        page > data.totalPages &&
        data.totalPages > 0
      ) {
        setCurrentPage(data.totalPages);
        return;
      }

      setJobs(data.jobs);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);

    } catch (error) {

      console.log(error);

      setError("Failed to load jobs.");

      toast.error("Failed to load jobs");

    } finally {

      setLoading(false);

    }

  };


  /* ================= APPLY ================= */

  const handleApply = async (jobId) => {

    try {

      const data = await applyForJob(jobId);

      toast.success(data.message);

      fetchData(
        currentPage,
        debouncedSearch
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Application Failed"
      );

    }

  };


  /* ================= CLOSE MODAL ================= */

  const closeModal = () => {
    setSelectedJob(null);
  };


  return (
    <PublicLayout>

      <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-10 py-10">

        <div className="max-w-7xl mx-auto">


          {/* ================= PAGE HEADER ================= */}

          <div className="mb-8">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Placement Opportunities
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#172554]">
              Available Jobs
            </h1>

            <p className="mt-2 text-base sm:text-lg text-slate-500">
              Browse and apply for placement opportunities.
            </p>

          </div>


          {/* ================= SEARCH ================= */}

          <div className="mb-10">

            <div
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-2
                shadow-sm
                transition
                duration-200
                hover:shadow-md
              "
            >

              <div className="relative">

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                >

                  <i className="fa-solid fa-magnifying-glass text-base"></i>

                </div>


                <input
                  type="text"
                  placeholder="Search by job title or company..."
                  value={search}
                  onChange={(e) => {

                    setSearch(e.target.value);

                    setCurrentPage(1);

                  }}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50/50
                    py-3.5
                    pl-12
                    pr-12
                    text-[15px]
                    text-slate-700
                    placeholder:text-slate-400
                    outline-none
                    transition
                    duration-200
                    focus:border-blue-200
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-50
                  "
                />


                {search && (

                  <button
                    type="button"
                    onClick={() => {

                      setSearch("");

                      setCurrentPage(1);

                    }}
                    className="
                      absolute
                      right-3
                      top-1/2
                      flex
                      h-8
                      w-8
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-lg
                      text-slate-400
                      transition
                      hover:bg-slate-100
                      hover:text-slate-700
                    "
                    aria-label="Clear search"
                  >

                    <i className="fa-solid fa-xmark text-sm"></i>

                  </button>

                )}

              </div>

            </div>

          </div>


          {/* ================= LOADING ================= */}

          {loading && (

            <div className="mb-7 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-center text-blue-700">

              <i className="fa-solid fa-spinner fa-spin mr-2"></i>

              Loading jobs...

            </div>

          )}


          {/* ================= ERROR ================= */}

          {error && (

            <div className="mb-7 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-center text-red-700">

              <i className="fa-solid fa-circle-exclamation mr-2"></i>

              {error}

            </div>

          )}


          {/* ================= JOB GRID ================= */}

          {jobs.length > 0 ? (

            <>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {jobs.map((job) => {

                  const alreadyApplied =
                    job.alreadyApplied;

                  const eligible =
                    job.eligible;

                  const closed =
                    !isJobActive(job);


                  return (

                    <article
                      key={job._id}
                      onClick={() =>
                        setSelectedJob(job)
                      }
                      className="
                        group
                        flex
                        h-full
                        cursor-pointer
                        flex-col
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        p-6
                        shadow-sm
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-slate-300
                        hover:shadow-xl
                      "
                    >


                      {/* ================= CARD HEADER ================= */}

                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">

                          <h2
                            className="
                              break-words
                              text-xl
                              lg:text-[22px]
                              font-bold
                              leading-snug
                              text-[#172554]
                              group-hover:text-blue-700
                              transition
                            "
                          >

                            {job.title}

                          </h2>


                          <div className="mt-1.5 flex items-center gap-2">

                            <i className="fa-solid fa-building text-sm text-slate-400"></i>

                            <p className="truncate text-sm font-medium text-slate-500">

                              {job.companyName}

                            </p>

                          </div>

                        </div>


                        {/* PACKAGE */}

                        <div className="shrink-0 text-right">

                          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                            Package
                          </p>

                          <p className="mt-0.5 text-base font-bold text-[#172554]">
                            {job.package
                              ? formatPackage(job.package)
                              : "N/A"}
                          </p>

                        </div>

                      </div>


                      {/* ================= SIMPLE JOB INFO ================= */}

                      <div className="mt-6 border-t border-slate-100">


                        {/* LOCATION */}

                        <div className="flex items-center justify-between border-b border-slate-100 py-4">

                          <div className="flex items-center gap-3">

                            <i className="fa-solid fa-location-dot w-5 text-center text-rose-500"></i>

                            <span className="text-sm text-slate-500">
                              Location
                            </span>

                          </div>


                          <span className="max-w-[55%] truncate text-sm font-semibold text-[#172554]">

                            {job.location || "N/A"}

                          </span>

                        </div>


                        {/* MIN CGPA */}

                        <div className="flex items-center justify-between border-b border-slate-100 py-4">

                          <div className="flex items-center gap-3">

                            <i className="fa-solid fa-chart-line w-5 text-center text-orange-500"></i>

                            <span className="text-sm text-slate-500">
                              Minimum CGPA
                            </span>

                          </div>


                          <span className="text-sm font-semibold text-[#172554]">

                            {job.eligibilityCgpa ??
                              "No Limit"}

                          </span>

                        </div>


                        {/* DEADLINE */}

                        <div className="flex items-center justify-between py-4">

                          <div className="flex items-center gap-3">

                            <i className="fa-solid fa-calendar-days w-5 text-center text-blue-500"></i>

                            <span className="text-sm text-slate-500">
                              Deadline
                            </span>

                          </div>


                          <span className="text-sm font-semibold text-[#172554]">

                            {job.deadline
                              ? formatDate(job.deadline)
                              : "N/A"}

                          </span>

                        </div>

                      </div>


                      {/* ================= ACTION ================= */}

                      <div className="mt-auto pt-5">

                        <button
                          type="button"
                          onClick={(e) => {

                            e.stopPropagation();

                            setSelectedJob(job);

                          }}
                          className="
                            flex
                            w-full
                            cursor-pointer
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-3
                            text-sm
                            font-bold
                            text-[#172554]
                            transition-all
                            hover:border-[#172554]
                            hover:bg-slate-50
                          "
                        >

                          View Details

                          <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>

                        </button>

                      </div>

                    </article>

                  );

                })}

              </div>


              {/* ================= PAGINATION ================= */}

              {totalPages > 1 && (

                <div className="mt-10 flex w-full justify-center">

                  <div className="
                    flex
                    max-w-full
                    flex-wrap
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-2
                    shadow-sm
                  ">


                    {/* PREVIOUS */}

                    <button
                      onClick={() =>
                        setCurrentPage(
                          (prev) => prev - 1
                        )
                      }
                      disabled={currentPage === 1}
                      className={`
                        rounded-xl
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        transition
                        ${
                          currentPage === 1
                            ? "cursor-not-allowed bg-slate-100 text-slate-400"
                            : "cursor-pointer bg-[#172554] text-white hover:bg-[#0f1d46]"
                        }
                      `}
                    >

                      <i className="fa-solid fa-chevron-left mr-2 text-xs"></i>

                      Previous

                    </button>


                    {/* PAGE NUMBERS */}

                    <div className="
                      flex
                      max-w-full
                      flex-wrap
                      justify-center
                      gap-1
                    ">

                      {Array.from(
                        {
                          length: totalPages,
                        },
                        (_, index) => (

                          <button
                            key={index}
                            onClick={() =>
                              setCurrentPage(
                                index + 1
                              )
                            }
                            className={`
                              h-9
                              w-9
                              rounded-lg
                              text-sm
                              font-semibold
                              transition
                              ${
                                currentPage ===
                                index + 1
                                  ? "bg-orange-500 text-white"
                                  : "text-slate-600 hover:bg-slate-100"
                              }
                            `}
                          >

                            {index + 1}

                          </button>

                        )
                      )}

                    </div>


                    {/* NEXT */}

                    <button
                      onClick={() =>
                        setCurrentPage(
                          (prev) => prev + 1
                        )
                      }
                      disabled={
                        currentPage === totalPages
                      }
                      className={`
                        rounded-xl
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        transition
                        ${
                          currentPage === totalPages
                            ? "cursor-not-allowed bg-slate-100 text-slate-400"
                            : "cursor-pointer bg-[#172554] text-white hover:bg-[#0f1d46]"
                        }
                      `}
                    >

                      Next

                      <i className="fa-solid fa-chevron-right ml-2 text-xs"></i>

                    </button>

                  </div>

                </div>

              )}

            </>

          ) : (

            /* ================= EMPTY STATE ================= */

            <div className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              px-6
              py-16
              text-center
              shadow-sm
            ">

              <div className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-slate-100
              ">

                <i className="fa-solid fa-briefcase text-2xl text-slate-400"></i>

              </div>


              <h2 className="
                mt-5
                text-2xl
                font-bold
                text-[#172554]
              ">
                No Jobs Found
              </h2>


              <p className="
                mx-auto
                mt-2
                max-w-md
                text-slate-500
              ">

                {search.trim()
                  ? `No jobs found for "${search.trim()}".`
                  : "No placement opportunities available."}

              </p>


              {search.trim() && (

                <button
                  onClick={() => {

                    setSearch("");

                    setCurrentPage(1);

                  }}
                  className="
                    mt-6
                    rounded-xl
                    bg-[#172554]
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-[#0f1d46]
                  "
                >
                  Clear Search
                </button>

              )}

            </div>

          )}

        </div>

      </div>


      {/* ================= JOB DETAILS MODAL ================= */}

      {selectedJob && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-slate-950/60
            px-4
            py-6
            backdrop-blur-sm
          "
          onClick={closeModal}
        >

          <div
            className="
              relative
              w-full
              max-w-2xl
              max-h-[90vh]
              overflow-y-auto
              rounded-3xl
              bg-white
              shadow-2xl
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* MODAL HEADER */}

            <div className="
              sticky
              top-0
              z-10
              border-b
              border-slate-100
              bg-white
              px-6
              py-5
            ">

              <div className="
                flex
                items-start
                justify-between
                gap-4
              ">

                <div>

                  <p className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-orange-500
                  ">
                    Job Details
                  </p>


                  <h2 className="
                    mt-1
                    text-2xl
                    font-bold
                    text-[#172554]
                  ">
                    {selectedJob.title}
                  </h2>


                  <p className="mt-1 text-slate-500">
                    {selectedJob.companyName}
                  </p>

                </div>


                <button
                  type="button"
                  onClick={closeModal}
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-100
                    text-slate-500
                    transition
                    hover:bg-slate-200
                    hover:text-slate-800
                  "
                >

                  <i className="fa-solid fa-xmark"></i>

                </button>

              </div>

            </div>


            {/* MODAL CONTENT */}

            <div className="px-6 py-6">


              {/* KEY INFORMATION */}

              <div className="
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-3
              ">


                <div className="rounded-2xl bg-slate-50 p-3">

                  <p className="text-xs text-slate-400">
                    Package
                  </p>

                  <p className="mt-1 font-bold text-emerald-600">

                    {selectedJob.package
                      ? formatPackage(
                          selectedJob.package
                        )
                      : "N/A"}

                  </p>

                </div>


                <div className="rounded-2xl bg-slate-50 p-3">

                  <p className="text-xs text-slate-400">
                    Location
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">

                    {selectedJob.location || "N/A"}

                  </p>

                </div>


                <div className="rounded-2xl bg-slate-50 p-3">

                  <p className="text-xs text-slate-400">
                    Min CGPA
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">

                    {selectedJob.eligibilityCgpa ??
                      "No Limit"}

                  </p>

                </div>


                <div className="rounded-2xl bg-slate-50 p-3">

                  <p className="text-xs text-slate-400">
                    Status
                  </p>

                  <p
                    className={`mt-1 font-bold ${
                      isJobActive(selectedJob)
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >

                    {isJobActive(selectedJob)
                      ? "Active"
                      : "Closed"}

                  </p>

                </div>


                <div className="rounded-2xl bg-slate-50 p-3">

                  <p className="text-xs text-slate-400">
                    Deadline
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">

                    {selectedJob.deadline
                      ? formatDate(
                          selectedJob.deadline
                        )
                      : "N/A"}

                  </p>

                </div>

              </div>


              {/* REQUIRED SKILLS */}

              {selectedJob.requiredSkills?.length > 0 && (

                <div className="mt-6">

                  <h3 className="
                    text-sm
                    font-bold
                    text-[#172554]
                  ">
                    Required Skills
                  </h3>


                  <div className="
                    mt-3
                    flex
                    flex-wrap
                    gap-2
                  ">

                    {selectedJob.requiredSkills.map(
                      (skill, index) => (

                        <span
                          key={index}
                          className="
                            rounded-full
                            bg-blue-50
                            px-3
                            py-1.5
                            text-sm
                            font-medium
                            text-blue-700
                          "
                        >
                          {skill}
                        </span>

                      )
                    )}

                  </div>

                </div>

              )}


              {/* FULL DESCRIPTION */}

              <div className="mt-7">

                <h3 className="
                  text-sm
                  font-bold
                  text-[#172554]
                ">
                  About the Role
                </h3>


                <p className="
                  mt-3
                  whitespace-pre-line
                  text-sm
                  leading-7
                  text-slate-600
                ">

                  {selectedJob.description ||
                    "No description available."}

                </p>

              </div>


              {/* MODAL ACTION */}

              <div className="
                mt-7
                border-t
                border-slate-100
                pt-5
              ">

                <button
                  disabled={
                    selectedJob.alreadyApplied ||
                    !selectedJob.eligible ||
                    !isJobActive(selectedJob)
                  }
                  onClick={() => {

                    handleApply(
                      selectedJob._id
                    );

                    setSelectedJob(null);

                  }}
                  className={`
                    w-full
                    rounded-xl
                    py-3.5
                    text-sm
                    font-bold
                    transition
                    ${
                      selectedJob.alreadyApplied
                        ? "bg-emerald-600 text-white cursor-not-allowed"
                        : !selectedJob.eligible
                        ? "bg-red-500 text-white cursor-not-allowed"
                        : !isJobActive(selectedJob)
                        ? "bg-slate-400 text-white cursor-not-allowed"
                        : "bg-[#172554] text-white hover:bg-[#0f1d46]"
                    }
                  `}
                >

                  {selectedJob.alreadyApplied
                    ? "Already Applied"
                    : !selectedJob.eligible
                    ? "Not Eligible"
                    : !isJobActive(selectedJob)
                    ? "Closed"
                    : "Apply Now"}

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </PublicLayout>
  );
}

export default JobsPage;