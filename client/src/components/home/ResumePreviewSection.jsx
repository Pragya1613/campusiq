import { Link } from "react-router-dom";

function ResumePreviewSection() {
  const missingSkills = ["Docker", "AWS", "Redis"];
  const matchedCompanies = ["Google", "Adobe", "Flipkart", "Microsoft"];

  return (
    <section className="py-24 bg-white min-h-[84vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div>
            <span className="uppercase tracking-widest text-orange-500 font-semibold">
              AI Resume Review
            </span>

            <h2 className="mt-4 text-5xl font-bold text-[#172554] leading-tight">
              Instant resume analysis
            </h2>

            <p className="mt-6 text-lg text-slate-500 leading-8 max-w-xl">
              Upload your resume and get an AI-powered resume score,
              placement readiness, company matches and personalized improvement
              suggestions within seconds.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <i className="fa-solid fa-file-arrow-up text-indigo-700"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-[#172554]">
                    Upload Resume
                  </h4>
                  <p className="text-slate-500">
                    Upload your latest resume securely.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                  <i className="fa-solid fa-robot text-green-700"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-[#172554]">
                    AI Analysis
                  </h4>
                  <p className="text-slate-500">
                    Get structured insights from Gemini.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                  <i className="fa-solid fa-chart-column text-orange-600"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-[#172554]">
                    Placement Readiness
                  </h4>
                  <p className="text-slate-500">
                    Understand exactly where you stand.
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/register"
              className="inline-flex items-center gap-3 mt-12 bg-orange-500 hover:bg-orange-600 transition text-white px-8 py-4 rounded-xl font-semibold shadow-lg"
            >
              Start AI Analysis
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          {/* RIGHT */}
          <div>
            <div className="rounded-[30px] border border-slate-200 shadow-2xl overflow-hidden bg-white">
              <div className="bg-slate-100 px-5 py-3 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <p className="text-sm text-slate-500">
                  campusiq.ai
                </p>
              </div>

              <div className="bg-white p-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-[#172554]">
                    Resume.pdf
                  </h3>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Completed
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-8">
                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">
                      Resume Score
                    </p>
                    <h2 className="text-4xl font-bold text-indigo-700 mt-2">
                      84
                    </h2>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">
                      Placement
                    </p>
                    <h2 className="text-4xl font-bold text-green-600 mt-2">
                      79
                    </h2>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between">
                    <p className="text-slate-600">
                      Profile Completion
                    </p>
                    <p className="font-semibold">
                      90%
                    </p>
                  </div>

                  <div className="w-full h-3 rounded-full bg-slate-200 mt-2 overflow-hidden">
                    <div className="w-[90%] h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500"></div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold text-[#172554]">
                    Missing Skills
                  </h4>

                  <div className="flex flex-wrap gap-3 mt-4">
                    {missingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-2 rounded-full bg-red-50 text-red-600 text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold text-[#172554]">
                    Suggested Companies
                  </h4>

                  <div className="flex flex-wrap gap-3 mt-4">
                    {matchedCompanies.map((company) => (
                      <span
                        key={company}
                        className="px-3 py-2 rounded-full bg-green-50 text-green-700 text-sm"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResumePreviewSection;