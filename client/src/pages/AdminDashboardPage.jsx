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

function AdminDashboardPage() {

  const [stats, setStats] =
    useState(null);

  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          const response =
            await api.get(
              "/dashboard"
            );

          setStats(
            response.data
          );

        } catch (error) {

          console.log(error);

        }

      };

    fetchStats();

  }, []);

  if (!stats) {

    return (
      <PublicLayout>
        <div className="min-h-screen flex justify-center items-center">
          <h2 className="text-2xl font-semibold text-gray-600">
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

  return (
    <PublicLayout>

      <div className="min-h-screen bg-gray-100 px-6 py-10">

        <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-10">

          <div>

            <p className="uppercase tracking-[0.3em] text-sm font-semibold text-orange-500">

              Admin Portal

            </p>

            <h1 className="text-5xl font-bold text-[#172554] mt-2">

              Welcome Back, Admin

            </h1>

            <p className="text-gray-500 text-lg mt-3">

              Monitor placements, manage opportunities and track student recruitment.

            </p>

          </div>

          <Link
            to="/create-job"
            className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 rounded-2xl shadow-lg transition-all duration-300 flex items-center gap-3"
          >
          
            <i className="fa-solid fa-plus"></i>

            Create New Job

          </Link>

        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

            {/* Total Students */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 text-center border-t-4 border-blue-500">

              <i className="fa-solid fa-user-graduate text-4xl text-blue-500 mb-3"></i>

              <h3 className="text-gray-500">
                Total Students
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.totalStudents}
              </h2>

            </div>

            {/* Total Jobs */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 text-center border-t-4 border-green-500">

              <i className="fa-solid fa-briefcase text-4xl text-green-500 mb-3"></i>

              <h3 className="text-gray-500">
                Total Jobs
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.totalJobs}
              </h2>

            </div>

            {/* Active Jobs */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 text-center border-t-4 border-orange-500">

              <i className="fa-solid fa-fire text-4xl text-orange-500 mb-3"></i>

              <h3 className="text-gray-500">
                Active Jobs
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.activeJobs}
              </h2>

            </div>

            {/* Applications */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 text-center border-t-4 border-purple-500">

              <i className="fa-solid fa-file-lines text-4xl text-purple-500 mb-3"></i>

              <h3 className="text-gray-500">
                Applications
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.totalApplications}
              </h2>

            </div>

            {/* Selected */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 text-center border-t-4 border-yellow-500">

              <i className="fa-solid fa-trophy text-4xl text-yellow-500 mb-3"></i>

              <h3 className="text-gray-500">
                Selected
              </h3>

              <h2 className="text-4xl font-bold text-[#172554] mt-2">
                {stats.selectedStudents}
              </h2>

            </div>

          </div>

          {/* Quick Actions */}

            <div className="mt-12">

              <h2 className="text-2xl font-bold text-[#172554] mb-6">
                Quick Actions
              </h2>

              <div className="grid md:grid-cols-3 gap-6">

                <Link
                  to="/create-job"
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 border border-gray-200 hover:border-orange-300"
                >
                  <i className="fa-solid fa-plus text-3xl text-green-500 mb-4"></i>

                  <h3 className="text-xl font-semibold text-[#172554]">
                    Create Job
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Publish a new placement opportunity.
                  </p>
                </Link>

                <Link
                  to="/manage-jobs"
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 border border-gray-200 hover:border-orange-300"
                >
                  <i className="fa-solid fa-briefcase text-3xl text-blue-500 mb-4"></i>

                  <h3 className="text-xl font-semibold text-[#172554]">
                    Manage Jobs
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Edit, close or delete existing jobs.
                  </p>
                </Link>

                <Link
                  to="/admin-applications"
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 border border-gray-200 hover:border-orange-300"
                >
                  <i className="fa-solid fa-file-lines text-3xl text-orange-500 mb-4"></i>

                  <h3 className="text-xl font-semibold text-[#172554]">
                    Applications
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Review and update application status.
                  </p>
                </Link>

              </div>

            </div>

            {/* Recent Activity */}

            <div className="grid lg:grid-cols-2 gap-8 mt-12">

              {/* Recent Applications */}

              <div className="bg-white rounded-2xl shadow-md p-6">

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-2xl font-bold text-[#172554]">

                    Recent Applications

                  </h2>

                  <i className="fa-solid fa-users text-orange-500 text-2xl"></i>

                </div>

                {stats.recentApplications?.length ? (
                
                  <div className="space-y-5">
                  
                    {stats.recentApplications.map((application) => (
                    
                      <div
                        key={application._id}
                        className="flex justify-between items-center border-b pb-4"
                      >
                      
                        <div>
                    
                          <h3 className="font-semibold text-[#172554]">
                    
                            {application.studentId?.fullName}
                    
                          </h3>
                    
                          <p className="text-sm text-gray-500">
                    
                            {application.jobId?.title}
                    
                          </p>
                    
                          <p className="text-sm text-gray-400">
                    
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
                
                  <p className="text-gray-500">
                  
                    No recent applications.
                
                  </p>

                )}

              </div>
              
              {/* Recent Jobs */}
              
              <div className="bg-white rounded-2xl shadow-md p-6">
              
                <div className="flex justify-between items-center mb-6">
              
                  <h2 className="text-2xl font-bold text-[#172554]">
              
                    Recent Jobs
              
                  </h2>
              
                  <i className="fa-solid fa-briefcase text-blue-500 text-2xl"></i>
              
                </div>
              
                {stats.recentJobs?.length ? (
                
                  <div className="space-y-5">
                  
                    {stats.recentJobs.map((job) => (
                    
                      <div
                        key={job._id}
                        className="flex justify-between items-center border-b pb-4"
                      >
                      
                        <div>
                    
                          <h3 className="font-semibold text-[#172554]">
                    
                            {job.title}
                    
                          </h3>
                    
                          <p className="text-sm text-gray-500">
                    
                            {job.companyName}
                    
                          </p>
                    
                        </div>
                    
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            job.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {job.isActive ? "Active" : "Closed"}
                        </span>
                        
                      </div>

                    ))}

                  </div>

                ) : (
                
                  <p className="text-gray-500">
                  
                    No recent jobs.
                
                  </p>

                )}

              </div>
              
            </div>  

          {/* Placement Insights */}

          <div className="mt-12">

            <h2 className="text-2xl font-bold text-[#172554] mb-6">

              Placement Insights

            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6">

                <i className="fa-solid fa-building text-3xl text-blue-500 mb-4"></i>

                <h3 className="text-gray-500">

                  Hiring Companies

                </h3>

                <h2 className="text-3xl font-bold text-[#172554] mt-2">

                  {stats.hiringCompanies}

                </h2>

              </div>

              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6">

                <i className="fa-solid fa-chart-line text-3xl text-green-500 mb-4"></i>

                <h3 className="text-gray-500">

                  Selection Rate

                </h3>

                <h2 className="text-3xl font-bold text-[#172554] mt-2">

                  {stats.selectionRate}%

                </h2>

              </div>

              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6">

                <i className="fa-solid fa-fire text-3xl text-orange-500 mb-4"></i>

                <h3 className="text-gray-500">

                  Active Drives

                </h3>

                <h2 className="text-3xl font-bold text-[#172554] mt-2">

                  {stats.activeJobs}

                </h2>

              </div>

              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6">

                <i className="fa-solid fa-users text-3xl text-purple-500 mb-4"></i>

                <h3 className="text-gray-500">

                  Students

                </h3>

                <h2 className="text-3xl font-bold text-[#172554] mt-2">

                  {stats.totalStudents}

                </h2>

              </div>

            </div>

          </div>    

          {/* Activity Timeline */}

          <div className="mt-12">

            <h2 className="text-2xl font-bold text-[#172554] mb-6">

              Activity Timeline

            </h2>

            <div className="bg-white rounded-2xl shadow-md p-6">

              {stats.recentActivity?.length ? (
              
                <div className="space-y-6">
                
                  {stats.recentActivity.map(
                  
                    (activity, index) => (
                    
                      <div
                        key={index}
                        className="flex gap-5 items-start"
                      >
                      
                        <div
                          className={`w-12 h-12 rounded-full flex justify-center items-center
                          ${
                            activity.type === "job"
                          
                              ? "bg-blue-100"
                          
                              : "bg-orange-100"
                          }`}
                        >
                        
                          <i
                            className={`fa-solid
                            ${
                              activity.type === "job"
                            
                                ? "fa-briefcase text-blue-600"
                            
                                : "fa-user-plus text-orange-600"
                            }`}
                          ></i>

                        </div>
                          
                        <div className="flex-1 border-b pb-5">
                          
                          <h3 className="font-semibold text-[#172554]">
                          
                            {activity.title}
                          
                          </h3>
                          
                          <p className="text-gray-500 text-sm mt-1">
                          
                            {activity.subtitle}
                          
                          </p>
                          
                          <p className="text-xs text-gray-400 mt-2">
                          
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
              
                <p className="text-gray-500">
                
                  No recent activity.
              
                </p>

              )}

            </div>
            
          </div>  


          {/* Charts */}
                      
          <div className="grid lg:grid-cols-2 gap-8 mt-12">
                      
            {/* Application Status */}
                      
            <div className="bg-white rounded-2xl shadow-md p-8 h-[420px]">
                      
              <h2 className="text-2xl font-bold text-[#172554] mb-6">
                      
                Application Status
                      
              </h2>
                      
              <ResponsiveContainer width="100%" height="90%">
                      
                <PieChart>
                      
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    label
                  >
                  
                    {chartData.map((entry, index) => (
                    
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    
                    ))}
          
                  </Pie>
                  
                  <Tooltip />
                  
                </PieChart>
                  
              </ResponsiveContainer>
                  
            </div>
                  
            {/* Placement Summary */}
                  
            <div className="bg-white rounded-2xl shadow-md p-8 h-[420px]">
                  
              <h2 className="text-2xl font-bold text-[#172554] mb-6">
                  
                Placement Summary
                  
              </h2>
                  
              <ResponsiveContainer width="100%" height="90%">
                  
                <BarChart data={barChartData}>
                  
                  <CartesianGrid strokeDasharray="3 3" />
                  
                  <XAxis dataKey="name" />
                  
                  <YAxis
                    allowDecimals={false}
                    interval={0}
                  />
          
                  <Tooltip />
                  
                  <Bar
                    dataKey="value"
                    fill="#172554"
                    radius={[8, 8, 0, 0]}
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