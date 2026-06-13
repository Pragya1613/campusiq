const Student = require("../models/Student");
const Job = require("../models/Job");
const Application = require("../models/Application");

const getDashboardStats = async (req, res) => {
  try {

    const totalStudents =
      await Student.countDocuments();

    const totalJobs =
      await Job.countDocuments();

    const activeJobs =
      await Job.countDocuments({
        isActive: true,
      });

    const totalApplications =
      await Application.countDocuments();

    const selectedStudents =
      await Application.countDocuments({
        status: "Selected",
      });

    res.status(200).json({
      totalStudents,
      totalJobs,
      activeJobs,
      totalApplications,
      selectedStudents,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getStudentDashboard = async (
  req,
  res
) => {
  try {

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
        status:
          "Interview Scheduled",
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

    res.status(200).json({
      applied,
      shortlisted,
      interviews,
      selected,
      rejected,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getStudentDashboard,
};