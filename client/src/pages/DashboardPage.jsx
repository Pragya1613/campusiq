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
      <h2 className="text-center text-xl mt-10">
        Loading...
      </h2>
    );
  }

  return (
    <PublicLayout>
    <div className="p-8">
      <h1 className="text-4xl font-bold text-[#1E3A8A] mb-8">
        Student Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500">
            Applied
          </h2>

          <p className="text-3xl font-bold">
            {stats.applied}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500">
            Shortlisted
          </h2>

          <p className="text-3xl font-bold">
            {stats.shortlisted}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500">
            Interviews
          </h2>

          <p className="text-3xl font-bold">
            {stats.interviews}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500">
            Selected
          </h2>

          <p className="text-3xl font-bold">
            {stats.selected}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500">
            Rejected
          </h2>

          <p className="text-3xl font-bold">
            {stats.rejected}
          </p>
        </div>

      </div>
    </div>
    </PublicLayout>
  );
}

export default DashboardPage;