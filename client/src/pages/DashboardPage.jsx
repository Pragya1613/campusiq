import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

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

          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-10">

            <div>

              <p className="uppercase tracking-[0.3em] text-sm font-semibold text-orange-500">

                Student Portal

              </p>

              <h1 className="text-4xl font-bold text-[#172554] mt-2">

                Welcome Back,
                {" "}
                {stats.student?.fullName || "Student"}

              </h1>

              <p className="text-gray-500 mt-2 text-lg">

                {stats.student?.branch}

                <span className="mx-2">•</span>

                Semester {stats.student?.currentSemester}

              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 w-full lg:w-80">

              <div className="flex justify-between items-center">

                <div>

                <div>
                  
                  <h3 className="font-semibold text-[#172554]">
                  
                    Profile Completion
                  
                  </h3>
                  
                  <p className="text-sm text-gray-500 mt-1">
                  
                    Complete your placement profile.
                  
                  </p>
                  
                  <p className="text-sm text-green-600 mt-2 font-medium">
                  
                    <i className="fa-solid fa-circle-check mr-2"></i>
                  
                    Placement Ready
                  
                  </p>
                  
                </div>

                </div>

                <span className="text-3xl font-bold text-orange-500">

                  {stats.profileCompletion}%

                </span>

              </div>

              <div className="mt-5 h-3 rounded-full bg-gray-200">

                <div
                  className="h-3 rounded-full bg-orange-500"
                  style={{
                    width: `${stats.profileCompletion}%`,
                  }}
                ></div>

              </div>
                
            </div>
                
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">

            {/* Applied */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 text-center border-t-4 border-blue-500">

              <i className="fa-solid fa-file-lines text-4xl text-blue-500 mb-3"></i>

              <h3 className="text-gray-500">
                Applied
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.applied}
              </h2>

            </div>

            {/* Shortlisted */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 text-center border-t-4 border-yellow-500">

              <i className="fa-solid fa-star text-4xl text-yellow-500 mb-3"></i>

              <h3 className="text-gray-500">
                Shortlisted
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.shortlisted}
              </h2>

            </div>

            {/* Interviews */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 text-center border-t-4 border-purple-500">

              <i className="fa-solid fa-microphone text-4xl text-purple-500 mb-3"></i>

              <h3 className="text-gray-500">
                Interviews
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.interviews}
              </h2>

            </div>

            {/* Selected */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 text-center border-t-4 border-green-500">

              <i className="fa-solid fa-trophy text-4xl text-green-500 mb-3"></i>

              <h3 className="text-gray-500">
                Selected
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.selected}
              </h2>

            </div>

            {/* Rejected */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 text-center border-t-4 border-red-500">

              <i className="fa-solid fa-circle-xmark text-4xl text-red-500 mb-3"></i>

              <h3 className="text-gray-500">
                Rejected
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.rejected}
              </h2>

            </div>

          </div>

          <div className="mt-12">

            <h2 className="text-2xl font-bold text-[#172554] mb-6">

              Quick Actions

            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <Link
                to="/jobs"
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6"
              >
              
                <i className="fa-solid fa-briefcase text-3xl text-blue-500 mb-4"></i>

                <h3 className="text-xl font-semibold text-[#172554]">

                  Browse Jobs

                </h3>

                <p className="text-gray-500 mt-2">

                  Explore placement opportunities.

                </p>

              </Link>

              <Link
                to="/applications"
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6"
              >
              
                <i className="fa-solid fa-file-lines text-3xl text-orange-500 mb-4"></i>

                <h3 className="text-xl font-semibold text-[#172554]">

                  My Applications

                </h3>

                <p className="text-gray-500 mt-2">

                  Track your application status.

                </p>

              </Link>

              <Link
                to="/profile"
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6"
              >
              
                <i className="fa-solid fa-user-pen text-3xl text-green-500 mb-4"></i>

                <h3 className="text-xl font-semibold text-[#172554]">

                  Update Profile

                </h3>

                <p className="text-gray-500 mt-2">

                  Keep your profile placement-ready.

                </p>

              </Link>

            </div>

          </div>

          <div className="mt-12">

            <h2 className="text-2xl font-bold text-[#172554] mb-6">

              Recent Placement Updates

            </h2>

            <div className="bg-white rounded-2xl shadow-md p-6">

              <div className="flex items-start gap-4 py-4 border-b">

                <i className="fa-solid fa-bullhorn text-orange-500 text-xl mt-1"></i>

                <div>

                  <h3 className="font-semibold text-[#172554]">

                    Latest Placement Opportunities

                  </h3>

                  <p className="text-gray-500 mt-1">

                    Check the latest placement opportunities and apply before the deadline.

                  </p>

                </div>

              </div>

              <div className="flex items-start gap-4 py-4 border-b">

                <i className="fa-solid fa-calendar-days text-blue-500 text-xl mt-1"></i>

                <div>

                  <h3 className="font-semibold text-[#172554]">

                    Keep Track of Deadlines

                  </h3>

                  <p className="text-gray-500 mt-1">

                    Review application deadlines regularly to avoid missing opportunities.

                  </p>

                </div>

              </div>

              <div className="flex items-start gap-4 pt-4">

                <i className="fa-solid fa-circle-check text-green-500 text-xl mt-1"></i>

                <div>

                  <h3 className="font-semibold text-[#172554]">

                    Keep Your Profile Updated

                  </h3>

                  <p className="text-gray-500 mt-1">

                    Students with complete profiles have better placement visibility.

                  </p>

                </div>

              </div>

            </div>

          </div> 

          <div className="mt-12">

            <h2 className="text-2xl font-bold text-[#172554] mb-6">

              Placement Readiness

            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-white rounded-2xl shadow-md p-6">

                <i className="fa-solid fa-file-arrow-up text-3xl text-orange-500 mb-4"></i>

                <h3 className="font-semibold text-[#172554]">

                  Resume

                </h3>

                <p className="text-gray-500 mt-2">

                  Upload your latest resume before applying.

                </p>

              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">

                <i className="fa-solid fa-code text-3xl text-green-500 mb-4"></i>

                <h3 className="font-semibold text-[#172554]">

                  Technical Skills

                </h3>

                <p className="text-gray-500 mt-2">

                  Keep your skills updated for better job matching.

                </p>

              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">

                <i className="fa-solid fa-graduation-cap text-3xl text-blue-500 mb-4"></i>

                <h3 className="font-semibold text-[#172554]">

                  Academic Performance

                </h3>

                <p className="text-gray-500 mt-2">

                  Maintain a strong CGPA to stay eligible for more companies.

                </p>

              </div>

            </div>

          </div>      


        </div>

      </div>

    </PublicLayout>
  );
}

export default DashboardPage;