const Student = require("../models/Student");
const bcrypt = require("bcryptjs");

// Register Student
const registerStudent = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      enrollmentNumber,
      branch,
    } = req.body;

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      fullName,
      email,
      password: hashedPassword,
      enrollmentNumber,
      branch,
    });

    const studentData = student.toObject();
    delete studentData.password;

    res.status(201).json({
      message: "Student registered successfully",
      student: studentData,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Login Student
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      student.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const studentData = student.toObject();
    delete studentData.password;

    res.status(200).json({
      message: "Login successful",
      student: studentData,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
};