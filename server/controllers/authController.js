const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Student
const registerStudent = async (req, res) => {
  try {

    const {
      fullName,
      email,
      password,
      enrollmentNumber,
      branch,
      role,
    } = req.body;

    const existingStudent =
      await Student.findOne({
        email,
      });

    if (existingStudent) {
      return res.status(400).json({
        message:
          "Student already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

const student = await Student.create({
  fullName,
  email,
  password: hashedPassword,

  role: role || "student",

  enrollmentNumber:
    role === "student"
      ? enrollmentNumber
      : undefined,

  branch:
    role === "student"
      ? branch
      : undefined,
});
    const studentData =
      student.toObject();

    delete studentData.password;

    res.status(201).json({
      message:
        "Registration Successful",
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

    const token = jwt.sign(
    {
      id: student._id,
      email: student.email,
      role: student.role,
    },
    process.env.JWT_SECRET,
    {
    expiresIn: "7d",
    }
    );

   res.status(200).json({
    message: "Login successful",
    token,
    student: studentData,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCurrentStudent = async (req, res) => {
  try {

    const student = await Student.findById(
      req.user.id
    ).select("-password");

    res.status(200).json(student);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    student.phone =
      req.body.phone ?? student.phone;

    student.cgpa =
      req.body.cgpa ?? student.cgpa;

    student.currentSemester =
      req.body.currentSemester ??
      student.currentSemester;

    student.skills =
      req.body.skills ?? student.skills;

    student.resumeUrl =
      req.body.resumeUrl ??
      student.resumeUrl;

    student.profilePhoto =
      req.body.profilePhoto ??
      student.profilePhoto;

    student.sessionStart =
      req.body.sessionStart ??
      student.sessionStart;

    student.sessionEnd =
      req.body.sessionEnd ??
      student.sessionEnd;

    student.passingYear =
      req.body.passingYear ??
      student.passingYear;

    student.currentBacklogs =
      req.body.currentBacklogs ??
      student.currentBacklogs;

    student.targetRole =
      req.body.targetRole ??
      student.targetRole;

    student.linkedinUrl =
      req.body.linkedinUrl ??
      student.linkedinUrl;

    student.githubUrl =
      req.body.githubUrl ??
      student.githubUrl;

    student.leetcodeUrl =
      req.body.leetcodeUrl ??
      student.leetcodeUrl;

    student.certifications =
      req.body.certifications ??
      student.certifications;

    student.internships =
      req.body.internships ??
      student.internships;

    student.projects =
      req.body.projects ??
      student.projects;

    student.profileCompleted = true;

    const updatedStudent =
      await student.save();

    const studentData =
      updatedStudent.toObject();

    delete studentData.password;

    res.status(200).json({
      message: "Profile updated successfully",
      student: studentData,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const studentData = student.toObject();
    delete studentData.password;

    res.status(200).json(studentData);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  getCurrentStudent,
  updateProfile,
  getProfile,
};