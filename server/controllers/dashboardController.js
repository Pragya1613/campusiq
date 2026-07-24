const Student = require("../models/Student");
const Job = require("../models/Job");
const Application = require("../models/Application");


// ================================
// Admin Dashboard
// ================================

const getDashboardStats = async (req, res) => {

  try {

    const totalStudents =
      await Student.countDocuments({
        role:"student",
      });

    const jobs = await Job.find();
        
    const totalJobs = jobs.length;
        
    const activeJobs = jobs.filter((job) => {
      if (!job.isActive) return false;
    
      if (!job.deadline) return true;
    
      const today = new Date();
      const deadline = new Date(job.deadline);
    
      today.setHours(0, 0, 0, 0);
      deadline.setHours(0, 0, 0, 0);
    
      return deadline >= today;
    }).length;
    
    const closedJobs = totalJobs - activeJobs;  

   

    const totalApplications =
      await Application.countDocuments();

    const selectedStudents =
      await Application.countDocuments({
        status: "Selected",
      });

      const recentApplications =
        await Application.find()
          .populate(
            "studentId",
            "fullName profilePhoto"
          )
          .populate(
            "jobId",
            "title companyName"
          )
          .sort({
            createdAt: -1,
          })

          const validRecentApplications =
          recentApplications
          .filter(
          
          (app)=>
          
          app.studentId &&
          app.jobId

          )
          .slice(0,5);
        
        const recentJobs =
          await Job.find()
            .select(
              "title companyName isActive deadline createdAt"
            )
            .sort({
              createdAt: -1,
            })
            .limit(5); 
            
        const hiringCompanies =
          await Job.distinct("companyName");

        const selectionRate =
          totalApplications === 0
            ? 0
            : Math.round(
                (selectedStudents /
                  totalApplications) *
                  100
              );

        const applicationStatus = {
        
        applied:
          await Application.countDocuments({
            status: "Applied",
          }),
        
        shortlisted:
          await Application.countDocuments({
            status: "Shortlisted",
          }),
        
        interviews:
          await Application.countDocuments({
            status: "Interview Scheduled",
          }),
        
        selected:
          await Application.countDocuments({
            status: "Selected",
          }),
        
        rejected:
          await Application.countDocuments({
            status: "Rejected",
          }),
        
      };            

        const recentActivity = [];
                    
        // Recent Applications
                    
        validRecentApplications.forEach(
          (application) => {
          
            recentActivity.push({
            
              type: "application",
            
              title: `${application.studentId?.fullName} applied`,
            
              subtitle: application.jobId?.title,
            
              createdAt:
                application.createdAt,
            
            });
          
          }
        );
        
        // Recent Jobs
        
        recentJobs.forEach((job) => {
        
          recentActivity.push({
          
            type: "job",
          
            title: `${job.companyName} posted a new job`,
          
            subtitle: job.title,
          
            createdAt: job.createdAt,
          
          });
        
        });
        
        // Latest 6 Activities
        
        recentActivity.sort(
        
          (a, b) =>
          
            new Date(b.createdAt) -
        
            new Date(a.createdAt)
        
        );              
        
    res.status(200).json({

      totalStudents,

      totalJobs,

      activeJobs,

      closedJobs,

      totalApplications,

      selectedStudents,

      recentApplications: validRecentApplications,

      recentJobs,

      hiringCompanies: hiringCompanies.length,

      selectionRate,

      applicationStatus,

      recentActivity: recentActivity.slice(0,6),

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

// ================================
// Student Dashboard
// ================================

const getStudentDashboard = async (
  req,
  res
) => {

  try {

    const student =
      await Student.findById(req.user.id)
        .select(
          "fullName branch cgpa currentSemester phone skills resumeUrl profileCompleted"
        );

      if (!student) {
      
        return res.status(404).json({
        
          message: "Student not found",
        
        });
      
      }
      
    const applied =
      await Application.countDocuments({

        studentId: req.user.id,

        status: "Applied",

      });

    const shortlisted =
      await Application.countDocuments({

        studentId: req.user.id,

        status: "Shortlisted",

      });

    const interviews =
      await Application.countDocuments({

        studentId: req.user.id,

        status: "Interview Scheduled",

      });

    const selected =
      await Application.countDocuments({

        studentId: req.user.id,

        status: "Selected",

      });

    const rejected =
      await Application.countDocuments({

        studentId: req.user.id,

        status: "Rejected",

      });

    // ============================
    // Profile Completion
    // ============================

    let completion = 0;

    if (student.fullName) completion += 15;

    if (student.branch) completion += 15;

    if (student.cgpa !== undefined && student.cgpa !== null)
      completion += 15;

    if (student.currentSemester)
      completion += 10;

    if (student.phone)
      completion += 10;

    if (student.skills?.length)
      completion += 15;

    if (student.resumeUrl)
      completion += 20;

    res.status(200).json({

      student,

      profileCompletion: completion,

      applied,

      shortlisted,

      interviews,

      selected,

      rejected,

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};

module.exports = {

  getDashboardStats,

  getStudentDashboard,

};