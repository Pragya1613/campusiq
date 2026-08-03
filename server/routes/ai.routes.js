const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");
const protect = require("../middleware/authMiddleware");

const {
  extractProfile,
  extractExistingProfile,
  analyzeStudentProfile,
  saveAIScan,
  getAIScanHistory,
  getAIScanById,
  deleteAIScan,
} = require("../controllers/ai.controller");

// ======================================
// STEP 1
// Extract Profile from Uploaded Resume
// ======================================

router.post(
  "/extract-profile",
  upload.single("resume"),
  extractProfile
);

// ======================================
// STEP 2
// Extract Profile from Already Saved Resume
// ======================================

router.post(
  "/extract-existing-profile",
  protect,
  extractExistingProfile
);

// ======================================
// STEP 3
// Analyze Extracted Profile
// ======================================

router.post(
  "/analyze-profile",
  analyzeStudentProfile
);


router.post(
  "/save-scan",
  protect,
  saveAIScan
);


router.get(
  "/history",
  protect,
  getAIScanHistory
);


router.get(
  "/:id",
  protect,
  getAIScanById
);


router.delete(
  "/:id",
  protect,
  deleteAIScan
);

module.exports = router;