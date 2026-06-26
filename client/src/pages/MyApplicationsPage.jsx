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
        return "bg-blue-100 text-blue-700";

      case "Shortlisted":
        return "bg-yellow-100 text-yellow-700";

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

      <div className="min-h-screen bg-gray-100 px-6 py-10">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold text-[#172554] mb-8">
            My Applications
          </h1>

          {applications.length === 0 ? (

            <div className="bg-white rounded-2xl shadow-md p-10 text-center">

              <i className="fa-solid fa-file-circle-xmark text-5xl text-gray-400 mb-4"></i>

              <h2 className="text-2xl font-semibold text-gray-700">
                No Applications Yet
              </h2>

              <p className="text-gray-500 mt-2">
                Start applying to jobs and track your placement journey here.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {applications.map(
                (application) => (

                  <div
                    key={application._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6"
                  >

                    <div className="flex justify-between items-start mb-4">

                      <div>

                        <h2 className="text-2xl font-bold text-[#172554]">
                          {
                            application.jobId
                              ?.title
                          }
                        </h2>

                        <p className="text-gray-600 mt-1">
                          {
                            application.jobId
                              ?.companyName
                          }
                        </p>

                      </div>

                      <i className="fa-solid fa-briefcase text-orange-500 text-2xl"></i>

                    </div>

                    <div className="space-y-2 text-gray-600 mb-5">

                      <p>
                        📍 {
                          application.jobId
                            ?.location ||
                          "Location Not Available"
                        }
                      </p>

                      <p>
                        📅 Applied On:
                        {" "}
                        {new Date(
                          application.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
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

          )}

        </div>

      </div>

    </PublicLayout>
  );
}

export default MyApplicationsPage;