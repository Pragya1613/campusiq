const mongoose = require("mongoose");

const interviewExperienceSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    roleApplied: {
      type: String,
      required: true,
      trim: true,
    },

    package: {
        type: String,
        trim: true,
    },
    
    experience: {
      type: String,
      required: true,
    },

    interviewProcess: {
      type: String,
      required: true,
    },

    tips: {
      type: String,
      default: "",
    },

    anonymous: {
      type: Boolean,
      default: false,
    },

    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    upvoteCount: {
      type: Number,
      default: 0,
    },

    commentCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "InterviewExperience",
  interviewExperienceSchema
);