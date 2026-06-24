import { useEffect, useState } from "react";
import api from "../services/api";

import PublicLayout from "../layouts/PublicLayout";

function AdminDashboardPage() {
  const [stats, setStats] =
    useState(null);

  useEffect(() => {
    const fetchStats =
      async () => {
        try {
          const response =
            await api.get(
              "/dashboard"
            );

          setStats(
            response.data
          );
        } catch (error) {
          console.log(error);
        }
      };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <h2 className="text-2xl font-semibold">
            Loading...
          </h2>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>

      <div className="min-h-screen bg-gray-100 p-8">

        <h1 className="text-4xl font-bold text-[#1E3A8A]  mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h3 className="text-gray-500">
              Total Students
            </h3>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {stats.totalStudents}
            </h2>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h3 className="text-gray-500">
              Total Jobs
            </h3>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              {stats.totalJobs}
            </h2>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h3 className="text-gray-500">
              Active Jobs
            </h3>

            <h2 className="text-4xl font-bold text-purple-600 mt-2">
              {stats.activeJobs}
            </h2>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h3 className="text-gray-500">
              Applications
            </h3>

            <h2 className="text-4xl font-bold text-orange-600 mt-2">
              {stats.totalApplications}
            </h2>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h3 className="text-gray-500">
              Selected
            </h3>

            <h2 className="text-4xl font-bold text-red-600 mt-2">
              {stats.selectedStudents}
            </h2>
          </div>

        </div>

      </div>

    </PublicLayout>
  );
}

export default AdminDashboardPage;