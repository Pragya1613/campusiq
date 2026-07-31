import React from "react";

function AIReviewModal({
  isOpen,
  onClose,
  data,
  loading = false,
}) {
  if (!isOpen) return null;

  const profile = data || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-8 py-6 rounded-t-3xl">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">

              <i className="fa-solid fa-wand-magic-sparkles text-2xl text-violet-600"></i>

            </div>

            <div>

              <h2 className="text-3xl font-bold text-slate-800">

                AI Resume Review

              </h2>

              <p className="text-sm text-slate-500 mt-1">

                AI extracted the following information from your resume.

              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 hover:bg-red-100 transition"
          >
            <i className="fa-solid fa-xmark text-xl text-slate-600"></i>
          </button>

        </div>

        {/* Loading */}

        {loading ? (

          <div className="py-24 flex flex-col items-center">

            <div className="h-16 w-16 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600"></div>

            <h3 className="mt-8 text-2xl font-semibold text-slate-800">

              AI is reviewing your resume...

            </h3>

            <p className="mt-3 text-slate-500">

              Please wait while Gemini extracts your information.

            </p>

          </div>

        ) : (

          <div className="p-8 space-y-8">

            {/* Personal Information */}

            <div className="rounded-3xl border border-slate-200">

              <div className="flex items-center gap-3 border-b px-6 py-5">

                <i className="fa-solid fa-user text-violet-600"></i>

                <h3 className="text-xl font-bold text-slate-800">

                  Personal Information

                </h3>

              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

                <div>

                  <p className="text-sm text-slate-500">

                    Full Name

                  </p>

                  <p className="font-semibold text-slate-800 mt-1">

                    {profile.fullName || "Not Found"}

                  </p>

                </div>

                <div>

                  <p className="text-sm text-slate-500">

                    Email

                  </p>

                  <p className="font-semibold text-slate-800 mt-1 break-all">

                    {profile.email || "Not Found"}

                  </p>

                </div>

                <div>

                  <p className="text-sm text-slate-500">

                    Phone

                  </p>

                  <p className="font-semibold text-slate-800 mt-1">

                    {profile.phone || "Not Found"}

                  </p>

                </div>

                <div>

                  <p className="text-sm text-slate-500">

                    Branch

                  </p>

                  <p className="font-semibold text-slate-800 mt-1">

                    {profile.branch || "Not Found"}

                  </p>

                </div>

                <div>

                  <p className="text-sm text-slate-500">

                    CGPA

                  </p>

                  <p className="font-semibold text-slate-800 mt-1">

                    {profile.cgpa || "Not Found"}

                  </p>

                </div>

                <div>

                  <p className="text-sm text-slate-500">

                    Passing Year

                  </p>

                  <p className="font-semibold text-slate-800 mt-1">

                    {profile.passingYear || "Not Found"}

                  </p>

                </div>

              </div>

            </div>

            {/* Skills */}

            <div className="rounded-3xl border border-slate-200">

              <div className="flex items-center gap-3 border-b px-6 py-5">

                <i className="fa-solid fa-code text-orange-500"></i>

                <h3 className="text-xl font-bold text-slate-800">

                  Skills

                </h3>

              </div>

              <div className="flex flex-wrap gap-3 p-6">

                {profile.skills?.length ? (

                  profile.skills.map((skill, index) => (

                    <span
                      key={index}
                      className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700"
                    >
                      {skill}
                    </span>

                  ))

                ) : (

                  <p className="text-slate-500">

                    No skills found.

                  </p>

                )}

              </div>

            </div>

            {/* Projects */}

            <div className="rounded-3xl border border-slate-200">

              <div className="flex items-center gap-3 border-b px-6 py-5">

                <i className="fa-solid fa-folder-open text-green-600"></i>

                <h3 className="text-xl font-bold text-slate-800">

                  Projects

                </h3>

              </div>

              <div className="p-6 space-y-5">

                {profile.projects?.length ? (

                  profile.projects.map((project, index) => (

                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 p-5"
                    >

                      <h4 className="font-bold text-lg text-slate-800">

                        {project.title}

                      </h4>

                      <p className="mt-2 text-slate-600 leading-7">

                        {project.description}

                      </p>

                      {project.technologies?.length > 0 && (

                        <div className="mt-4 flex flex-wrap gap-2">

                          {project.technologies.map((tech, i) => (

                            <span
                              key={i}
                              className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                            >
                              {tech}
                            </span>

                          ))}

                        </div>

                      )}

                    </div>

                  ))

                ) : (

                  <p className="text-slate-500">

                    No projects found.

                  </p>

                )}

              </div>

            </div>

                        {/* Achievements */}

            <div className="rounded-3xl border border-slate-200">

              <div className="flex items-center gap-3 border-b px-6 py-5">

                <i className="fa-solid fa-trophy text-amber-500"></i>

                <h3 className="text-xl font-bold text-slate-800">

                  Achievements

                </h3>

              </div>

              <div className="p-6 space-y-4">

                {profile.achievements?.length ? (

                  profile.achievements.map((achievement, index) => (

                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 p-5"
                    >

                      <h4 className="font-semibold text-slate-800">

                        {achievement.title}

                      </h4>

                      <p className="mt-2 text-slate-600">

                        {achievement.description}

                      </p>

                    </div>

                  ))

                ) : (

                  <p className="text-slate-500">

                    No achievements found.

                  </p>

                )}

              </div>

            </div>

            {/* Internships */}

            <div className="rounded-3xl border border-slate-200">

              <div className="flex items-center gap-3 border-b px-6 py-5">

                <i className="fa-solid fa-briefcase text-blue-600"></i>

                <h3 className="text-xl font-bold text-slate-800">

                  Internships

                </h3>

              </div>

              <div className="p-6 space-y-4">

                {profile.internships?.length ? (

                  profile.internships.map((internship, index) => (

                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 p-5"
                    >

                      <h4 className="font-semibold text-slate-800">

                        {internship.company}

                      </h4>

                      <p className="text-slate-600 mt-2">

                        {internship.role}

                      </p>

                      <p className="text-sm text-slate-500 mt-1">

                        {internship.duration}

                      </p>

                    </div>

                  ))

                ) : (

                  <p className="text-slate-500">

                    No internships found.

                  </p>

                )}

              </div>

            </div>

            {/* Certifications */}

            <div className="rounded-3xl border border-slate-200">

              <div className="flex items-center gap-3 border-b px-6 py-5">

                <i className="fa-solid fa-certificate text-emerald-600"></i>

                <h3 className="text-xl font-bold text-slate-800">

                  Certifications

                </h3>

              </div>

              <div className="p-6 space-y-4">

                {profile.certifications?.length ? (

                  profile.certifications.map((certificate, index) => (

                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 p-5"
                    >

                      <h4 className="font-semibold text-slate-800">

                        {certificate.title}

                      </h4>

                      <p className="mt-2 text-slate-600">

                        {certificate.issuer}

                      </p>

                    </div>

                  ))

                ) : (

                  <p className="text-slate-500">

                    No certifications found.

                  </p>

                )}

              </div>

            </div>

            {/* Positions Of Responsibility */}

            <div className="rounded-3xl border border-slate-200">

              <div className="flex items-center gap-3 border-b px-6 py-5">

                <i className="fa-solid fa-user-tie text-indigo-600"></i>

                <h3 className="text-xl font-bold text-slate-800">

                  Positions Of Responsibility

                </h3>

              </div>

              <div className="p-6 space-y-4">

                {profile.positionsOfResponsibility?.length ? (

                  profile.positionsOfResponsibility.map((position, index) => (

                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 p-5"
                    >

                      <h4 className="font-semibold text-slate-800">

                        {position.title}

                      </h4>

                      <p className="mt-2 text-slate-600">

                        {position.organization}

                      </p>

                      <p className="text-sm text-slate-500 mt-1">

                        {position.duration}

                      </p>

                    </div>

                  ))

                ) : (

                  <p className="text-slate-500">

                    No positions found.

                  </p>

                )}

              </div>

            </div>

          </div>

        )}

        {/* Footer */}

        <div className="sticky bottom-0 border-t bg-white px-8 py-5 rounded-b-3xl">

          <div className="flex justify-end">

            <button
              onClick={onClose}
              className="rounded-xl bg-slate-800 px-6 py-3 font-medium text-white transition hover:bg-slate-900"
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default AIReviewModal;