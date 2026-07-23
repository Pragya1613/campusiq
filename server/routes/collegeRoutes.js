const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const {
  createCollege,
  getAllColleges,
  getCollegeById,
  updateCollege,
  deleteCollege,
} = require("../controllers/collegeController");

// Create College (Admin)
router.post(
  "/",
  protect,
  authorize("admin"),
  createCollege
);

// Get All Colleges (Student & Admin)
router.get(
  "/",
  protect,
  authorize("student", "admin"),
  getAllColleges
);

// Get College By Id (Student & Admin)
router.get(
  "/:id",
  protect,
  authorize("student", "admin"),
  getCollegeById
);

// Update College (Admin)
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateCollege
);

// Delete College (Admin)
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteCollege
);

module.exports = router;