const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
    },

    package: {
      type: Number,
    },

    eligibilityCgpa: {
      type: Number,
      default: 0,
    },

    requiredSkills: [
      {
        type: String,
      },
    ],

    deadline: {
      type: Date,
    },

    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);