const mongoose = require("mongoose");

const interviewCommentSchema = new mongoose.Schema(
  {
    experienceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewExperience",
      required: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
      maxLength: 1000,
    },

    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewComment",
      default: null,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    likeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


interviewCommentSchema.index({
  experienceId: 1,
  createdAt: -1,
});

interviewCommentSchema.index({
  parentComment: 1,
});


module.exports = mongoose.model(
  "InterviewComment",
  interviewCommentSchema
);