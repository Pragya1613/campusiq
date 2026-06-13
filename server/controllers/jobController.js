const Job = require("../models/Job");

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

    res.status(200).json(jobs);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Job
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(
      req.params.id
    ).populate(
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
    const job = await Job.findByIdAndDelete(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

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