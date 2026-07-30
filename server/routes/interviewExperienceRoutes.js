const express = require("express");

const router = express.Router();

const {
  createInterviewExperience,
  getInterviewCompanies,
  getCompanyExperiences,
  getInterviewExperienceById,
  toggleExperienceUpvote,
  updateInterviewExperience,
  deleteInterviewExperience,
} = require("../controllers/interviewExperienceController");

const  protect  = require("../middleware/authMiddleware");

router.post("/", protect, createInterviewExperience);

router.get("/companies",protect, getInterviewCompanies);

router.get("/company/:companyName", protect, getCompanyExperiences);

router.get("/:id", protect, getInterviewExperienceById);

router.put("/:id", protect, updateInterviewExperience);

router.post("/:id/upvote", protect, toggleExperienceUpvote);

router.delete("/:id", protect, deleteInterviewExperience);

module.exports = router;