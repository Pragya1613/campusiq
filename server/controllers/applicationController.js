const Application = require("../models/Application");
const Job = require("../models/Job");
const Student = require("../models/Student");
const { isJobActive } = require("../utils/jobUtils");
const { sendEmail } = require("../services/emailService");
const EMAIL_SUBJECTS = require("../utils/emailSubjects");

// Apply Job
const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const job = await Job.findById(jobId);
      
    if (!job) {
    
      return res.status(404).json({
        message: "Job not found",
      });
    
    }

    const student = await Student.findById(req.user.id);

      if (!student) {
      
        return res.status(404).json({
          message: "Student not found",
        });
      
      }

      if (student.cgpa < job.eligibilityCgpa) {
      
        return res.status(400).json({
        
          message: `Minimum CGPA required is ${job.eligibilityCgpa}`,
        
        });
      
      }
      
    if (!isJobActive(job)) {

      if (job.deadline && new Date(job.deadline) < new Date()) {
      
        return res.status(400).json({
          message: "Application deadline has passed",
        });
      
      }

      return res.status(400).json({
        message: "This job is no longer accepting applications",
      });
    
    }

    const existingApplication =
      await Application.findOne({
        studentId: req.user.id,
        jobId,
      });

    if (existingApplication) {
      return res.status(400).json({
        message: "Already applied",
      });
    }

    const application =
      await Application.create({
        studentId: req.user.id,
        jobId,
      });

      await sendEmail({
        to: student.email,
        subject: EMAIL_SUBJECTS.APPLICATION_RECEIVED,
        template: "applicationReceived",
        data: {
          studentName: student.fullName,
          companyName: job.companyName,
          jobTitle: job.title,
          applicationDate: new Date().toLocaleDateString("en-IN"),
        },
      });


    res.status(201).json({
      message: "Application submitted",
      application,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Applications
const getMyApplications = async (
  req,
  res
) => {
  try {
    const applications =
      await Application.find({
        studentId: req.user.id,
      })
        .populate("jobId")
        .populate(
          "studentId",
          "fullName email phone enrollmentNumber branch currentSemester cgpa currentBacklogs targetRole githubUrl linkedinUrl leetcodeUrl skills resumeUrl resumeName profilePhoto"
        );

    res.status(200).json(
      applications
    );

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Applications
const getAllApplications = async (
  req,
  res
) => {
  try {
    const applications =
      await Application.find()
        .populate(
          "studentId",
          "fullName email phone enrollmentNumber branch currentSemester cgpa currentBacklogs targetRole githubUrl linkedinUrl leetcodeUrl skills resumeUrl resumeName profilePhoto"
        )
        .populate("jobId");

        const validApplications =
        applications.filter(
        
        (app)=>
        
        app.studentId &&
        app.jobId
        
        );
        
      return res.status(200).json(
        validApplications
      );

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Status
const updateApplicationStatus =
  async (req, res) => {
    try {
      const application =
        await Application.findByIdAndUpdate(
          req.params.id,
          {
            status:
              req.body.status,
          },
          {
            new: true,
          }
        ); 

      if (!application) {
        return res.status(404).json({
          message:
            "Application not found",
        });
      }

      await application.populate([
        { path: "studentId" },
        { path: "jobId" },
      ]);


      switch (application.status) {
        case "Shortlisted":
          await sendEmail({
            to: application.studentId.email,
            subject: EMAIL_SUBJECTS.SHORTLISTED,
            template: "shortlisted",
            data: {
              studentName: application.studentId.fullName,
              companyName: application.jobId.companyName,
              jobTitle: application.jobId.title,
            },
          });
          break;
        
        case "Selected":
          await sendEmail({
            to: application.studentId.email,
            subject: EMAIL_SUBJECTS.SELECTED,
            template: "selected",
            data: {
              studentName: application.studentId.fullName,
              companyName: application.jobId.companyName,
              jobTitle: application.jobId.title,
            },
          });
          break;
        
        case "Rejected":
          await sendEmail({
            to: application.studentId.email,
            subject: EMAIL_SUBJECTS.REJECTED,
            template: "rejected",
            data: {
              studentName: application.studentId.fullName,
              companyName: application.jobId.companyName,
              jobTitle: application.jobId.title,
            },
          });
          break;

        case "Interview Scheduled":
          await sendEmail({
            to: application.studentId.email,
            subject: EMAIL_SUBJECTS.INTERVIEW_SCHEDULED,
            template: "interviewScheduled",
            data: {
              studentName: application.studentId.fullName,
              companyName: application.jobId.companyName,
              jobTitle: application.jobId.title,
              interviewDate: "To be announced",
              interviewTime: "To be announced",
              interviewMode: "Details will be shared on your dashboard",
            },
          });
          break;          
        
        default:
          break;
      }


      res.status(200).json({
        message:
          "Status updated successfully",
        application,
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };


  const deleteApplication = async (
  req,
  res
) => {
  try {
    const application =
      await Application.findByIdAndDelete(
        req.params.id
      );

    if (!application) {
      return res.status(404).json({
        message:
          "Application not found",
      });
    }

    res.status(200).json({
      message:
        "Application deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  applyJob,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication,
};