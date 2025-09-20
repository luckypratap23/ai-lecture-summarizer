const express = require("express");
const router = express.Router();
const { summarizeText } = require("../utils/geminiClient");

router.post("/", async (req, res) => {
  try {
    const { transcript } = req.body;
    if (!transcript) return res.status(400).json({ error: "Transcript required" });

    const summary = await summarizeText(transcript);
    res.json({ summary });
  } catch (err) {
    console.error("Gemini summarization error:", err);
    res.status(500).json({ error: "Summarization failed", details: err.message });
  }
});

module.exports = router;
