const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_KEY);

// Summarization
async function summarizeText(transcript) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are an assistant that converts lecture transcripts into study resources.
You MUST return ONLY valid JSON with this exact structure:
{
  "summary": "3–5 sentence summary of the lecture",
  "key_points": ["point 1", "point 2", "point 3", "point 4", "point 5", "point 6"],
  "flashcards": [
    {"question": "Question 1?", "answer": "Answer 1"},
    {"question": "Question 2?", "answer": "Answer 2"},
    {"question": "Question 3?", "answer": "Answer 3"},
    {"question": "Question 4?", "answer": "Answer 4"},
    {"question": "Question 5?", "answer": "Answer 5"}
  ],
  "slides": ["slide point 1", "slide point 2", "slide point 3", "slide point 4", "slide point 5", "slide point 6"]
}

Rules:
- Return ONLY the JSON object, no additional text
- Ensure all arrays have the specified number of items
- Make sure the JSON is valid and parseable
- Use double quotes for all strings
- Do not include any markdown formatting

Transcript:
${transcript}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Clean the response text
  let cleanText = text.trim();

  // Remove markdown code blocks if present
  if (cleanText.startsWith('```json')) {
    cleanText = cleanText.replace(/```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleanText.startsWith('```')) {
    cleanText = cleanText.replace(/```\s*/, '').replace(/\s*```$/, '');
  }

  // Remove any leading/trailing non-JSON text
  const jsonStart = cleanText.indexOf('{');
  const jsonEnd = cleanText.lastIndexOf('}');
  if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
    cleanText = cleanText.substring(jsonStart, jsonEnd + 1);
  }

  try {
    const parsed = JSON.parse(cleanText);
    // Validate that we have the expected structure
    if (parsed.summary && parsed.key_points && parsed.flashcards && parsed.slides) {
      return parsed;
    } else {
      throw new Error('Missing required JSON keys');
    }
  } catch (error) {
    console.error('JSON parsing failed:', error);
    console.error('Raw response:', text);
    console.error('Cleaned response:', cleanText);

    // Fallback: try to extract summary from raw text
    return {
      summary: cleanText.substring(0, 500) + (cleanText.length > 500 ? '...' : ''),
      key_points: ['Summary extraction failed - please try again'],
      flashcards: [{question: 'Error', answer: 'Could not process transcript'}],
      slides: ['Processing failed']
    };
  }
}

module.exports = { summarizeText };