const express = require("express");

const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  registerStudent,
  loginStudent,
  getCurrentStudent,
  updateProfile,
  getProfile,
} = require("../controllers/authController");

router.post("/register", registerStudent);

router.post("/login", loginStudent);
router.get("/me", protect, getCurrentStudent);
router.put("/profile", protect, updateProfile);
router.get("/profile", protect, getProfile);

module.exports = router;