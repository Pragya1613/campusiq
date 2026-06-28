import React from "react";

function StudentProfileModal({
  isOpen,
  student,
  onClose,
}) {

  if (!isOpen || !student) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-5">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

        {/* Header */}

        <div className="flex justify-between items-center border-b px-8 py-6">

          <div>

            <h2 className="text-3xl font-bold text-[#172554]">

              Student Profile

            </h2>

            <p className="text-gray-500 mt-1">

              Complete student information

            </p>

          </div>

          <button
            onClick={onClose}
            className="text-3xl text-gray-400 hover:text-red-500 transition"
          >
            ×
          </button>

        </div>

        <div className="p-8 space-y-10">

          {/* Student Header */}

            <div className="flex items-center gap-5">

                {student.profilePhoto ? (
                
                  <img
                    src={student.profilePhoto}
                    alt={student.fullName}
                    className="w-20 h-20 rounded-full object-cover border-4 border-orange-100"
                  />
                
                ) : (
                
                  <div className="w-20 h-20 rounded-full bg-orange-100 flex justify-center items-center">
                
                    <i className="fa-solid fa-user-graduate text-4xl text-orange-500"></i>
                
                  </div>

                )} 

            <div>

              <h3 className="text-2xl font-bold text-[#172554]">

                {student.fullName}

              </h3>

              <p className="text-gray-500">

                {student.branch || "Branch Not Available"}

              </p>

            </div>

          </div>

          {/* Personal Information */}

          <div>

            <h4 className="text-lg font-semibold text-[#172554] mb-4 border-b pb-2">

              Personal Information

            </h4>

            <div className="grid md:grid-cols-2 gap-x-10 gap-y-5">

              <p>
                <i className="fa-solid fa-envelope text-slate-500 mr-2"></i>
                {student.email}
              </p>

              <p>
                <i className="fa-solid fa-phone text-green-500 mr-2"></i>
                {student.phone || "N/A"}
              </p>

              <p>
                <i className="fa-solid fa-building-columns text-blue-500 mr-2"></i>
                {student.branch || "N/A"}
              </p>

              <p>
                <i className="fa-solid fa-calendar text-orange-500 mr-2"></i>
                Semester : {student.currentSemester || "N/A"}
              </p>

              <p>
                <i className="fa-solid fa-id-card text-purple-500 mr-2"></i>
                Enrollment :
                    <span className="font-semibold ml-1">
                        {student.enrollmentNumber}
                    </span>
                </p>

            </div>

          </div>

          {/* Academic */}

          <div>

            <h4 className="text-lg font-semibold text-[#172554] mb-4 border-b pb-2">

              Academic Details

            </h4>

            <div className="grid md:grid-cols-2 gap-4">

              <p>

                <i className="fa-solid fa-chart-line text-green-500 mr-2"></i>

                CGPA :

                <span className="font-semibold ml-1">

                  {student.cgpa ?? "N/A"}

                </span>

              </p>

                <p>

                  <i className="fa-solid fa-triangle-exclamation text-red-500 mr-2"></i>

                  Current Backlogs :

                  <span className="font-semibold ml-1">

                    {student.currentBacklogs}

                  </span>

                </p>

                <p>

                  <i className="fa-solid fa-bullseye text-orange-500 mr-2"></i>

                  Target Role :

                  <span className="font-semibold ml-1">

                    {student.targetRole || "N/A"}

                  </span>

                </p>                

            </div>

          </div>

          {/* Skills */}

          <div>

            <h4 className="text-lg font-semibold text-[#172554] mb-4 border-b pb-2">

              Skills

            </h4>

            <div className="flex flex-wrap gap-3">

              {student.skills?.length ? (

                student.skills.map((skill, index) => (

                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>

                ))

              ) : (

                <span className="text-gray-500">

                  No skills added

                </span>

              )}

            </div>

          </div>

          {/* Coding Profiles */}

          <div>

            <h4 className="text-lg font-semibold text-[#172554] mb-4 border-b pb-2">

              Coding Profiles

            </h4>

            <div className="flex flex-wrap gap-4">

              {student.githubUrl && (

                <a
                  href={student.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition"
                >
                  <i className="fa-brands fa-github mr-2"></i>

                  GitHub

                </a>

              )}

              {student.leetcodeUrl && (

                <a
                  href={student.leetcodeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition"
                >
                  <i className="fa-solid fa-code mr-2"></i>

                  LeetCode

                </a>

              )}

              {student.linkedinUrl && (

                <a
                  href={student.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition"
                >
                  <i className="fa-brands fa-linkedin mr-2"></i>

                  LinkedIn

                </a>

              )}

            </div>

          </div>

          {/* Resume */}

          {student.resumeUrl && (

            <div>

              <h4 className="text-lg font-semibold text-[#172554] mb-4 border-b pb-2">

                Resume

              </h4>

            <div className="flex items-center justify-between border rounded-2xl p-5">
                    
              <div>
                    
                <h5 className="font-semibold text-[#172554]">
                    
                  {student.resumeName || "Resume.pdf"}
                    
                </h5>
                    
                <p className="text-sm text-gray-500">
                    
                  Resume uploaded by student
                    
                </p>
                    
              </div>
                    
              <a
                href={student.resumeUrl}
                download={student.resumeName}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition"
              >
            
                <i className="fa-solid fa-download"></i>
                    
                Download
                    
              </a>
                    
            </div>

            </div>

          )}

            <div className="flex justify-end pt-6">
                
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-[#172554] text-white hover:bg-[#0f1d46] transition"
              >
                Close
              </button>
                
            </div>          

        </div>

      </div>

    </div>

  );

}

export default StudentProfileModal;