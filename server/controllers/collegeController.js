const College = require("../models/College");

const createCollege = async (req, res) => {
  try {
    const college = await College.create(req.body);

    res.status(201).json({
      message: "College created successfully",
      college,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find();

    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(
      req.params.id
    );

    if (!college) {
      return res.status(404).json({
        message: "College not found",
      });
    }

    res.status(200).json(college);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCollege = async (req, res) => {
  try {

    const college = await College.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!college) {
      return res.status(404).json({
        message: "College not found",
      });
    }

    res.status(200).json({
      message: "College updated successfully",
      college,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCollege = async (req, res) => {
  try {

    const college = await College.findByIdAndDelete(
      req.params.id
    );

    if (!college) {
      return res.status(404).json({
        message: "College not found",
      });
    }

    res.status(200).json({
      message: "College deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCollege,
  getAllColleges,
  getCollegeById,
  updateCollege,
  deleteCollege,
};