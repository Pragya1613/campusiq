const { generateContent } = require("./gemini.service");
const {
  PROFILE_EXTRACTION_PROMPT,
} = require("../prompts/profileExtraction.prompt");

const extractProfileFromResume = async (resumeText) => {
  try {
    if (!resumeText || !resumeText.trim()) {
      throw new Error("Resume text is empty.");
    }

    const prompt = `
${PROFILE_EXTRACTION_PROMPT}

Resume:

${resumeText}
`;

    const response = await generateContent(prompt);

    if (!response || !response.trim()) {
      throw new Error("No response received from Gemini.");
    }

    console.log("\n========== GEMINI RAW RESPONSE ==========\n");
    console.log(response);
    console.log("\n=========================================\n");

    // Remove markdown if Gemini returns ```json ... ```
    let cleanedResponse = response
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Extract only JSON object if Gemini adds extra text
    const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      console.error("No JSON object found.");
      console.error(cleanedResponse);

      throw new Error("Gemini did not return valid JSON.");
    }

    cleanedResponse = jsonMatch[0];

    let parsedData;

    try {
      parsedData = JSON.parse(cleanedResponse);
    } catch (error) {
      console.error("\n========== INVALID JSON ==========\n");
      console.error(cleanedResponse);
      console.error("\n==================================\n");

      throw new Error("Gemini returned invalid JSON.");
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