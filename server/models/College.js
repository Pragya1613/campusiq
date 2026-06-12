const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    code: {
      type: String,
      unique: true,
    },

    location: {
      type: String,
    },

    website: {
      type: String,
    },

    email: {
      type: String,
    },

    phone: {
      type: String,
    },

    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "College",
  collegeSchema
);