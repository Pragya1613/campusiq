import PublicLayout from "../layouts/PublicLayout";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function HomePage() {
  const {
    isAuthenticated,
  } = useContext(AuthContext);

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-100">

        <div className="text-center py-24 px-6">

          <h1 className="text-6xl font-bold text-blue-600">
            CampusIQ
          </h1>

          <p className="mt-6 text-xl text-gray-600">
            Smart Campus Placement &
            Recruitment Portal
          </p>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Connect students and placement cells
            through a modern placement management
            platform.
          </p>

          <div className="mt-8 flex justify-center gap-4">

            {!isAuthenticated && (
              <>
                <Link
                  to="/get-started"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Get Started
                </Link>

                <Link
                  to="/login"
                  className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
                >
                  Login
                </Link>
              </>
            )}

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Go To Dashboard
              </Link>
            )}

          </div>

          <div className="flex justify-center gap-8 mt-16 flex-wrap">

            <div className="bg-white p-6 rounded-xl shadow w-40">
              <h2 className="text-3xl font-bold text-blue-600">
                100+
              </h2>
              <p>Students</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow w-40">
              <h2 className="text-3xl font-bold text-blue-600">
                25+
              </h2>
              <p>Companies</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow w-40">
              <h2 className="text-3xl font-bold text-blue-600">
                500+
              </h2>
              <p>Applications</p>
            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 pb-20">

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold">
              Students
            </h3>

            <p className="text-gray-500 mt-2">
              Create profiles, apply for jobs,
              track application status and manage
              your placement journey.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold">
              Colleges
            </h3>

            <p className="text-gray-500 mt-2">
              Monitor student placements,
              maintain records and manage
              recruitment drives efficiently.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold">
              Placement Cell
            </h3>

            <p className="text-gray-500 mt-2">
              Create jobs, manage applications
              and monitor placements.
            </p>
          </div>

        </div>

      </div>
    </PublicLayout>
  );
}

export default HomePage;