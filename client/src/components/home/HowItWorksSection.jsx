function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Create Account",
      description:
        "Sign up on CampusIQ and begin your placement journey with a secure student account.",
      icon: "fa-solid fa-user-plus",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      number: "02",
      title: "Complete Profile",
      description:
        "Add academic details, technical skills, projects, links and upload your latest resume.",
      icon: "fa-solid fa-id-card",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      number: "03",
      title: "AI Resume Review",
      description:
        "Get resume score, placement readiness, missing skills and personalized improvement suggestions.",
      icon: "fa-solid fa-file-waveform",
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      number: "04",
      title: "Apply and Track",
      description:
        "Browse opportunities, apply for jobs and track your application status from one dashboard.",
      icon: "fa-solid fa-list-check",
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 min-h-[78vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-3xl mx-auto text-center">
          <span className="uppercase tracking-widest text-orange-500 font-semibold">
            Simple Process
          </span>

          <h2 className="mt-4 text-4xl font-bold text-[#172554]">
            How CampusIQ works
          </h2>

          <p className="mt-5 text-lg text-slate-500 leading-8">
            A clean workflow from account creation to placement readiness,
            with AI support at the center.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6 mt-16">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-white rounded-3xl border border-slate-200 p-7 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="absolute top-5 right-5 text-5xl font-extrabold text-slate-100 group-hover:text-slate-200 transition">
                {step.number}
              </div>

              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${step.bg}`}>
                <i className={`${step.icon} text-2xl ${step.color}`}></i>
              </div>

              <h3 className="mt-8 text-2xl font-semibold text-[#172554]">
                {step.title}
              </h3>

              <p className="mt-4 text-slate-500 leading-7">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;