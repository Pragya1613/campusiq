import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getStudentDashboard } from "../services/dashboardService";

function DashboardPage() {
  const [stats, setStats] = useState({
    student: null,
    profileCompletion: 0,
    applied: 0,
    shortlisted: 0,
    interviews: 0,
    selected: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getStudentDashboard();

        setStats({
          student: data.student || null,
          profileCompletion: data.profileCompletion || 0,
          applied: data.applied || 0,
          shortlisted: data.shortlisted || 0,
          interviews: data.interviews || 0,
          selected: data.selected || 0,
          rejected: data.rejected || 0,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const statCards = [
    {
      label: "Applied",
      value: stats.applied,
      icon: "fa-solid fa-file-lines",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      accent: "border-t-blue-500",
    },
    {
      label: "Shortlisted",
      value: stats.shortlisted,
      icon: "fa-solid fa-star",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
      accent: "border-t-amber-500",
    },
    {
      label: "Interviews",
      value: stats.interviews,
      icon: "fa-solid fa-microphone",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      accent: "border-t-purple-500",
    },
    {
      label: "Selected",
      value: stats.selected,
      icon: "fa-solid fa-trophy",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      accent: "border-t-emerald-500",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      icon: "fa-solid fa-xmark",
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
      accent: "border-t-red-500",
    },
  ];

  const quickActions = [
    {
      title: "Browse Jobs",
      description: "Explore the latest placement opportunities.",
      icon: "fa-solid fa-briefcase",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      link: "/jobs",
    },
    {
      title: "My Applications",
      description: "Track your application status in one place.",
      icon: "fa-solid fa-file-lines",
      iconColor: "text-orange-500",
      iconBg: "bg-orange-50",
      link: "/applications",
    },
    {
      title: "Update Profile",
      description: "Keep your profile complete and placement-ready.",
      icon: "fa-solid fa-user-pen",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      link: "/profile",
    },
  ];

  const updates = [
    {
      title: "Latest Placement Opportunities",
      description:
        "Check the latest placement opportunities and apply before the deadline.",
      icon: "fa-solid fa-bullhorn",
      iconColor: "text-orange-500",
      link: "/jobs",
    },
    {
      title: "Keep Track of Deadlines",
      description:
        "Review application deadlines regularly to avoid missing opportunities.",
      icon: "fa-solid fa-calendar-days",
      iconColor: "text-blue-600",
      link: "/jobs",
    },
    {
      title: "Keep Your Profile Updated",
      description:
        "Students with complete profiles have better placement visibility.",
      icon: "fa-solid fa-circle-check",
      iconColor: "text-emerald-500",
      link: "/profile",
    },
  ];

  const readinessItems = [
    {
      title: "Resume",
      description: "Upload your latest resume before applying.",
      icon: "fa-solid fa-file-arrow-up",
      iconColor: "text-orange-500",
      link: "/ai-scans",
    },
    {
      title: "Technical Skills",
      description: "Keep your skills updated for better job matching.",
      icon: "fa-solid fa-code",
      iconColor: "text-emerald-500",
      link: "/profile",
    },
    {
      title: "Academic Performance",
      description:
        "Maintain a strong CGPA to stay eligible for more companies.",
      icon: "fa-solid fa-graduation-cap",
      iconColor: "text-blue-600",
      link: "/profile",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="fixed top-0 left-0 right-0 z-50 h-[76px] bg-[#172554]/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="w-full h-full px-5 sm:px-7 lg:px-12 xl:px-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-white hover:text-blue-100 transition"
          >
            CampusIQ
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm lg:text-base">
            <Link
              to="/dashboard"
              className="text-white font-medium relative after:absolute after:left-0 after:-bottom-2 after:w-full after:h-0.5 after:bg-orange-500 after:rounded-full"
            >
              Dashboard
            </Link>

            <Link
              to="/jobs"
              className="text-blue-100 hover:text-white transition"
            >
              Jobs
            </Link>

            <Link
              to="/applications"
              className="text-blue-100 hover:text-white transition"
            >
              Applications
            </Link>

            <Link
              to="/experiences"
              className="text-blue-100 hover:text-white transition"
            >
              Experiences
            </Link>

            <Link
              to="/ai-scans"
              className="text-blue-100 hover:text-white transition"
            >
              AIScan
            </Link>

            <Link
              to="/profile"
              className="text-blue-100 hover:text-white transition"
            >
              Profile
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="ml-1 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md hover:shadow-lg transition"
            >
              Logout
            </button>
          </div>

          <button
            className="md:hidden w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
            onClick={() => {
              const menu = document.getElementById(
                "mobile-dashboard-menu"
              );
              menu?.classList.toggle("hidden");
            }}
          >
            <i className="fa-solid fa-bars" />
          </button>
        </div>

        <div
          id="mobile-dashboard-menu"
          className="hidden md:hidden bg-[#172554] border-t border-white/10 px-5 py-4"
        >
          <div className="flex flex-col gap-1">
            <Link
              to="/dashboard"
              className="px-4 py-3 rounded-lg bg-white/10 text-white"
            >
              Dashboard
            </Link>

            <Link
              to="/jobs"
              className="px-4 py-3 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
            >
              Jobs
            </Link>

            <Link
              to="/applications"
              className="px-4 py-3 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
            >
              Applications
            </Link>

            <Link
              to="/experiences"
              className="px-4 py-3 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
            >
              Experiences
            </Link>

            <Link
              to="/ai-scans"
              className="px-4 py-3 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
            >
              AIScan
            </Link>

            <Link
              to="/profile"
              className="px-4 py-3 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
            >
              Profile
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="mt-2 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition text-left"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="w-full px-3 sm:px-4 pt-[100px] pb-12">
        <div className="max-w-[1600px] mx-auto">
          <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#172554] via-[#1E3A8A] to-[#0F766E] text-white shadow-xl">
            <div className="absolute -right-24 -top-28 w-80 h-80 rounded-full bg-white/5" />

            <div className="absolute right-40 bottom-[-120px] w-72 h-72 rounded-full bg-blue-400/10" />

            <div className="absolute left-[42%] bottom-[-140px] w-96 h-96 rounded-full bg-blue-500/10" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12 px-8 sm:px-10 lg:px-12 py-10 lg:py-11">
              <div className="text-white max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-400/30 bg-orange-500/10 text-orange-300 text-xs sm:text-sm font-semibold tracking-[0.2em]">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  STUDENT PORTAL
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-6">
                  Welcome Back,{" "}
                  {stats.student?.fullName || "Student"}
                </h1>

                <p className="mt-3 text-base sm:text-lg text-blue-100">
                  {stats.student?.branch || "Branch"}
                  &nbsp; • &nbsp;
                  Semester {stats.student?.currentSemester || "-"}
                </p>

                <p className="mt-5 max-w-2xl text-sm sm:text-base lg:text-lg leading-7 text-blue-100">
                  Stay on top of your placement journey, track your progress
                  and make every opportunity count.
                </p>
              </div>

              <div className="w-full lg:w-[380px] shrink-0 bg-white text-[#172554] rounded-3xl p-6 shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs sm:text-sm uppercase tracking-wide text-slate-500 font-semibold">
                      Profile Completion
                    </p>

                    <h2 className="mt-2 text-xl font-bold">
                      Placement Profile
                    </h2>

                    <p className="mt-2 text-sm text-slate-500 leading-6">
                      Complete your profile for better placement opportunities.
                    </p>
                  </div>

                  <div className="flex-shrink-0 w-16 h-16 rounded-full border-[6px] border-orange-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-orange-500">
                      {stats.profileCompletion}%
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                  <i className="fa-solid fa-circle-check" />
                  Placement Ready
                </div>

                <div className="mt-4 h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-orange-500 transition-all duration-500"
                    style={{
                      width: `${stats.profileCompletion}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <div className="mb-6">
              <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-orange-500">
                PLACEMENT OVERVIEW
              </p>

              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#172554]">
                  Your Placement Progress
                </h2>

                <span className="text-sm text-slate-400">
                  Academic Year {new Date().getFullYear()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
              {statCards.map((stat) => (
                <div
                  key={stat.label}
                  className={`group relative bg-white border border-slate-200 border-t-4 ${stat.accent} rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
                >
                  <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-slate-50 group-hover:scale-125 transition-transform duration-300" />

                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.iconBg} mb-5`}
                      >
                        <i
                          className={`${stat.icon} text-2xl ${stat.iconColor}`}
                        />
                      </div>

                      <span className="text-xs font-medium text-slate-400">
                        {new Date().getFullYear()}
                      </span>
                    </div>

                    <p className="font-medium text-slate-500">
                      {stat.label}
                    </p>

                    <div className="flex items-end justify-between mt-1">
                      <h3 className="text-4xl font-bold text-[#172554] mt-2">
                        {loading ? "—" : stat.value}
                      </h3>

                      <i className="fa-solid fa-arrow-up-right text-xs text-slate-300 group-hover:text-slate-500 transition" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <div className="mb-6">
              <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-orange-500">
                QUICK ACTIONS
              </p>

              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#172554]">
                What do you want to do?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  to={action.link}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 lg:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.iconBg}`}
                  >
                    <i
                      className={`${action.icon} text-xl ${action.iconColor}`}
                    />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-[#172554]">
                    {action.title}
                  </h3>

                  <p className="mt-2 text-slate-500 leading-6">
                    {action.description}
                  </p>

                  <div className="mt-5 text-sm font-semibold text-[#172554] group-hover:text-orange-500 transition">
                    Open
                    <i className="fa-solid fa-arrow-right ml-2 text-xs" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <div className="mb-6">
              <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-orange-500">
                STAY UPDATED
              </p>

              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#172554]">
                Recent Placement Updates
              </h2>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              {updates.map((update, index) => (
                <Link
                  key={update.title}
                  to={update.link}
                  className={`group flex items-start gap-4 p-5 sm:p-6 hover:bg-slate-50 transition ${
                    index !== updates.length - 1
                      ? "border-b border-slate-200"
                      : ""
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                    <i
                      className={`${update.icon} text-lg ${update.iconColor}`}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-[#172554] group-hover:text-orange-500 transition">
                      {update.title}
                    </h3>

                    <p className="mt-1 text-sm sm:text-base text-slate-500 leading-6">
                      {update.description}
                    </p>
                  </div>

                  <i className="fa-solid fa-chevron-right text-xs text-slate-400 mt-2 group-hover:text-orange-500 transition" />
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12 pb-8">
            <div className="mb-6">
              <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-orange-500">
                PREPARE BETTER
              </p>

              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#172554]">
                Placement Readiness
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
              {readinessItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.link}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 lg:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
                      <i
                        className={`${item.icon} text-xl ${item.iconColor}`}
                      />
                    </div>

                    <i className="fa-solid fa-arrow-up-right-from-square text-xs text-slate-300 group-hover:text-orange-500 transition" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-[#172554]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-slate-500 leading-6">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;