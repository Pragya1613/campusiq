const Job = require("../models/Job");
const Student = require("../models/Student");
const Application = require("../models/Application");

// Create Job
const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);

    res.status(201).json({
      message: "Job created successfully",
      job,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Jobs
const getAllJobs = async (req, res) => {
  try {

    const jobs = await Job.find().populate(
      "collegeId",
      "name location"
    );

    // If user is not logged in, return normal jobs
    if (!req.user) {
      return res.status(200).json(jobs);
    }

    // Get logged-in student
    const student = await Student.findById(req.user.id);

    // If logged-in user is not a student
    if (!student) {
      return res.status(200).json(jobs);
    }

    // Get student's applied jobs
    const applications = await Application.find({
      studentId: student._id,
    }).select("jobId");

    const appliedJobIds = applications.map((application) =>
      application.jobId.toString()
    );

    // Add eligibility & application status
    const updatedJobs = jobs.map((job) => ({
      ...job.toObject(),

      alreadyApplied: appliedJobIds.includes(
        job._id.toString()
      ),

      eligible:
        job.eligibilityCgpa == null
          ? true
          : student.cgpa >= job.eligibilityCgpa,
    }));

    res.status(200).json(updatedJobs);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get Single Job
const getJobById = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id).populate(
      "collegeId",
      "name location"
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Update Job
const updateJob = async (req, res) => {
  try {

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job updated successfully",
      job,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Delete Job
const deleteJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Applications will be deleted automatically
    // by Job model middleware

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Job deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};