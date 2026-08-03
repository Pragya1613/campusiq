const ai = require("../config/gemini");

const MODEL_NAME = process.env.GEMINI_MODEL;

const generateContent = async (prompt) => {
  try {

    const response = await ai.models.generateContent({

      model: MODEL_NAME,

      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],

      config: {
        temperature: 0.1,
        responseMimeType: "application/json",
      },

    });

    return response.text;

  } catch (error) {

    console.error("Gemini Error:");
    console.dir(error, { depth: null });

    throw error;

  }
};

module.exports = {
  generateContent,
};