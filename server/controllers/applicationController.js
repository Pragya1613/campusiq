const Application = require("../models/Application");

// Apply Job
const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

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
          "fullName email"
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
          "fullName email"
        )
        .populate("jobId");

    res.status(200).json(
      applications
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