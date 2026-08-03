const mongoose = require("mongoose");

const aiScanSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },

    resumeName: {
      type: String,
      default: "",
    },

    extractedProfile: {
      fullName: {
        type: String,
        default: "",
      },

      email: {
        type: String,
        default: "",
      },

      phone: {
        type: String,
        default: "",
      },

      branch: {
        type: String,
        default: "",
      },

      passingYear: {
        type: String,
        default: "",
      },

      cgpa: {
        type: String,
        default: "",
      },

      githubUrl: {
        type: String,
        default: "",
      },

      linkedinUrl: {
        type: String,
        default: "",
      },

      leetcodeUrl: {
        type: String,
        default: "",
      },

      portfolioUrl: {
        type: String,
        default: "",
      },

      skills: {
        type: [String],
        default: [],
      },

      projects: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
      },

      internships: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
      },

      certifications: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
      },

      achievements: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
      },

      positionsOfResponsibility: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
      },
    },

    resumeScore: {
      score: {
        type: Number,
        default: 0,
      },

      level: {
        type: String,
        default: "Needs Improvement",
      },
    },

    placementReadiness: {
      score: {
        type: Number,
        default: 0,
      },

      level: {
        type: String,
        default: "Beginner",
      },
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    suggestions: {
      type: [String],
      default: [],
    },

    companyMatches: [
      {
        company: {
          type: String,
          default: "",
        },

        match: {
          type: Number,
          default: 0,
        },

        reason: {
          type: String,
          default: "",
        },
      },
    ],

    careerRoadmap: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AIScan", aiScanSchema);