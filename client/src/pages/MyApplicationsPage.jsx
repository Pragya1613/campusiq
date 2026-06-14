import {
  useEffect,
  useState,
} from "react";

import {
  getMyApplications,
} from "../services/applicationService";

function MyApplicationsPage() {
  const [
    applications,
    setApplications,
  ] = useState([]);

  useEffect(() => {
    const fetchApplications =
      async () => {
        try {
          const data =
            await getMyApplications();

          setApplications(data);
        } catch (error) {
          console.log(error);
        }
      };

    fetchApplications();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>
        My Applications
      </h1>

      {applications.map(
        (application) => (
          <div
            key={application._id}
          >
            <h3>
              {
                application.jobId
                  .title
              }
            </h3>

            <p>
              {
                application.jobId
                  .companyName
              }
            </p>

            <p>
              Status:
              {
                application.status
              }
            </p>

            <hr />
          </div>
        )
      )}
    </div>
  );
}

export default MyApplicationsPage;