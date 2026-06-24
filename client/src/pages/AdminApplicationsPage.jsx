import { useEffect, useState } from "react";
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

  const fetchApplications = async () => {
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

        alert("Status Updated");

        fetchApplications();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <PublicLayout>
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Application Management
      </h1>

      <div className="space-y-4">

        {applications.map(
          (application) => (
            <div
              key={application._id}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between"
            >

              <div>

                <h2 className="text-xl font-bold">
                  {
                    application
                      .studentId
                      ?.fullName
                  }
                </h2>

                <p className="text-gray-500">
                  {
                    application
                      .studentId
                      ?.email
                  }
                </p>

                <p className="mt-2">
                  Applied For:
                  {" "}
                  <span className="font-semibold">
                    {
                      application
                        .jobId
                        ?.title
                    }
                  </span>
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Company:
                  {" "}
                  {
                    application
                      .jobId
                      ?.companyName
                  }
                </p>

              </div>

              <div className="mt-4 md:mt-0">

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
                  className="border rounded-lg p-2"
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
          )
        )}

      </div>

    </div>
    </PublicLayout>
  );
}

export default AdminApplicationsPage;