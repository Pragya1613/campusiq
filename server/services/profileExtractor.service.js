const { generateContent } = require("./gemini.service");
const {
  PROFILE_EXTRACTION_PROMPT,
} = require("../utils/promptTemplates");

const extractProfileFromResume = async (resumeText) => {
  try {
    if (!resumeText || !resumeText.trim()) {
      throw new Error("Resume text is required.");
    }

    const prompt = `
${PROFILE_EXTRACTION_PROMPT}

Resume:

${resumeText}
`;

    const response = await generateContent(prompt);

    let parsedData;

    try {
      const cleanedResponse = response
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
            
        parsedData = JSON.parse(cleanedResponse);

    } catch (error) {
      throw new Error("Failed to parse AI response into JSON.");
    }

    return parsedData;
  } catch (error) {
    console.error("Profile Extraction Error:", error);

    throw error;
  }
};

module.exports = {
  extractProfileFromResume,
};