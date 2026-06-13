const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  getDashboardStats,
  getStudentDashboard,
} = require(
  "../controllers/dashboardController"
);

// Admin Dashboard
router.get(
  "/",
  getDashboardStats
);

// Student Dashboard
router.get(
  "/student",
  protect,
  getStudentDashboard
);

module.exports = router;