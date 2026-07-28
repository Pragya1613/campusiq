const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addComment,
  getComments,
  replyToComment,
  getReplies,
  toggleCommentLike,
  deleteComment,
} = require("../controllers/interviewCommentController");

router.post("/", protect, addComment);
router.get("/replies/:commentId", getReplies);
router.get("/:experienceId", getComments);
router.post("/:commentId/reply", protect, replyToComment);
router.post("/:commentId/like", protect, toggleCommentLike);
router.delete("/:commentId", protect, deleteComment);

module.exports = router;