const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const {
  getDashboardStats,
  getStudentDashboard,
} = require("../controllers/dashboardController");

// Admin Dashboard
router.get(
  "/",
  protect,
  authorize("admin"),
  getDashboardStats
);

// Student Dashboard
router.get(
  "/student",
  protect,
  authorize("student"),
  getStudentDashboard
);

module.exports = router;