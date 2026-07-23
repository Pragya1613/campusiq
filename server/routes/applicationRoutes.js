const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const {
  applyJob,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication,
} = require("../controllers/applicationController");

// Student Apply Job
router.post(
  "/",
  protect,
  authorize("student"),
  applyJob
);

// Student Applications
router.get(
  "/my",
  protect,
  authorize("student"),
  getMyApplications
);

// Admin - View All Applications
router.get(
  "/",
  protect,
  authorize("admin"),
  getAllApplications
);

// Admin - Update Application Status
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateApplicationStatus
);

// Admin - Delete Application
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteApplication
);

module.exports = router;