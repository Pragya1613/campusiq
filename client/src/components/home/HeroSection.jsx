import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section id="home" className=" scroll-mt-20 relative overflow-hidden bg-gradient-to-r from-[#172554] via-[#2E2A8F] to-[#0E7490] min-h-[58vh] lg:min-h-[60vh] flex items-center">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-cyan-400/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl xl:text-6xl font-extrabold leading-tight text-white">
            CampusIQ
          </h1>

          <h2 className="mt-3 text-3xl lg:text-4xl font-semibold text-slate-100 leading-snug">
            Campus Placement Made Smarter.
          </h2>

          <p className="mt-5 max-w-lg text-lg leading-8 text-slate-200">
            One platform to analyze resumes, discover placement opportunities,
            track applications and prepare for interviews with confidence.
          </p>

          <div className="flex flex-wrap gap-4 mt-7">
            <Link
              to="/register"
              className="px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 transition font-semibold shadow-lg"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="px-7 py-3.5 rounded-xl border border-white/30 hover:bg-white hover:text-[#172554] transition font-semibold"
            >
              Login
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 mt-6 text-[13px] text-blue-100">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-file-waveform text-orange-400"></i>
              Resume Analysis
            </div>

            <div className="flex items-center gap-2">
              <i className="fa-solid fa-list-check text-orange-400"></i>
              Application Tracking
            </div>

            <div className="flex items-center gap-2">
              <i className="fa-solid fa-comments text-orange-400"></i>
              Interview Experiences
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-4 -right-2 bg-orange-500 text-white px-5 py-3 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <p className="text-sm text-orange-100">Resume Score</p>
            <h3 className="text-3xl font-bold mt-1">84 / 100</h3>
            <p className="text-sm mt-1">Excellent</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-7 max-w-[500px] ml-auto text-slate-900">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#172554]">
                Student Dashboard
              </h3>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-slate-500 text-sm">Resume Score</p>
                <h2 className="text-3xl font-bold text-indigo-700 mt-2">84</h2>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-slate-500 text-sm">Placement Readiness</p>
                <h2 className="text-3xl font-bold text-green-600 mt-2">79%</h2>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex justify-between mb-2">
                <span className="text-slate-600">Profile Completion</span>
                <span className="font-semibold">90%</span>
              </div>

              <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full w-[90%] rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"></div>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-[15px]">
              <div className="flex justify-between">
                <span>Resume Analysis</span>
                <span className="text-green-600 font-semibold">Completed Today</span>
              </div>

              <div className="flex justify-between">
                <span>Applications Submitted</span>
                <span className="font-semibold">18</span>
              </div>

              <div className="flex justify-between">
                <span>Eligible Companies</span>
                <span className="font-semibold">26</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;