const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// File filter function to validate file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/wave',
    'audio/mp4', 'audio/m4a', 'audio/aac', 'audio/ogg',
    'audio/webm', 'audio/flac', 'video/mp4', 'video/webm',
    'video/quicktime', 'video/x-msvideo'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not supported. Allowed types: ${allowedTypes.join(', ')}`), false);
  }
};

// Multer configuration with file size limit and validation
const upload = multer({
  dest: "uploads/",
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  }
});

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_KEY);

// POST /api/transcribe
router.post("/", upload.single("file"), async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded",
        details: "Please select a valid audio or video file"
      });
    }

    console.log(`Processing file: ${req.file.originalname}, Size: ${req.file.size} bytes, Type: ${req.file.mimetype}`);

    const filePath = req.file.path;
    const fileData = fs.readFileSync(filePath);
    const base64Audio = fileData.toString("base64");

    // Check if GEMINI_API_KEY is available
    if (!GEMINI_KEY) {
      fs.unlinkSync(filePath); // Clean up uploaded file
      return res.status(500).json({
        error: "Server configuration error",
        details: "GEMINI_API_KEY environment variable is not set"
      });
    }

    // Use Gemini to transcribe
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: req.file.mimetype, // Use actual file MIME type
          data: base64Audio,
        },
      },
      { text: "Please transcribe this audio clearly into text." },
    ]);

    fs.unlinkSync(filePath);

    const transcript = result.response.text();
    console.log(`Transcription completed for file: ${req.file.originalname}`);
    res.json({ transcript });
  } catch (err) {
    console.error("Gemini transcription error:", err);

    // Clean up uploaded file if it exists
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupErr) {
        console.error("Error cleaning up file:", cleanupErr);
      }
    }

    // Provide more specific error messages
    if (err.message.includes('API_KEY')) {
      return res.status(500).json({
        error: "API configuration error",
        details: "Gemini API key is invalid or expired"
      });
    }

    if (err.message.includes('quota') || err.message.includes('limit')) {
      return res.status(429).json({
        error: "API quota exceeded",
        details: "Gemini API quota has been exceeded. Please try again later."
      });
    }

    res.status(500).json({
      error: "Transcription failed",
      details: err.message || "An unexpected error occurred during transcription"
    });
  }
});

module.exports = router;
