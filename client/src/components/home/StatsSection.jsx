function StatsSection() {
  const stats = [
    {
      number: "1000+",
      label: "Students",
      icon: "fa-solid fa-user-graduate",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      number: "100+",
      label: "Companies",
      icon: "fa-solid fa-building",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      number: "5000+",
      label: "Applications",
      icon: "fa-solid fa-file-lines",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      number: "95%",
      label: "Placement Readiness",
      icon: "fa-solid fa-chart-line",
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
  ];

  return (
    <section className="bg-slate-50 min-h-[72vh] flex items-center">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 w-full">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-orange-500 font-semibold tracking-wide uppercase">
            Platform at a glance
          </span>

          <h2 className="mt-4 text-4xl font-bold text-[#172554]">
            Trusted by ambitious students and placement teams
          </h2>

          <p className="text-slate-500 mt-4 text-lg leading-8">
            CampusIQ brings resume analysis, job applications and placement
            tracking into one clean workflow.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-14">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 p-8 text-center hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${item.bg}`}>
                <i className={`${item.icon} text-2xl ${item.color}`}></i>
              </div>

              <h3 className={`text-5xl font-bold mt-6 ${item.color}`}>
                {item.number}
              </h3>

              <p className="text-slate-600 mt-3 text-lg">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;