import { useEffect, useState } from "react";
import api from "../services/api";

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
    return <h2>Loading...</h2>;
  }

 return (
  <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-4xl font-bold text-blue-600 mb-8">
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
 );
}

export default AdminDashboardPage;