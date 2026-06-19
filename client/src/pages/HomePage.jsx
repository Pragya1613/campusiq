import PublicLayout from "../layouts/PublicLayout";

function HomePage() {
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
            Connect students, colleges and recruiters
            through a modern placement management
            platform.
          </p>

          <div className="mt-8 flex justify-center gap-4">

            <a
              href="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Get Started
            </a>

            <a
              href="/login"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
            >
              Login
            </a>

          </div>

          {/* Stats */}

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

        {/* Features */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 pb-20">

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold">
              Students
            </h3>

            <p className="text-gray-500 mt-2">
              Manage profiles, apply for jobs
              and track applications.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold">
              Colleges
            </h3>

            <p className="text-gray-500 mt-2">
              Monitor placements and manage
              drives efficiently.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center">
            <h3 className="text-2xl font-bold">
              Recruiters
            </h3>

            <p className="text-gray-500 mt-2">
              Post jobs and discover top
              talent quickly.
            </p>
          </div>

        </div>

        {/* Footer */}

        <footer className="bg-white py-6 text-center border-t">

          <p className="text-gray-500">
            © 2026 CampusIQ | Smart Placement Portal
          </p>

        </footer>

      </div>
    </PublicLayout>
  );
}

export default HomePage;