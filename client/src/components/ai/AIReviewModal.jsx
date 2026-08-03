import React, { useState } from "react";

function AIReviewModal({
  isOpen,
  onClose,
  data,
  loading = false,
  onSave,
})
{

const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;


  const isSavedReport = !!data?.extractedProfile;
  
  const profile = isSavedReport
    ? data.extractedProfile
    : data || {};
  
  const analysis = isSavedReport
    ? data
    : profile.analysis || {};
  
  const resumeScore = analysis.resumeScore || {};
  
  const placementReadiness =
    analysis.placementReadiness || {};
  
  const strengths = Array.isArray(analysis.strengths)
    ? analysis.strengths
    : [];
  
  const weaknesses = Array.isArray(analysis.weaknesses)
    ? analysis.weaknesses
    : [];
  
  const missingSkills = Array.isArray(
    analysis.missingSkills
  )
    ? analysis.missingSkills
    : [];
  
  const suggestions = Array.isArray(
    analysis.suggestions
  )
    ? analysis.suggestions
    : [];
  
  const companyMatches = Array.isArray(
    analysis.companyMatches
  )
    ? analysis.companyMatches
    : [];
  
  const careerRoadmap = Array.isArray(
    analysis.careerRoadmap
  )
    ? analysis.careerRoadmap
    : [];


  const score = Number(resumeScore.score || 0);
  const readinessScore = Number(
    placementReadiness.score || 0
  );

  const scoreLevel = resumeScore.level || "Not Found";
  const readinessLevel =
    placementReadiness.level || "Not Found";

  const canSave = typeof onSave === "function";

  const scoreColor =
    score >= 81
      ? "text-emerald-600"
      : score >= 61
      ? "text-blue-600"
      : score >= 41
      ? "text-amber-600"
      : "text-red-600";

  const readinessColor =
    readinessScore >= 81
      ? "text-emerald-600"
      : readinessScore >= 61
      ? "text-blue-600"
      : readinessScore >= 41
      ? "text-amber-600"
      : "text-red-600";

  const Section = ({ icon, title, iconColor, children }) => (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b px-6 py-5">
        <i className={`${icon} ${iconColor}`}></i>
        <h3 className="text-xl font-bold text-slate-800">
          {title}
        </h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  const PillList = ({ items, emptyText, colorClass }) => {
    if (!items.length) {
      return (
        <p className="text-slate-500">{emptyText}</p>
      );
    }

    return (
      <div className="flex flex-wrap gap-3">
        {items.map((item, index) => (
          <span
            key={index}
            className={`rounded-full px-4 py-2 text-sm font-medium ${colorClass}`}
          >
            {item}
          </span>
        ))}
      </div>
    );
  };


  const handleSave = async () => {
    try {

      setIsSaving(true);

      await onSave(data);

    }

    finally {

      setIsSaving(false);

    }
  };



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
                AI extracted your resume and generated placement insights.
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
              Please wait while Gemini extracts and analyzes your profile.
            </p>
          </div>
        ) : (
          <div className="p-8 space-y-8">
            {/* Score Overview */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Resume Score
                    </p>
                    <h3 className={`text-4xl font-bold mt-2 ${scoreColor}`}>
                      {score}/100
                    </h3>
                  </div>
                  <div className="h-16 w-16 rounded-full bg-violet-100 flex items-center justify-center">
                    <i className="fa-solid fa-chart-line text-violet-600 text-2xl"></i>
                  </div>
                </div>

                <div className="mt-4 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-violet-600"
                    style={{ width: `${Math.min(score, 100)}%` }}
                  />
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  {scoreLevel}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Placement Readiness
                    </p>
                    <h3
                      className={`text-4xl font-bold mt-2 ${readinessColor}`}
                    >
                      {readinessScore}/100
                    </h3>
                  </div>
                  <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
                    <i className="fa-solid fa-briefcase text-emerald-600 text-2xl"></i>
                  </div>
                </div>

                <div className="mt-4 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-600"
                    style={{ width: `${Math.min(readinessScore, 100)}%` }}
                  />
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  {readinessLevel}
                </p>
              </div>
            </div>

            {/* Personal Information */}
            <Section
              icon="fa-solid fa-user"
              iconColor="text-violet-600"
              title="Personal Information"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-slate-500">Full Name</p>
                  <p className="font-semibold text-slate-800 mt-1">
                    {profile.fullName || "Not Found"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-semibold text-slate-800 mt-1 break-all">
                    {profile.email || "Not Found"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p className="font-semibold text-slate-800 mt-1">
                    {profile.phone || "Not Found"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Branch</p>
                  <p className="font-semibold text-slate-800 mt-1">
                    {profile.branch || "Not Found"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">CGPA</p>
                  <p className="font-semibold text-slate-800 mt-1">
                    {profile.cgpa || "Not Found"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Passing Year</p>
                  <p className="font-semibold text-slate-800 mt-1">
                    {profile.passingYear || "Not Found"}
                  </p>
                </div>
              </div>
            </Section>

            {/* Skills */}
            <Section
              icon="fa-solid fa-code"
              iconColor="text-orange-500"
              title="Skills"
            >
              <PillList
                items={profile.skills || []}
                emptyText="No skills found."
                colorClass="bg-violet-100 text-violet-700"
              />
            </Section>

            {/* Projects */}
            <Section
              icon="fa-solid fa-folder-open"
              iconColor="text-green-600"
              title="Projects"
            >
              <div className="space-y-5">
                {profile.projects?.length ? (
                  profile.projects.map((project, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 p-5"
                    >
                      <h4 className="font-bold text-lg text-slate-800">
                        {project.title || "Untitled Project"}
                      </h4>

                      <p className="mt-2 text-slate-600 leading-7">
                        {project.description || "No description found."}
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
                  <p className="text-slate-500">No projects found.</p>
                )}
              </div>
            </Section>

            {/* Achievements */}
            <Section
              icon="fa-solid fa-trophy"
              iconColor="text-amber-500"
              title="Achievements"
            >
              <div className="space-y-4">
                {profile.achievements?.length ? (
                  profile.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 p-5"
                    >
                      <h4 className="font-semibold text-slate-800">
                        {achievement.title || "Untitled Achievement"}
                      </h4>
                      <p className="mt-2 text-slate-600">
                        {achievement.description || "No description found."}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">
                    No achievements found.
                  </p>
                )}
              </div>
            </Section>

            {/* Internships */}
            <Section
              icon="fa-solid fa-briefcase"
              iconColor="text-blue-600"
              title="Internships"
            >
              <div className="space-y-4">
                {profile.internships?.length ? (
                  profile.internships.map((internship, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 p-5"
                    >
                      <h4 className="font-semibold text-slate-800">
                        {internship.company || "Company Not Found"}
                      </h4>
                      <p className="text-slate-600 mt-2">
                        {internship.role || "Role Not Found"}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        {internship.duration || "Duration Not Found"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">
                    No internships found.
                  </p>
                )}
              </div>
            </Section>

            {/* Certifications */}
            <Section
              icon="fa-solid fa-certificate"
              iconColor="text-emerald-600"
              title="Certifications"
            >
              <div className="space-y-4">
                {profile.certifications?.length ? (
                  profile.certifications.map((certificate, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 p-5"
                    >
                      <h4 className="font-semibold text-slate-800">
                        {certificate.title || "Certificate Title"}
                      </h4>
                      <p className="mt-2 text-slate-600">
                        {certificate.issuer || "Issuer Not Found"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">
                    No certifications found.
                  </p>
                )}
              </div>
            </Section>

            {/* Positions Of Responsibility */}
            <Section
              icon="fa-solid fa-user-tie"
              iconColor="text-indigo-600"
              title="Positions Of Responsibility"
            >
              <div className="space-y-4">
                {profile.positionsOfResponsibility?.length ? (
                  profile.positionsOfResponsibility.map((position, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 p-5"
                    >
                      <h4 className="font-semibold text-slate-800">
                        {position.title || "Position Title"}
                      </h4>
                      <p className="mt-2 text-slate-600">
                        {position.organization || "Organization Not Found"}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        {position.duration || "Duration Not Found"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">
                    No positions found.
                  </p>
                )}
              </div>
            </Section>

            {/* Analysis */}
            <Section
              icon="fa-solid fa-wand-magic-sparkles"
              iconColor="text-violet-600"
              title="AI Insights"
            >
              <div className="space-y-8">
                {/* Strengths */}
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-4">
                    Strengths
                  </h4>
                  <PillList
                    items={strengths}
                    emptyText="No strengths found."
                    colorClass="bg-emerald-100 text-emerald-700"
                  />
                </div>

                {/* Weaknesses */}
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-4">
                    Weaknesses
                  </h4>
                  <PillList
                    items={weaknesses}
                    emptyText="No weaknesses found."
                    colorClass="bg-red-100 text-red-700"
                  />
                </div>

                {/* Missing Skills */}
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-4">
                    Missing Skills
                  </h4>
                  <PillList
                    items={missingSkills}
                    emptyText="No missing skills found."
                    colorClass="bg-amber-100 text-amber-700"
                  />
                </div>

                {/* Suggestions */}
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-4">
                    Suggestions
                  </h4>
                  <div className="space-y-3">
                    {suggestions.length ? (
                      suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-slate-200 p-4 text-slate-700"
                        >
                          {suggestion}
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500">
                        No suggestions found.
                      </p>
                    )}
                  </div>
                </div>

                {/* Company Match */}
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-4">
                    Company Match
                  </h4>

                  <div className="space-y-3">
                    {companyMatches.length ? (
                      companyMatches.map((item, index) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-slate-200 p-4"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="font-semibold text-slate-800">
                                {item.company || "Company"}
                              </p>
                              {item.reason && (
                                <p className="text-sm text-slate-500 mt-1">
                                  {item.reason}
                                </p>
                              )}
                            </div>
                            <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-700">
                              {Number(item.match || 0)}%
                            </span>
                          </div>

                          <div className="mt-4 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-violet-600"
                              style={{
                                width: `${Math.min(
                                  Number(item.match || 0),
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500">
                        No company matches found.
                      </p>
                    )}
                  </div>
                </div>

                {/* Career Roadmap */}
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-4">
                    Career Roadmap
                  </h4>
                  <div className="space-y-3">
                    {careerRoadmap.length ? (
                      careerRoadmap.map((step, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
                            {index + 1}
                          </div>
                          <p className="text-slate-700 leading-7">
                            {step}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500">
                        No roadmap found.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Section>
          </div>
        )}

        {/* Footer */}
        <div className="sticky bottom-0 border-t bg-white px-8 py-5 rounded-b-3xl">
          <div className="flex flex-wrap items-center justify-end gap-3">
            {canSave && !loading && (


            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-6 py-3 rounded-xl text-white font-semibold transition
              
                ${
                  isSaving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-105"
                }`}
            >
              {isSaving ? "Saving..." : "Save AI Scan"}
            </button>


            )}

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