import { useEffect, useState } from "react";
import PublicLayout from "../layouts/PublicLayout";
import EditJobModal from "../components/EditJobModal";

import {
  getAllJobs,
  updateJob,
  deleteJob,
} from "../services/jobService";

function ManageJobsPage() {

  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedJob, setSelectedJob] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchJobs();

  }, []);

  // ============================
  // Fetch All Jobs
  // ============================

  const fetchJobs = async () => {

    try {

      setLoading(true);

      const data =
        await getAllJobs();

      setJobs(data);

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

  // ============================
  // Search Filter
  // ============================

  const filteredJobs =
    jobs.filter((job) =>
      job.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      job.companyName
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // ============================
  // Open Edit Modal
  // ============================

  const handleEdit = (job) => {

    setSelectedJob(job);

    setShowModal(true);

  };

  // ============================
  // Delete Job
  // ============================

  const handleDelete =
    async (id) => {

      const ok =
        window.confirm(
          "Delete this Job?"
        );

      if (!ok) return;

      try {

        await deleteJob(id);

        alert(
          "Job Deleted Successfully"
        );

        fetchJobs();

      }

      catch (error) {

        console.log(error);

        alert(
          "Failed To Delete Job"
        );

      }

    };

  // ============================
  // Save Updated Job
  // ============================

  const handleSave =
    async (formData) => {

      try {

        await updateJob(

          selectedJob._id,

          formData

        );

        alert(
          "Job Updated Successfully"
        );

        setShowModal(false);

        setSelectedJob(null);

        fetchJobs();

      }

      catch (error) {

        console.log(error);

        alert(
          "Failed To Update Job"
        );

      }

    };

  // ============================
  // Loading
  // ============================

  if (loading) {

    return (

      <PublicLayout>

        <div className="min-h-screen flex justify-center items-center">

          <h2 className="text-2xl font-semibold text-gray-600">

            Loading Jobs...

          </h2>

        </div>

      </PublicLayout>

    );

  }

  return (
      <PublicLayout>
  
        <div className="min-h-screen bg-gray-100 px-6 py-10">
  
          <div className="max-w-7xl mx-auto">
  
            <h1 className="text-4xl font-bold text-[#172554] mb-6">
               <p className="text-gray-500">

                Manage, update and monitor placement opportunities.

                </p>
            </h1>
            <p className="text-slate-500 mt-2 mb-8">

                Update or remove placement opportunities.

            </p>
  
            {/* Search Bar */}
  
            <div className="mb-8">
  
              <input
                type="text"
                placeholder="Search by Job Title or Company..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full md:w-96 px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
  
            </div>
  
            {/* Jobs Grid */}
  
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
  
              {filteredJobs.length >
              0 ? (
  
                filteredJobs.map(
                  (job) => (
  
                    <div
                      key={job._id}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200"
                    >
  
                      <div className="flex justify-between items-start mb-4">
  
                        <div>
  
                          <h2 className="text-2xl font-bold text-[#172554]">
                            {job.title}
                          </h2>
  
                          <p className="text-gray-600 font-medium mt-1">
                            {job.companyName}
                          </p>
  
                        </div>
  
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          ₹ {job.package ? `${job.package} LPA` : "Package N/A"}
                        </span>
  
                      </div>
  
                      <div className="space-y-3 mb-6 text-gray-600">
  
                        <p>
                          <i className="fa-solid fa-location-dot text-red-500 mr-2"></i>
                          {job.location}
                        </p>
                        <p>

                            <p>
                                            
                            <i className="fa-solid fa-chart-line text-orange-500 mr-2"></i>
                                            
                            Minimum CGPA :
                                            
                            <span className="font-semibold ml-1">
                                            
                            {job.eligibilityCgpa}
                                            
                            </span>
                                            
                            </p>

                        </p>
  
                        <p>
                            <i className="fa-solid fa-circle-check text-green-500 mr-2"></i>

                            Status :{" "}

                            <span
                              className={
                                job.isActive
                                  ? "text-green-600 font-semibold"
                                  : "text-red-500 font-semibold"
                              }
                            >
                              {job.isActive ? "Active" : "Closed"}
                            </span>
                        </p>

                            <div className="flex flex-wrap gap-2 mt-4">

                              {job.requiredSkills?.map((skill, index) => (
                            
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                                >
                                  {skill}
                                </span>

                              ))}

                            </div>
                          
                            <p className="mt-4 text-gray-500">
                          
                              <i className="fa-solid fa-calendar-days text-blue-500 mr-2"></i>
                          
                              Deadline :
                          
                              {job.deadline
                                ? new Date(job.deadline).toLocaleDateString()
                                : "N/A"}

                            </p>                       
                          
                     </div>
                        <div className="flex gap-3">

                            <button
                              onClick={() => handleEdit(job)}
                              className="flex-1 bg-[#172554] text-white py-3 rounded-xl hover:bg-[#0f1d46] transition"
                            >

                              <i className="fa-solid fa-pen-to-square mr-2"></i>

                              Edit

                            </button>

                            <button
                              onClick={() => handleDelete(job._id)}
                              className="flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
                            >

                              <i className="fa-solid fa-trash mr-2"></i>

                              Delete

                            </button>
                        </div>
                      
  
                    </div>
  
                  )
                )
  
              ) : (
                <div className="col-span-full bg-white rounded-2xl p-12 text-center">
                    
                    <i className="fa-solid fa-briefcase text-5xl text-gray-300 mb-5"></i>

                    <h2 className="text-2xl font-bold">

                    No Jobs Found

                    </h2>

                    <p className="text-gray-500 mt-2">

                    Create your first placement opportunity.

                    </p>

                </div>
  
              )}
  
            </div>
  
          </div>
  
        </div>

        <EditJobModal
            isOpen={showModal}
            selectedJob={selectedJob}
            onClose={() => {
                setShowModal(false);
                setSelectedJob(null);
            }}
        onSave={handleSave}
        />
  
      </PublicLayout>
    );
}

export default ManageJobsPage;
