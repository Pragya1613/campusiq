import PublicLayout from "../layouts/PublicLayout";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-100">

        {/* Hero Section */}

        <section className="text-center py-20 px-6 bg-gradient-to-r from-slate-900 via-indigo-900 to-cyan-800 text-white">

          <h1 className="text-6xl font-bold">
            CampusIQ
          </h1>

          <p className="mt-6 text-2xl">
            Smart Campus Placement Portal
          </p>

          <p className="mt-6 max-w-3xl mx-auto text-blue-100">
            Simplifying campus placements by connecting
            students, colleges and placement cells through
            one centralized platform.
          </p>

          <div className="mt-10 flex justify-center gap-4">

            <Link
              to="/register"
                className="bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition"
            >
              Let's Start
            </Link>

            <Link
              to="/login"
              className="border border-white px-8 py-4 rounded-lg hover:bg-white hover:text-slate-900 transition"
            >
              Login
            </Link>

          </div>

        </section>

        {/* Stats Section */}

        <section className="py-16 px-6">

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white p-8 rounded-xl shadow text-center">

              <h2 className="text-4xl font-bold text-blue-600">
                1000+
              </h2>

              <p className="text-gray-600 mt-2">
                Students
              </p>

            </div>

            <div className="bg-white p-8 rounded-xl shadow text-center">

              <h2 className="text-4xl font-bold text-green-600">
                100+
              </h2>

              <p className="text-gray-600 mt-2">
                Companies
              </p>

            </div>

            <div className="bg-white p-8 rounded-xl shadow text-center">

              <h2 className="text-4xl font-bold text-purple-600">
                5000+
              </h2>

              <p className="text-gray-600 mt-2">
                Applications
              </p>

            </div>

          </div>

        </section>

        {/* Features Section */}

        <section className="py-16 px-6 bg-white">

          <h2 className="text-4xl font-bold text-center mb-12 text-slate-900">
            Platform Features
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="shadow-lg rounded-xl p-8">

              <h3 className="text-2xl font-bold text-blue-600">
                Student Profiles
              </h3>

              <p className="text-gray-600 mt-4">
                Create professional profiles with skills,
                resume, GitHub, LinkedIn and academic details.
              </p>

            </div>

            <div className="shadow-lg rounded-xl p-8">

              <h3 className="text-2xl font-bold text-green-600">
                Job Applications
              </h3>

              <p className="text-gray-600 mt-4">
                Explore placement opportunities and apply
                directly through the portal.
              </p>

            </div>

            <div className="shadow-lg rounded-xl p-8">

              <h3 className="text-2xl font-bold text-purple-600">
                Application Tracking
              </h3>

              <p className="text-gray-600 mt-4">
                Track application status from Applied
                to Selected in real time.
              </p>

            </div>

          </div>

        </section>

        {/* Why CampusIQ */}

        <section className="py-20 px-6">

          <h2 className="text-4xl font-bold text-center mb-12 text-slate-900">
            Why CampusIQ?
          </h2>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

            <div className="bg-white p-8 rounded-xl shadow">

              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                For Students
              </h3>

              <ul className="space-y-3 text-gray-600">

                <li>
                  ✓ Easy job discovery
                </li>

                <li>
                  ✓ Resume showcase
                </li>

                <li>
                  ✓ Application tracking
                </li>

                <li>
                  ✓ Centralized profile management
                </li>

              </ul>

            </div>

            <div className="bg-white p-8 rounded-xl shadow">

              <h3 className="text-2xl font-bold text-green-600 mb-4">
                For Placement Cell
              </h3>

              <ul className="space-y-3 text-gray-600">

                <li>
                  ✓ Manage drives efficiently
                </li>

                <li>
                  ✓ Monitor student applications
                </li>

                <li>
                  ✓ Simplify shortlisting
                </li>

                <li>
                  ✓ Track placement statistics
                </li>

              </ul>

            </div>

          </div>

        </section>

        {/* CTA Section */}

        <section className="bg-slate-900 text-white py-20 text-center">

          <h2 className="text-4xl font-bold">
            Ready To Start Your Placement Journey?
          </h2>

          <p className="mt-4 text-blue-100">
            Join CampusIQ and manage your placements smarter.
          </p>

          <Link
            to="/register"
            className="inline-block mt-8 bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition"
          >
              Register Now
          </Link>

        </section>

      <Footer/>
      </div>
    </PublicLayout>
  );
}

export default HomePage;