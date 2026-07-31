const { parseResume } = require("../services/resumeParser.service");
const {
  extractProfileFromResume,
} = require("../services/profileExtractor.service");

const extractProfile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume.",
      });
    }

    // Step 1: Extract text from resume
    const resumeText = await parseResume(req.file);

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from resume.",
      });
    }

    // Step 2: Extract structured profile using AI
    const extractedProfile = await extractProfileFromResume(resumeText);

    return res.status(200).json({
      success: true,
      message: "Profile extracted successfully.",
      data: extractedProfile,
    });
  } catch (error) {
    console.error("AI Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};

module.exports = {
  extractProfile,
};