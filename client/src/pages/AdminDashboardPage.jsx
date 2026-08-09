import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import api from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  isJobActive,
  isJobExpired,
  formatDate,
  formatPackage,
} from "../utils/jobUtils";


function AdminDashboardPage() {

  const [stats, setStats] = useState(null);


  useEffect(() => {

    const fetchStats = async () => {

      try {

        const response =
          await api.get("/dashboard");

        setStats(response.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchStats();

  }, []);


  if (!stats) {

    return (
      <PublicLayout>

        <div className="min-h-screen flex justify-center items-center bg-slate-50">

          <h2 className="text-2xl font-semibold text-slate-600">
            Loading Dashboard...
          </h2>

        </div>

      </PublicLayout>
    );

  }


  const chartData = [

    {
      name: "Applied",
      value: stats.applicationStatus.applied,
    },

    {
      name: "Shortlisted",
      value: stats.applicationStatus.shortlisted,
    },

    {
      name: "Interview",
      value: stats.applicationStatus.interviews,
    },

    {
      name: "Selected",
      value: stats.applicationStatus.selected,
    },

    {
      name: "Rejected",
      value: stats.applicationStatus.rejected,
    },

  ];


  const COLORS = [
    "#3B82F6",
    "#F59E0B",
    "#8B5CF6",
    "#22C55E",
    "#EF4444",
  ];


  const barChartData = [

    {
      name: "Students",
      value: stats.totalStudents,
    },

    {
      name: "Jobs",
      value: stats.totalJobs,
    },

    {
      name: "Applications",
      value: stats.totalApplications,
    },

    {
      name: "Selected",
      value: stats.selectedStudents,
    },

  ];


  /*
    Dynamic admin name.

    If backend already returns admin/user information,
    it will be used automatically.

    Otherwise safe fallback is "Admin".
  */
  const adminName =
    stats.admin?.fullName ||
    stats.user?.fullName ||
    stats.adminName ||
    "Admin";


  return (

    <PublicLayout>

      <div className="min-h-screen bg-slate-50 px-3 sm:px-4 py-8">

        <div className="max-w-[1600px] mx-auto">


          {/* =====================================================
              HERO SECTION
          ====================================================== */}

          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#172554] via-[#1E3A8A] to-[#0F766E] shadow-xl">

            {/* Decorative circles */}

            <div className="absolute -right-24 -top-28 w-80 h-80 rounded-full bg-white/5"></div>

            <div className="absolute right-40 bottom-[-120px] w-72 h-72 rounded-full bg-blue-400/10"></div>

            <div className="absolute left-[42%] bottom-[-140px] w-96 h-96 rounded-full bg-blue-500/10"></div>


            <div className="relative z-10 px-8 sm:px-10 lg:px-12 py-10 lg:py-11">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">


                {/* Hero left */}

                <div className="text-white max-w-2xl">

                  <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-white/5 px-5 py-2">

                    <span className="w-2 h-2 rounded-full bg-orange-400"></span>

                    <span className="text-sm font-semibold tracking-[0.25em] text-orange-300">
                      ADMIN PORTAL
                    </span>

                  </div>


                  <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-6">

                    Welcome Back, {adminName}

                  </h1>


                  <p className="text-blue-100 text-lg mt-4 max-w-2xl leading-relaxed">

                    Monitor placements, manage opportunities and track
                    student recruitment from one place.

                  </p>


                  <div className="flex flex-wrap items-center gap-4 mt-6">

                    <div className="flex items-center gap-2 text-sm text-blue-100">

                      <i className="fa-solid fa-user-graduate text-orange-400"></i>

                      <span>
                        {stats.totalStudents} Students
                      </span>

                    </div>


                    <span className="text-blue-300">
                      •
                    </span>


                    <div className="flex items-center gap-2 text-sm text-blue-100">

                      <i className="fa-solid fa-briefcase text-orange-400"></i>

                      <span>
                        {stats.activeJobs} Active Jobs
                      </span>

                    </div>


                    <span className="text-blue-300">
                      •
                    </span>


                    <div className="flex items-center gap-2 text-sm text-blue-100">

                      <i className="fa-solid fa-file-lines text-orange-400"></i>

                      <span>
                        {stats.totalApplications} Applications
                      </span>

                    </div>

                  </div>

                </div>


                {/* Hero right - Dynamic summary */}

                <div className="w-full lg:w-[370px] shrink-0">

                  <div className="bg-white rounded-3xl p-6 shadow-lg">

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                          Placement Overview
                        </p>

                        <h2 className="text-2xl font-bold text-[#172554] mt-2">
                          Recruitment Activity
                        </h2>

                      </div>


                      <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">

                        <i className="fa-solid fa-chart-line text-xl text-orange-500"></i>

                      </div>

                    </div>


                    <div className="grid grid-cols-3 gap-3 mt-6">

                      <div className="rounded-2xl bg-slate-50 p-4">

                        <p className="text-xs text-slate-500">
                          Jobs
                        </p>

                        <p className="text-2xl font-bold text-[#172554] mt-1">
                          {stats.totalJobs}
                        </p>

                      </div>


                      <div className="rounded-2xl bg-slate-50 p-4">

                        <p className="text-xs text-slate-500">
                          Applied
                        </p>

                        <p className="text-2xl font-bold text-[#172554] mt-1">
                          {stats.totalApplications}
                        </p>

                      </div>


                      <div className="rounded-2xl bg-slate-50 p-4">

                        <p className="text-xs text-slate-500">
                          Selected
                        </p>

                        <p className="text-2xl font-bold text-[#172554] mt-1">
                          {stats.selectedStudents}
                        </p>

                      </div>

                    </div>


                    <Link
                      to="/create-job"
                      className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
                    >

                      <i className="fa-solid fa-plus"></i>

                      Create New Job

                    </Link>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* =====================================================
              PLACEMENT OVERVIEW
          ====================================================== */}

          <div className="mt-12">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">

              <div>

                <p className="uppercase tracking-[0.25em] text-sm font-semibold text-orange-500">
                  Placement Overview
                </p>

                <h2 className="text-3xl font-bold text-[#172554] mt-2">
                  Recruitment Progress
                </h2>

              </div>


              <p className="text-sm text-slate-400">
                Academic Year 2026
              </p>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">


              {/* Total Students */}

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6 border-t-4 border-blue-500">

                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">

                  <i className="fa-solid fa-user-graduate text-2xl text-blue-500"></i>

                </div>

                <p className="text-slate-500 font-medium">
                  Total Students
                </p>

                <h3 className="text-4xl font-bold text-[#172554] mt-2">
                  {stats.totalStudents}
                </h3>

              </div>


              {/* Total Jobs */}

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6 border-t-4 border-green-500">

                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-5">

                  <i className="fa-solid fa-briefcase text-2xl text-green-500"></i>

                </div>

                <p className="text-slate-500 font-medium">
                  Total Jobs
                </p>

                <h3 className="text-4xl font-bold text-[#172554] mt-2">
                  {stats.totalJobs}
                </h3>

              </div>


              {/* Active Jobs */}

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6 border-t-4 border-orange-500">

                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-5">

                  <i className="fa-solid fa-fire text-2xl text-orange-500"></i>

                </div>

                <p className="text-slate-500 font-medium">
                  Active Jobs
                </p>

                <h3 className="text-4xl font-bold text-[#172554] mt-2">
                  {stats.activeJobs}
                </h3>

              </div>


              {/* Applications */}

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6 border-t-4 border-purple-500">

                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center mb-5">

                  <i className="fa-solid fa-file-lines text-2xl text-purple-500"></i>

                </div>

                <p className="text-slate-500 font-medium">
                  Applications
                </p>

                <h3 className="text-4xl font-bold text-[#172554] mt-2">
                  {stats.totalApplications}
                </h3>

              </div>


              {/* Selected */}

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6 border-t-4 border-yellow-500">

                <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center mb-5">

                  <i className="fa-solid fa-trophy text-2xl text-yellow-500"></i>

                </div>

                <p className="text-slate-500 font-medium">
                  Selected
                </p>

                <h3 className="text-4xl font-bold text-[#172554] mt-2">
                  {stats.selectedStudents}
                </h3>

              </div>


            </div>

          </div>


          {/* =====================================================
              QUICK ACTIONS
          ====================================================== */}

          <div className="mt-12">

            <h2 className="text-2xl font-bold text-[#172554] mb-6">
              Quick Actions
            </h2>


            <div className="grid md:grid-cols-3 gap-6">


              <Link
                to="/create-job"
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6"
              >

                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-5">

                  <i className="fa-solid fa-plus text-2xl text-green-500 group-hover:scale-110 transition-transform duration-300"></i>

                </div>


                <h3 className="text-xl font-semibold text-[#172554] group-hover:text-blue-600 transition-colors">
                  Create Job
                </h3>

                <p className="text-slate-500 mt-2">
                  Publish a new placement opportunity.
                </p>

              </Link>


              <Link
                to="/manage-jobs"
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6"
              >

                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">

                  <i className="fa-solid fa-briefcase text-2xl text-blue-500 group-hover:scale-110 transition-transform duration-300"></i>

                </div>


                <h3 className="text-xl font-semibold text-[#172554] group-hover:text-blue-600 transition-colors">
                  Manage Jobs
                </h3>

                <p className="text-slate-500 mt-2">
                  Edit, close or delete existing jobs.
                </p>

              </Link>


              <Link
                to="/admin-applications"
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6"
              >

                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-5">

                  <i className="fa-solid fa-file-lines text-2xl text-orange-500 group-hover:scale-110 transition-transform duration-300"></i>

                </div>


                <h3 className="text-xl font-semibold text-[#172554] group-hover:text-blue-600 transition-colors">
                  Applications
                </h3>

                <p className="text-slate-500 mt-2">
                  Review and update application status.
                </p>

              </Link>


            </div>

          </div>


          {/* =====================================================
              RECENT ACTIVITY
          ====================================================== */}

          <div className="grid lg:grid-cols-2 gap-6 mt-12">


            {/* Recent Applications */}

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-[#172554]">
                  Recent Applications
                </h2>

                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">

                  <i className="fa-solid fa-users text-orange-500 text-xl"></i>

                </div>

              </div>


              {stats.recentApplications?.length ? (

                <div className="space-y-5">

                  {stats.recentApplications.map((application) => (

                    <div
                      key={application._id}
                      className="flex justify-between items-center border-b border-slate-100 pb-4"
                    >

                      <div>

                        <h3 className="font-semibold text-[#172554]">
                          {application.studentId?.fullName}
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          {application.jobId?.title}
                        </p>

                        <p className="text-sm text-slate-400">
                          {application.jobId?.companyName}
                        </p>

                      </div>


                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          application.status === "Selected"
                            ? "bg-green-100 text-green-700"
                            : application.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : application.status === "Shortlisted"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >

                        {application.status}

                      </span>

                    </div>

                  ))}

                </div>

              ) : (

                <p className="text-slate-500">
                  No recent applications.
                </p>

              )}

            </div>


            {/* Recent Jobs */}

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-[#172554]">
                  Recent Jobs
                </h2>

                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

                  <i className="fa-solid fa-briefcase text-blue-500 text-xl"></i>

                </div>

              </div>


              {stats.recentJobs?.length ? (

                <div className="space-y-5">

                  {stats.recentJobs.map((job) => (

                    <div
                      key={job._id}
                      className="flex justify-between items-center border-b border-slate-100 pb-4"
                    >

                      <div>

                        <h3 className="font-semibold text-[#172554]">
                          {job.title}
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          {job.companyName}
                        </p>

                      </div>


                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isJobActive(job)
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >

                        {isJobActive(job)
                          ? "Active"
                          : "Closed"}

                      </span>

                    </div>

                  ))}

                </div>

              ) : (

                <p className="text-slate-500">
                  No recent jobs.
                </p>

              )}

            </div>


          </div>


          {/* =====================================================
              PLACEMENT INSIGHTS
          ====================================================== */}

          <div className="mt-12">

            <h2 className="text-2xl font-bold text-[#172554] mb-6">
              Placement Insights
            </h2>


            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">


              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6">

                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">

                  <i className="fa-solid fa-building text-2xl text-blue-500"></i>

                </div>

                <p className="text-slate-500">
                  Hiring Companies
                </p>

                <h2 className="text-3xl font-bold text-[#172554] mt-2">
                  {stats.hiringCompanies}
                </h2>

              </div>


              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6">

                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-5">

                  <i className="fa-solid fa-chart-line text-2xl text-green-500"></i>

                </div>

                <p className="text-slate-500">
                  Selection Rate
                </p>

                <h2 className="text-3xl font-bold text-[#172554] mt-2">
                  {stats.selectionRate}%
                </h2>

              </div>


              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6">

                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-5">

                  <i className="fa-solid fa-fire text-2xl text-orange-500"></i>

                </div>

                <p className="text-slate-500">
                  Active Drives
                </p>

                <h2 className="text-3xl font-bold text-[#172554] mt-2">
                  {stats.activeJobs}
                </h2>

              </div>


              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6">

                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center mb-5">

                  <i className="fa-solid fa-users text-2xl text-purple-500"></i>

                </div>

                <p className="text-slate-500">
                  Students
                </p>

                <h2 className="text-3xl font-bold text-[#172554] mt-2">
                  {stats.totalStudents}
                </h2>

              </div>


            </div>

          </div>


          {/* =====================================================
              ACTIVITY TIMELINE
          ====================================================== */}

          <div className="mt-12">

            <h2 className="text-2xl font-bold text-[#172554] mb-6">
              Activity Timeline
            </h2>


            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">


              {stats.recentActivity?.length ? (

                <div className="space-y-6">

                  {stats.recentActivity.map(
                    (activity, index) => (

                      <div
                        key={index}
                        className="flex gap-5 items-start"
                      >

                        <div
                          className={`w-12 h-12 shrink-0 rounded-full flex justify-center items-center ${
                            activity.type === "job"
                              ? "bg-blue-100"
                              : "bg-orange-100"
                          }`}
                        >

                          <i
                            className={`fa-solid ${
                              activity.type === "job"
                                ? "fa-briefcase text-blue-600"
                                : "fa-user-plus text-orange-600"
                            }`}
                          ></i>

                        </div>


                        <div className="flex-1 border-b border-slate-100 pb-5">

                          <h3 className="font-semibold text-[#172554]">
                            {activity.title}
                          </h3>

                          <p className="text-slate-500 text-sm mt-1">
                            {activity.subtitle}
                          </p>

                          <p className="text-xs text-slate-400 mt-2">

                            {new Date(
                              activity.createdAt
                            ).toLocaleString()}

                          </p>

                        </div>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <p className="text-slate-500">
                  No recent activity.
                </p>

              )}

            </div>

          </div>


          {/* =====================================================
              CHARTS
          ====================================================== */}

          <div className="grid lg:grid-cols-2 gap-6 mt-12">


            {/* Application Status */}

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 h-[420px]">

              <h2 className="text-2xl font-bold text-[#172554] mb-5">
                Application Status
              </h2>


              <ResponsiveContainer
                width="100%"
                height="88%"
              >

                <PieChart>

                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    label
                  >

                    {chartData.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={COLORS[index]}
                        />

                      )
                    )}

                  </Pie>


                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>


            {/* Placement Summary */}

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 h-[420px]">

              <h2 className="text-2xl font-bold text-[#172554] mb-5">
                Placement Summary
              </h2>


              <ResponsiveContainer
                width="100%"
                height="88%"
              >

                <BarChart
                  data={barChartData}
                  barCategoryGap="20%"
                  barGap={0}
                  margin={{
                    top: 10,
                    right: 15,
                    left: 0,
                    bottom: 10,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />


                  <XAxis
                    dataKey="name"
                    tick={{
                      fill: "#64748B",
                      fontSize: 13,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />


                  <YAxis
                    allowDecimals={false}
                    interval={0}
                    tick={{
                      fill: "#64748B",
                      fontSize: 13,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />


                  <Tooltip />


                  <Bar
                    dataKey="value"
                    fill="#172554"
                    radius={[8, 8, 0, 0]}
                    barSize={42}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>


          </div>


        </div>

      </div>

    </PublicLayout>

  );

}


export default AdminDashboardPage;