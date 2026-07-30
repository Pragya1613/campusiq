const mongoose = require("mongoose");

const InterviewComment = require("../models/InterviewComment");
const InterviewExperience = require("../models/InterviewExperience");
const Student = require("../models/Student");

const asyncHandler = require("../middleware/asyncHandler");

const addComment = asyncHandler(async (req, res) => {
  const { experienceId, text, parentComment } = req.body;

  if (!mongoose.Types.ObjectId.isValid(experienceId)) {
    return res.status(400).json({
      message: "Invalid Interview Experience ID",
    });
  }

  if (!text || !text.trim()) {
    return res.status(400).json({
      message: "Comment cannot be empty.",
    });
  }

  const experience = await InterviewExperience.findById(
    experienceId
  ).select("_id");

  if (!experience) {
    return res.status(404).json({
      message: "Interview Experience not found.",
    });
  }

  const student = await Student.findById(req.user.id).select("_id");

  if (!student) {
    return res.status(404).json({
      message: "Student not found.",
    });
  }

  const comment = await InterviewComment.create({
    experienceId,
    studentId: student._id,
    text: text.trim(),
    parentComment: parentComment || null,
  });

  await InterviewExperience.findByIdAndUpdate(experienceId, {
    $inc: {
      commentCount: 1,
    },
  });

  res.status(201).json({
    message: "Comment added successfully.",
    comment,
  });
});

const getComments = asyncHandler(async (req, res) => {
  const { experienceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(experienceId)) {
    return res.status(400).json({
      message: "Invalid Interview Experience ID",
    });
  }

  const comments = await InterviewComment.find({
    experienceId,
    parentComment: null,
  })
    .populate({
      path: "studentId",
      select: "name profilePicture",
    })
    .sort({ createdAt: -1 })
    .lean();



  const formattedComments = await Promise.all(
    comments.map(async (comment) => {
      const replyCount = await InterviewComment.countDocuments({
        parentComment: comment._id,
      });
    
      return {
        ...comment,
        student: comment.studentId,
        studentId: undefined,
        replyCount,
        isOwner:
          req.user &&
          comment.studentId?._id?.toString() === req.user.id,
        liked:
          req.user &&
          comment.likes.some(
            (id) => id.toString() === req.user.id
          ),
      };
    })
  );

    

  res.status(200).json({
    comments: formattedComments,
  });
});

const replyToComment = asyncHandler(async (req, res) => {

  const { commentId } = req.params;
  const { text } = req.body;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({
      message: "Invalid Comment ID",
    });
  }

  if (!text || !text.trim()) {
    return res.status(400).json({
      message: "Reply cannot be empty.",
    });
  }

  const parentComment = await InterviewComment.findById(commentId)
    .select("experienceId");

  if (!parentComment) {
    return res.status(404).json({
      message: "Comment not found.",
    });
  }

  const student = await Student.findById(req.user.id)
    .select("_id");

  const reply = await InterviewComment.create({
    experienceId: parentComment.experienceId,
    studentId: student._id,
    text: text.trim(),
    parentComment: commentId,
  });

  await InterviewExperience.findByIdAndUpdate(
    parentComment.experienceId,
    {
      $inc: {
        commentCount: 1,
      },
    }
  );

  res.status(201).json({
    message: "Reply added successfully.",
    reply,
  });

});


const getReplies = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({
      message: "Invalid Comment ID",
    });
  }

  const replies = await InterviewComment.find({
    parentComment: commentId,
  })
    .populate({
      path: "studentId",
      select: "name profilePicture",
    })
    .sort({ createdAt: 1 })
    .lean();


    const formattedReplies = replies.map((reply) => ({
      ...reply,
      student: reply.studentId,
      studentId: undefined,
      isOwner:
        req.user &&
        reply.studentId?._id?.toString() === req.user.id,
    }));


  res.status(200).json({
    replies: formattedReplies,
  });
});


const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({
      message: "Invalid Comment ID",
    });
  }

  const comment = await InterviewComment.findById(commentId);

  if (!comment) {
    return res.status(404).json({
      message: "Comment not found.",
    });
  }

  const studentId = req.user.id;

  const alreadyLiked = comment.likes.some(
    (id) => id.toString() === studentId
  );

  if (alreadyLiked) {
    comment.likes = comment.likes.filter(
      (id) => id.toString() !== studentId
    );

    comment.likeCount -= 1;
  } else {
    comment.likes.push(studentId);
    comment.likeCount += 1;
  }

  await comment.save();

  res.status(200).json({
    message: alreadyLiked
      ? "Comment unliked successfully."
      : "Comment liked successfully.",
    likeCount: comment.likeCount,
    liked: !alreadyLiked,
  });
});


const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({
      message: "Invalid Comment ID",
    });
  }

  const comment = await InterviewComment.findById(commentId);

  if (!comment) {
    return res.status(404).json({
      message: "Comment not found.",
    });
  }

  // Only comment owner can delete
  if (comment.studentId.toString() !== req.user.id) {
    return res.status(403).json({
      message: "You are not authorized to delete this comment.",
    });
  }

  // Count replies
  const replyCount = await InterviewComment.countDocuments({
    parentComment: commentId,
  });

  // Delete replies
  await InterviewComment.deleteMany({
    parentComment: commentId,
  });

  // Delete comment
  await comment.deleteOne();

  // Update comment count
  await InterviewExperience.findByIdAndUpdate(
    comment.experienceId,
    {
      $inc: {
        commentCount: -(replyCount + 1),
      },
    }
  );

  res.status(200).json({
    message: "Comment deleted successfully.",
  });
});


module.exports = {
  addComment,
  getComments,
  replyToComment,
  getReplies,
  toggleCommentLike,
  deleteComment,
};