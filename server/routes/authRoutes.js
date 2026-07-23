const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  registerStudent,
  loginStudent,
  getCurrentStudent,
  getProfile,
  updateProfile,
  deleteAccount,
} = require("../controllers/authController");

// ---------- Public Routes ----------

router.post("/register", registerStudent);

router.post("/login", loginStudent);

// ---------- Protected Routes ----------

router.get("/me", protect, getCurrentStudent);

router.get("/profile", protect, getProfile);

// Update Profile + Resume Upload

router.put(
  "/profile",
  protect,
  upload.single("resume"),
  updateProfile
);

// Delete Account

router.delete(
  "/delete-account",
  protect,
  deleteAccount
);

module.exports = router;