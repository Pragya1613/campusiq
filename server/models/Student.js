const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    enrollmentNumber: {
      type: String,
      required: true,
      unique: true,
    },

    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
    },

    profilePhoto: {
      type: String,
    },

    branch: {
      type: String,
      required: true,
    },

    sessionStart: {
      type: Number,
    },

    sessionEnd: {
      type: Number,
    },

    passingYear: {
      type: Number,
    },

    currentSemester: {
      type: Number,
      min:1,
      max:8,
    },

    cgpa: {
      type: Number,
      min:0,
      max:10,
    },

    currentBacklogs: {
      type: Number,
      default: 0,
    },

    targetRole: {
      type: String,
    },

    phone: {
      type: String,
    },

    linkedinUrl: {
      type: String,
    },

    githubUrl: {
      type: String,
    },

    leetcodeUrl: {
      type: String,
    },

    skills: [String],

    certifications: [
      {
        title: String,
        issuer: String,
        date: Date,
      },
    ],

    internships: [
      {
        company: String,
        role: String,
        duration: String,
      },
    ],

    projects: [
      {
        title: String,
        description: String,
        technologies: [String],
      },
    ],

    resumeUrl: {
      type: String,
    },

    resumeName: {
      type: String,
      default: "",
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);