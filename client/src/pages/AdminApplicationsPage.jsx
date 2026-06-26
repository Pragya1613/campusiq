import {
  useEffect,
  useState,
} from "react";

import PublicLayout from "../layouts/PublicLayout";

import {
  getAllApplications,
  updateApplicationStatus,
} from "../services/adminApplicationService";

function AdminApplicationsPage() {

  const [applications, setApplications] =
    useState([]);

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

        alert(
          "Status Updated Successfully"
        );

        fetchApplications();

      } catch (error) {

        console.log(error);

      }

    };

  return (
    <PublicLayout>

      <div className="min-h-screen bg-gray-100 px-6 py-10">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold text-[#172554] mb-8">
            Application Management
          </h1>

          {applications.length === 0 ? (

            <div className="bg-white rounded-2xl shadow-md p-10 text-center">

              <i className="fa-solid fa-users-slash text-5xl text-gray-400 mb-4"></i>

              <h2 className="text-2xl font-semibold text-gray-700">
                No Applications Found
              </h2>

              <p className="text-gray-500 mt-2">
                Student applications will appear here.
              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {applications.map(
                (application) => (

                  <div
                    key={application._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6"
                  >

                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

                      <div className="space-y-2">

                        <h2 className="text-2xl font-bold text-[#172554]">

                          <i className="fa-solid fa-user-graduate text-orange-500 mr-2"></i>

                          {
                            application
                              .studentId
                              ?.fullName
                          }

                        </h2>

                        <p className="text-gray-600">
                          📧 {
                            application
                              .studentId
                              ?.email
                          }
                        </p>

                        <p className="text-gray-600">
                          💼 Applied For:
                          {" "}
                          <span className="font-semibold">
                            {
                              application
                                .jobId
                                ?.title
                            }
                          </span>
                        </p>

                        <p className="text-gray-600">
                          🏢 Company:
                          {" "}
                          {
                            application
                              .jobId
                              ?.companyName
                          }
                        </p>

                        <p className="text-gray-600">
                          📅 Applied On:
                          {" "}
                          {new Date(
                            application.createdAt
                          ).toLocaleDateString()}
                        </p>

                      </div>

                      <div className="min-w-[220px]">

                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Application Status
                        </label>

                        <select
                          value={
                            application.status
                          }
                          onChange={(e) =>
                            handleStatusChange(
                              application._id,
                              e.target.value
                            )
                          }
                          className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
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

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </PublicLayout>
  );
}

export default AdminApplicationsPage;