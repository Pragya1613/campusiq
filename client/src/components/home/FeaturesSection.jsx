function FeaturesSection() {
  const features = [
    {
      title: "AI Resume Analysis",
      description:
        "Upload your resume and get an AI-generated score, placement readiness, strengths, weaknesses and improvement suggestions.",
      icon: "fa-solid fa-file-waveform",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      points: [
        "Resume score with level",
        "Missing skills and suggestions",
        "Company matching insights",
      ],
    },
    {
      title: "Job Portal",
      description:
        "Browse placement drives, check eligibility and apply for roles from a single centralized dashboard.",
      icon: "fa-solid fa-briefcase",
      color: "text-orange-500",
      bg: "bg-orange-50",
      points: [
        "Filter opportunities fast",
        "Eligibility at a glance",
        "Apply without switching tabs",
      ],
    },
    {
      title: "Application Tracking",
      description:
        "Track every application status in one place so you always know where you stand in the process.",
      icon: "fa-solid fa-list-check",
      color: "text-green-600",
      bg: "bg-green-50",
      points: [
        "Applied, shortlisted, selected",
        "Simple status management",
        "No manual tracking needed",
      ],
    },
    {
      title: "Interview Experiences",
      description:
        "Learn from seniors through shared interview experiences and company-wise preparation notes.",
      icon: "fa-solid fa-comments",
      color: "text-sky-600",
      bg: "bg-sky-50",
      points: [
        "Company-specific experiences",
        "Preparation tips from seniors",
        "Better interview confidence",
      ],
    },
  ];

  return (
    <section id="about"className="py-24 bg-white min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto">
          <span className="uppercase tracking-widest text-orange-500 font-semibold">
            Why CampusIQ
          </span>

          <h2 className="mt-4 text-4xl font-bold text-[#172554]">
            Everything you need for campus placements
          </h2>

          <p className="mt-5 text-lg text-slate-500 leading-8">
            CampusIQ combines AI, placement management and student resources
            into one smart platform for the full placement journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${feature.bg}`}>
                <i className={`${feature.icon} text-2xl ${feature.color}`}></i>
              </div>

              <h3 className="mt-7 text-2xl font-semibold text-[#172554]">
                {feature.title}
              </h3>

              <p className="mt-4 text-slate-500 leading-7">
                {feature.description}
              </p>

              <ul className="mt-6 space-y-3">
                {feature.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <i className="fa-solid fa-circle-check mt-1 text-emerald-500"></i>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;