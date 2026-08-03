const { generateContent } = require("./gemini.service");

const {
  PROFILE_ANALYSIS_PROMPT,
} = require("../prompts/profileAnalysis.prompt");

const analyzeProfile = async (profileData) => {
  try {
    if (!profileData) {
      throw new Error("Profile data is required.");
    }

    const prompt = `
${PROFILE_ANALYSIS_PROMPT}

Student Profile:

${JSON.stringify(profileData, null, 2)}
`;

    const response = await generateContent(prompt);

    if (!response || !response.trim()) {
      throw new Error("No response received from Gemini.");
    }

    console.log("\n========== AI ANALYSIS RESPONSE ==========\n");
    console.log(response);
    console.log("\n==========================================\n");

    let cleanedResponse = response
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
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
    console.error("Placement Analysis Error:", error);

    throw error;
  }
};

module.exports = {
  analyzeProfile,
};