const Student = require("../models/Student");
const { parseResume } = require("../services/resumeParser.service");

const {
  extractProfileFromResume,
} = require("../services/profileExtractor.service");

const {
  analyzeProfile,
} = require("../services/placementAnalyzer.service");

// ==========================================
// Extract Profile From Resume
// ==========================================

const extractProfile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume.",
      });
    }

    const resumeText = await parseResume(req.file);

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "Could not extract resume text.",
      });
    }

    const extractedProfile =
      await extractProfileFromResume(resumeText);

    return res.status(200).json({
      success: true,
      message: "Profile extracted successfully.",
      data: extractedProfile,
    });

  } catch (error) {

    console.error("Extract Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



const extractExistingProfile = async (req, res) => {
  try {

    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    if (!student.resumeUrl) {
      return res.status(400).json({
        success: false,
        message: "No resume uploaded.",
      });
    }

    // ====================================
    // Download Resume from Cloudinary
    // ====================================

    const response = await fetch(student.resumeUrl);

    if (!response.ok) {
      throw new Error("Failed to download resume.");
    }

    const arrayBuffer = await response.arrayBuffer();

    const file = {
      buffer: Buffer.from(arrayBuffer),
      mimetype: "application/pdf",
    };

    // ====================================
    // Parse Resume
    // ====================================

    const resumeText = await parseResume(file);

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from resume.",
      });
    }

    // ====================================
    // Extract Profile using Gemini
    // ====================================

    const extractedProfile =
      await extractProfileFromResume(resumeText);

    return res.status(200).json({
      success: true,
      message: "Profile extracted successfully.",
      data: extractedProfile,
    });

  } catch (error) {

    console.error(
      "Extract Existing Profile Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// ==========================================
// Analyze Extracted Profile
// ==========================================

const analyzeStudentProfile = async (req, res) => {
  try {

    const { profile } = req.body;

    if (!profile) {
      return res.status(400).json({
        success: false,
        message: "Profile data is required.",
      });
    }

    const analysis =
      await analyzeProfile(profile);

    return res.status(200).json({
      success: true,
      message: "Profile analyzed successfully.",
      data: analysis,
    });

  } catch (error) {

    console.error("Analyze Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



const AIScan = require("../models/AIScan");

const saveAIScan = async (req, res) => {
  try {

    const studentId = req.user.id;

    const student = await Student.findById(studentId);

    const {

      extractedProfile,

      resumeScore,

      placementReadiness,

      strengths,

      weaknesses,

      missingSkills,

      suggestions,

      companyMatches,

      careerRoadmap,

    } = req.body;

    const aiScan = await AIScan.create({

      student: studentId,

      resumeName: student.resumeName,

      extractedProfile,

      resumeScore,

      placementReadiness,

      strengths,

      weaknesses,

      missingSkills,

      suggestions,

      companyMatches,

      careerRoadmap,

    });

    return res.status(201).json({

      success: true,

      message: "AI Scan saved successfully.",

      data: aiScan,

    });

  }

  catch (error) {

    console.error(
      "Save AI Scan Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};



  const getAIScanHistory = async (req, res) => {
  
    try {
    
      const studentId = req.user.id;
    
      const scans = await AIScan.find({
      
        student: studentId,
      
      })
    
      .sort({ createdAt: 1 });
    
      return res.status(200).json({
      
        success: true,
      
        data: scans,
      
      });
    
    }
  
    catch (error) {
    
      console.error(
        "Get AI Scan History Error:",
        error
      );
    
      return res.status(500).json({
      
        success: false,
      
        message: error.message,
      
      });
    
    }
  
  };



  const getAIScanById = async (req, res) => {

  try {

    const scan = await AIScan.findOne({

      _id: req.params.id,

      student: req.user.id,

    });

    if (!scan) {

      return res.status(404).json({

        success: false,

        message: "AI Scan not found.",

      });

    }

    return res.status(200).json({

      success: true,

      data: scan,

    });

  }

  catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};




const deleteAIScan = async (req, res) => {

  try {

    const scan = await AIScan.findOne({

      _id: req.params.id,

      student: req.user.id,

    });

    if (!scan) {

      return res.status(404).json({

        success: false,

        message: "AI Scan not found.",

      });

    }

    await scan.deleteOne();

    return res.status(200).json({

      success: true,

      message: "AI Scan deleted successfully.",

    });

  }

  catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};


module.exports = {
  extractProfile,
  extractExistingProfile,
  analyzeStudentProfile,
  saveAIScan,
  getAIScanHistory,
  getAIScanById,
  deleteAIScan,
};
  