import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
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
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mb-8">
            Manage students, jobs and applications
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

            {/* Total Students */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center border-t-4 border-blue-500">

              <i className="fa-solid fa-user-graduate text-4xl text-blue-500 mb-3"></i>

              <h3 className="text-gray-500">
                Total Students
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.totalStudents}
              </h2>

            </div>

            {/* Total Jobs */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center border-t-4 border-green-500">

              <i className="fa-solid fa-briefcase text-4xl text-green-500 mb-3"></i>

              <h3 className="text-gray-500">
                Total Jobs
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.totalJobs}
              </h2>

            </div>

            {/* Active Jobs */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center border-t-4 border-orange-500">

              <i className="fa-solid fa-fire text-4xl text-orange-500 mb-3"></i>

              <h3 className="text-gray-500">
                Active Jobs
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.activeJobs}
              </h2>

            </div>

            {/* Applications */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center border-t-4 border-purple-500">

              <i className="fa-solid fa-file-lines text-4xl text-purple-500 mb-3"></i>

              <h3 className="text-gray-500">
                Applications
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.totalApplications}
              </h2>

            </div>

            {/* Selected */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center border-t-4 border-yellow-500">

              <i className="fa-solid fa-trophy text-4xl text-yellow-500 mb-3"></i>

              <h3 className="text-gray-500">
                Selected
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.selectedStudents}
              </h2>

            </div>

          </div>

          {/* Quick Actions */}

            <div className="mt-12">
              
              <h2 className="text-2xl font-bold text-[#172554] mb-6">
                Quick Actions
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
              
                <Link
                  to="/create-job"
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-gray-200"
                >
                  <i className="fa-solid fa-plus text-3xl text-green-500 mb-4"></i>
              
                  <h3 className="text-xl font-semibold text-[#172554]">
                    Create Job
                  </h3>
              
                  <p className="text-gray-500 mt-2">
                    Publish a new placement opportunity.
                  </p>
                </Link>
              
                <Link
                  to="/manage-jobs"
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-gray-200"
                >
                  <i className="fa-solid fa-briefcase text-3xl text-blue-500 mb-4"></i>
              
                  <h3 className="text-xl font-semibold text-[#172554]">
                    Manage Jobs
                  </h3>
              
                  <p className="text-gray-500 mt-2">
                    Edit, close or delete existing jobs.
                  </p>
                </Link>
              
                <Link
                  to="/admin-applications"
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-gray-200"
                >
                  <i className="fa-solid fa-file-lines text-3xl text-orange-500 mb-4"></i>
              
                  <h3 className="text-xl font-semibold text-[#172554]">
                    Applications
                  </h3>
              
                  <p className="text-gray-500 mt-2">
                    Review and update application status.
                  </p>
                </Link>
              
              </div>
              
            </div>

        </div>

      </div>

    </PublicLayout>
  );
}

export default AdminDashboardPage;