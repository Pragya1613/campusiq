const express = require("express");

const router = express.Router();

const { extractProfile } = require("../controllers/ai.controller");

// Existing resume upload middleware
const upload = require("../middleware/upload.js");

// Extract profile from uploaded resume
router.post(
  "/extract-profile",
  upload.single("resume"),
  extractProfile
);

module.exports = router;