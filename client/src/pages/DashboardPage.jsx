import {
  useEffect,
  useState,
} from "react";

import PublicLayout from "../layouts/PublicLayout";

import {
  getStudentDashboard,
} from "../services/dashboardService";

function DashboardPage() {

  const [stats, setStats] =
    useState(null);

  useEffect(() => {

    const fetchDashboard =
      async () => {

        try {

          const data =
            await getStudentDashboard();

          setStats(data);

        } catch (error) {

          console.log(error);

        }

      };

    fetchDashboard();

  }, []);

  if (!stats) {

    return (
      <PublicLayout>
        <div className="min-h-screen flex justify-center items-center">
          <h2 className="text-2xl font-semibold text-gray-600">
            Loading Dashboard...
          </h2>
        </div>
      </PublicLayout>
    );

  }

  return (
    <PublicLayout>

      <div className="min-h-screen bg-gray-100 px-6 py-10">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold text-[#172554] mb-2">
            Student Dashboard
          </h1>

          <p className="text-gray-500 mb-8">
            Track your placement progress
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

            {/* Applied */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center border-t-4 border-blue-500">

              <i className="fa-solid fa-file-lines text-4xl text-blue-500 mb-3"></i>

              <h3 className="text-gray-500">
                Applied
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.applied}
              </h2>

            </div>

            {/* Shortlisted */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center border-t-4 border-yellow-500">

              <i className="fa-solid fa-star text-4xl text-yellow-500 mb-3"></i>

              <h3 className="text-gray-500">
                Shortlisted
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.shortlisted}
              </h2>

            </div>

            {/* Interviews */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center border-t-4 border-purple-500">

              <i className="fa-solid fa-microphone text-4xl text-purple-500 mb-3"></i>

              <h3 className="text-gray-500">
                Interviews
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.interviews}
              </h2>

            </div>

            {/* Selected */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center border-t-4 border-green-500">

              <i className="fa-solid fa-trophy text-4xl text-green-500 mb-3"></i>

              <h3 className="text-gray-500">
                Selected
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.selected}
              </h2>

            </div>

            {/* Rejected */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center border-t-4 border-red-500">

              <i className="fa-solid fa-circle-xmark text-4xl text-red-500 mb-3"></i>

              <h3 className="text-gray-500">
                Rejected
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.rejected}
              </h2>

            </div>

          </div>

        </div>

      </div>

    </PublicLayout>
  );
}

export default DashboardPage;