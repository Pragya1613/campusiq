import {
  useEffect,
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

  const getStatusColor = (
    status
  ) => {
    switch (status) {
      case "Applied":
        return "bg-yellow-100 text-yellow-700";

      case "Shortlisted":
        return "bg-blue-100 text-blue-700";

      case "Interview Scheduled":
        return "bg-purple-100 text-purple-700";

      case "Selected":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <PublicLayout>
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        My Applications
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {applications.map(
          (application) => (
            <div
              key={application._id}
              className="bg-white shadow-lg rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold">
                {
                  application.jobId
                    ?.title
                }
              </h2>

              <p className="text-gray-600 mt-2">
                {
                  application.jobId
                    ?.companyName
                }
              </p>

              <span
                className={`inline-block mt-4 px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                  application.status
                )}`}
              >
                {
                  application.status
                }
              </span>
            </div>
          )
        )}

      </div>
    </div>
    </PublicLayout>
  );
}

export default MyApplicationsPage;