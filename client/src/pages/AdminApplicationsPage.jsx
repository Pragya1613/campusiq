import {
  useEffect,
  useState,
} from "react";

import PublicLayout from "../layouts/PublicLayout";

import {
  getAllApplications,
  updateApplicationStatus,
} from "../services/adminApplicationService";

import StudentProfileModal from "../components/StudentProfileModal";

import toast from "react-hot-toast";


function AdminApplicationsPage() {

  const [applications, setApplications] =
    useState([]);

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [showProfile, setShowProfile] =
    useState(false);


  useEffect(() => {
    fetchApplications();
  }, []);


  const fetchApplications =
    async () => {

      try {

        const data =
          await getAllApplications();

        setApplications(data);

      } catch (error) {

        console.log(error);

      }

    };


  const handleStatusChange =
    async (id, status) => {

      try {

        await updateApplicationStatus(
          id,
          status
        );

        toast.success(
          "Status Updated Successfully"
        );

        fetchApplications();

      } catch (error) {

        console.log(error);

      }

    };


  const handleViewProfile = (
    application
  ) => {

    setSelectedStudent(
      application.studentId
    );

    setShowProfile(true);

  };


  const handleDownloadResume =
    async (application) => {

      try {

        const response =
          await fetch(
            application.studentId.resumeUrl
          );

        const blob =
          await response.blob();

        const url =
          window.URL.createObjectURL(blob);

        const link =
          document.createElement("a");

        link.href = url;

        link.download =
          application.studentId.resumeName ||
          "Resume.pdf";

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

      }

      catch (error) {

        console.log(error);

      }

    };


  return (

    <PublicLayout>

      <div className="min-h-screen bg-slate-50 px-5 sm:px-6 lg:px-8 py-10">

        <div className="max-w-7xl mx-auto">


          {/* Page Header */}

          <div className="mb-8">

            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-orange-500 mb-2">

              Placement Management

            </p>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

              <div>

                <h1 className="text-3xl sm:text-4xl font-bold text-[#172554]">

                  Application Management

                </h1>

                <p className="text-slate-500 mt-2 text-base sm:text-lg">

                  Review student applications and manage placement status.

                </p>

              </div>


              <div className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm">

                <i className="fa-solid fa-file-lines text-blue-500"></i>

                <span className="text-sm font-medium text-slate-600">

                  {applications.length}{" "}
                  {applications.length === 1
                    ? "Application"
                    : "Applications"}

                </span>

              </div>

            </div>

          </div>


          {/* Empty State */}

          {applications.length === 0 ? (

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 sm:p-16 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center">

                <i className="fa-solid fa-users-slash text-2xl text-slate-400"></i>

              </div>

              <h2 className="text-2xl font-semibold text-[#172554] mt-5">

                No Applications Found

              </h2>

              <p className="text-slate-500 mt-2">

                Student applications will appear here.

              </p>

            </div>

          ) : (


            /* Applications */

            <div className="space-y-5">

              {applications.map(
                (application) => (

                  <div
                    key={application._id}
                    className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-7"
                  >


                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">


                      {/* Student Information */}

                      <div className="flex-1 min-w-0">


                        {/* Student Name */}

                        <div className="flex items-center gap-3 mb-5">

                          <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">

                            <i className="fa-solid fa-user-graduate text-orange-500 text-lg"></i>

                          </div>

                          <div className="min-w-0">

                            <h2 className="text-xl sm:text-2xl font-bold text-[#172554] group-hover:text-[#1e3a8a] transition-colors duration-200 truncate">

                              {application.studentId?.fullName}

                            </h2>

                            <p className="text-sm text-slate-500 mt-0.5">

                              Student Applicant

                            </p>

                          </div>

                        </div>


                        {/* Information */}

                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">


                          {/* Email */}

                          <div className="flex items-start gap-3">

                            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">

                              <i className="fa-solid fa-envelope text-blue-500 text-sm"></i>

                            </div>

                            <div className="min-w-0">

                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">

                                Email

                              </p>

                              <p className="text-sm sm:text-base text-slate-700 mt-0.5 truncate">

                                {application.studentId?.email}

                              </p>

                            </div>

                          </div>


                          {/* Job */}

                          <div className="flex items-start gap-3">

                            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">

                              <i className="fa-solid fa-briefcase text-orange-500 text-sm"></i>

                            </div>

                            <div>

                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">

                                Applied For

                              </p>

                              <p className="text-sm sm:text-base font-semibold text-[#172554] mt-0.5">

                                {application.jobId?.title}

                              </p>

                            </div>

                          </div>


                          {/* Company */}

                          <div className="flex items-start gap-3">

                            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">

                              <i className="fa-solid fa-building text-indigo-500 text-sm"></i>

                            </div>

                            <div>

                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">

                                Company

                              </p>

                              <p className="text-sm sm:text-base font-semibold text-[#172554] mt-0.5">

                                {application.jobId?.companyName}

                              </p>

                            </div>

                          </div>


                          {/* CGPA */}

                          <div className="flex items-start gap-3">

                            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">

                              <i className="fa-solid fa-chart-line text-emerald-500 text-sm"></i>

                            </div>

                            <div>

                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">

                                CGPA

                              </p>

                              <p className="text-sm sm:text-base font-semibold text-[#172554] mt-0.5">

                                {application.studentId?.cgpa ?? "N/A"}

                              </p>

                            </div>

                          </div>


                          {/* Applied Date */}

                          <div className="flex items-start gap-3">

                            <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">

                              <i className="fa-solid fa-calendar-days text-violet-500 text-sm"></i>

                            </div>

                            <div>

                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">

                                Applied On

                              </p>

                              <p className="text-sm sm:text-base font-semibold text-[#172554] mt-0.5">

                                {new Date(
                                  application.createdAt
                                ).toLocaleDateString()}

                              </p>

                            </div>

                          </div>


                        </div>


                        {/* Actions */}

                        {application.studentId?.resumeUrl && (

                          <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-slate-100">


                            <button
                              onClick={() =>
                                handleViewProfile(
                                  application
                                )
                              }
                              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#172554] text-white text-sm font-semibold hover:bg-[#1e3a8a] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                            >

                              <i className="fa-solid fa-id-card"></i>

                              View Profile

                            </button>


                            <button
                              onClick={() =>
                                handleDownloadResume(
                                  application
                                )
                              }
                              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                            >

                              <i className="fa-solid fa-download"></i>

                              Download Resume

                            </button>


                          </div>

                        )}


                      </div>


                      {/* Status Section */}

                      <div className="w-full lg:w-[280px] lg:border-l lg:border-slate-100 lg:pl-7">


                        <div className="flex items-center justify-between lg:block">

                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400 mb-2">

                            Application Status

                          </p>


                          {/* Current Status */}

                          <span
                            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold
                              ${
                                application.status === "Applied"
                                  ? "bg-blue-50 text-blue-600"
                                  : application.status === "Shortlisted"
                                  ? "bg-amber-50 text-amber-600"
                                  : application.status === "Interview Scheduled"
                                  ? "bg-purple-50 text-purple-600"
                                  : application.status === "Selected"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : "bg-red-50 text-red-600"
                              }`}
                          >

                            <i
                              className={
                                application.status ===
                                "Selected"
                                  ? "fa-solid fa-circle-check"
                                  : application.status ===
                                    "Rejected"
                                  ? "fa-solid fa-circle-xmark"
                                  : application.status ===
                                    "Interview Scheduled"
                                  ? "fa-solid fa-calendar-check"
                                  : application.status ===
                                    "Shortlisted"
                                  ? "fa-solid fa-star"
                                  : "fa-solid fa-hourglass-half"
                              }
                            ></i>

                            {application.status}

                          </span>

                        </div>


                        {/* Update Status */}

                        <div className="mt-5">

                          <label className="block text-sm font-semibold text-slate-600 mb-2">

                            Update Status

                          </label>


                          <div className="relative">

                            <i className="fa-solid fa-sliders absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>

                            <select
                              value={application.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  application._id,
                                  e.target.value
                                )
                              }
                              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm font-medium text-slate-700 outline-none focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 cursor-pointer"
                            >

                              <option>
                                Applied
                              </option>

                              <option>
                                Shortlisted
                              </option>

                              <option>
                                Interview Scheduled
                              </option>

                              <option>
                                Selected
                              </option>

                              <option>
                                Rejected
                              </option>

                            </select>

                            <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>

                          </div>

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


      {/* Student Profile Modal */}

      <StudentProfileModal
        isOpen={showProfile}
        student={selectedStudent}
        onClose={() => {
          setShowProfile(false);
          setSelectedStudent(null);
        }}
      />

    </PublicLayout>

  );

}


export default AdminApplicationsPage;