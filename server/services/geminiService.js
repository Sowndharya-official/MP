import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing from .env");
}

const ai = new GoogleGenAI({
  apiKey: apiKey,
});

export const generateWebsite = async (userPrompt) => {
  const prompt = `
You are an expert web developer and UI/UX designer.

Create a complete responsive webpage based on the user's requirement.

Return ONLY valid JSON in exactly this format:

{
  "files": {
    "index.html": "...",
    "style.css": "...",
    "script.js": "..."
  }
}

Rules:

1. Generate complete working HTML.
2. Generate separate CSS.
3. Generate separate JavaScript.
4. Link style.css correctly from index.html.
5. Link script.js correctly from index.html.
6. Do not use Markdown code fences.
7. Do not include explanations outside the JSON.
8. Make the webpage responsive.
9. Use modern UI/UX design.
10. Do not include API keys, passwords, tokens or secrets.
11. Use only HTML, CSS and JavaScript.
12. Make sure the generated code is valid.

User requirement:

${userPrompt}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  const result = JSON.parse(text);

  if (
    !result.files ||
    !result.files["index.html"] ||
    !result.files["style.css"] ||
    !result.files["script.js"]
  ) {
    throw new Error("Gemini returned an invalid website structure.");
  }

  return result.files;
};