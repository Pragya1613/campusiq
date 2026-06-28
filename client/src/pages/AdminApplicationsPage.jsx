import {
  useEffect,
  useState,
} from "react";

import PublicLayout from "../layouts/PublicLayout";

import {
  getAllApplications,
  updateApplicationStatus,
} from "../services/adminApplicationService";

import StudentProfileModal from "../components/StudentProfileModal";

function AdminApplicationsPage() {

  const [applications, setApplications] =
    useState([]);

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [showProfile, setShowProfile] =
    useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications =
    async () => {

      try {

        const data =
          await getAllApplications();

        setApplications(data);

      } catch (error) {

        console.log(error);

      }

    };




  const handleStatusChange =
    async (id, status) => {

      try {

        await updateApplicationStatus(
          id,
          status
        );

        alert(
          "Status Updated Successfully"
        );

        fetchApplications();

      } catch (error) {

        console.log(error);

      }

    };

    const handleViewProfile = (
      application
    ) => {
    
      setSelectedStudent(
        application.studentId
      );
    
      setShowProfile(true);
    
    };

    const handleDownloadResume =
      async (application) => {
      
        try {
        
          const response =
            await fetch(
              application.studentId.resumeUrl
            );
          
          const blob =
            await response.blob();
          
          const url =
            window.URL.createObjectURL(blob);
          
          const link =
            document.createElement("a");
          
          link.href = url;
          
          link.download =
            application.studentId.resumeName ||
            "Resume.pdf";
          
          document.body.appendChild(link);
          
          link.click();
          
          link.remove();
          
          window.URL.revokeObjectURL(url);
          
        }
      
        catch (error) {
        
          console.log(error);
        
        }
      
    };

  return (
    <PublicLayout>

      <div className="min-h-screen bg-gray-100 px-6 py-10">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold text-[#172554] mb-8">
            Application Management
          </h1>

          {applications.length === 0 ? (

            <div className="bg-white rounded-2xl shadow-md p-10 text-center">

              <i className="fa-solid fa-users-slash text-5xl text-gray-400 mb-4"></i>

              <h2 className="text-2xl font-semibold text-gray-700">
                No Applications Found
              </h2>

              <p className="text-gray-500 mt-2">
                Student applications will appear here.
              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {applications.map(
                (application) => (

                  <div
                    key={application._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6"
                  >

                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

                      <div className="space-y-3">

                        <h2 className="text-2xl font-bold text-[#172554] flex items-center gap-3">

                          <i className="fa-solid fa-user-graduate text-orange-500 text-xl"></i>

                          {application.studentId?.fullName}

                        </h2>

                        <p className="flex items-center text-gray-600">

                          <i className="fa-solid fa-envelope text-slate-500 w-6"></i>

                          <span>{application.studentId?.email}</span>

                        </p>

                        <p className="flex items-center text-gray-600">

                          <i className="fa-solid fa-briefcase text-amber-700 w-6"></i>

                          <span>

                            Applied For :

                            <span className="font-semibold text-[#172554] ml-1">

                              {application.jobId?.title}

                            </span>

                          </span>

                        </p>

                        <p className="flex items-center text-gray-600">

                          <i className="fa-solid fa-building text-blue-500 w-6"></i>

                          <span>

                            Company :

                            <span className="font-semibold text-[#172554] ml-1">

                              {application.jobId?.companyName}

                            </span>

                          </span>

                        </p>

                        <p className="flex items-center text-gray-600">

                          <i className="fa-solid fa-chart-line text-green-500 w-6"></i>

                          <span>

                            CGPA :

                            <span className="font-semibold text-[#172554] ml-1">

                              {application.studentId?.cgpa ?? "N/A"}

                            </span>

                          </span>

                        </p>

                        <p className="flex items-center text-gray-600">

                          <i className="fa-solid fa-calendar-days text-violet-500 w-6"></i>

                          <span>

                            Applied On :

                            <span className="font-semibold text-[#172554] ml-1">

                              {new Date(
                                application.createdAt
                              ).toLocaleDateString()}

                            </span>
                            
                          </span>
                            
                        </p>  

                        {application.studentId?.resumeUrl && (
                        
                          <div className="flex gap-3 mt-5">

                            <button
                              onClick={() => handleViewProfile(application)}
                              className="px-4 py-2 rounded-lg bg-[#172554] text-white hover:bg-[#0f1d46] transition"
                            >
                              <i className="fa-solid fa-user mr-2"></i>
                              View Profile
                            </button>

                          {application.studentId?.rsumeUrl &&(
                            <button
                              onClick={() => handleDownloadResume(application)}
                              className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
                            >
                              <i className="fa-solid fa-download mr-2"></i>
                              Download Resume
                            </button>
                          )}
                          </div>                       

                        )}                                             

                      </div>

                      <div className="min-w-[220px]">

                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Application Status
                        </label>

                        <select
                          value={
                            application.status
                          }
                          onChange={(e) =>
                            handleStatusChange(
                              application._id,
                              e.target.value
                            )
                          }
                          className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >

                          <option>
                            Applied
                          </option>

                          <option>
                            Shortlisted
                          </option>

                          <option>
                            Interview Scheduled
                          </option>

                          <option>
                            Selected
                          </option>

                          <option>
                            Rejected
                          </option>

                        </select>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    <StudentProfileModal
      isOpen={showProfile}
      student={selectedStudent}
      onClose={() => {
        setShowProfile(false);
        setSelectedStudent(null);
      }}
    />

    </PublicLayout>
  );
}

export default AdminApplicationsPage;