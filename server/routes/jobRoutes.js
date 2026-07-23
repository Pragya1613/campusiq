const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

// Create Job
router.post("/", protect, createJob);

// Get All Jobs
router.get("/", protect, getAllJobs);

// Get Single Job
router.get("/:id", protect, getJobById);

// Update Job
router.put("/:id", protect, updateJob);

// Delete Job
router.delete("/:id", protect, deleteJob);

module.exports = router;