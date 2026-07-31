const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const parseResume = async (file) => {
  try {
    if (!file) {
      throw new Error("Resume file is required.");
    }

    const mimeType = file.mimetype;

    // ---------------- PDF ----------------

    if (mimeType === "application/pdf") {
      const data = await pdfParse(file.buffer);

      return data.text.trim();
    }

    // ---------------- DOCX ----------------

    if (
      mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({
        buffer: file.buffer,
      });

      return result.value.trim();
    }

    throw new Error(
      "Unsupported resume format. Please upload PDF or DOCX."
    );
  } catch (error) {
    console.error("Resume Parser Error:", error);

    throw error;
  }
};

module.exports = {
  parseResume,
};