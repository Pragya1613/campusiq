import { useEffect, useState } from "react";

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
    <div style={{ padding: "20px" }}>
      <h1>All Applications</h1>

      {applications.map(
        (application) => (
          <div
            key={application._id}
          >
            <h3>
              Student:
              {" "}
              {
                application.studentId
                  ?.fullName
              }
            </h3>

            <p>
              Email:
              {" "}
              {
                application.studentId
                  ?.email
              }
            </p>

            <p>
              Job:
              {" "}
              {
                application.jobId
                  ?.title
              }
            </p>

            <p>
              Current Status:
              {" "}
              {
                application.status
              }
            </p>

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

            <hr />
          </div>
        )
      )}
    </div>
  );
}

export default AdminApplicationsPage;