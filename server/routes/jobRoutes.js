const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

// Create Job (Admin Only)
router.post(
  "/",
  protect,
  authorize("admin"),
  createJob
);

// Get All Jobs (Student & Admin)
router.get(
  "/",
  protect,
  authorize("student", "admin"),
  getAllJobs
);

// Get Single Job (Student & Admin)
router.get(
  "/:id",
  protect,
  authorize("student", "admin"),
  getJobById
);

// Update Job (Admin Only)
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateJob
);

// Delete Job (Admin Only)
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteJob
);

module.exports = router;