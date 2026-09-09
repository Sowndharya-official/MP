import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyzeSecurity = async ({ html, css, js }) => {
  const prompt = `
You are an expert application security analyst.

Analyze the following website code for cybersecurity risks
and deployment readiness.

Return ONLY valid JSON in this format:

{
  "overallRating": "Secure",
  "securityScore": 0,
  "technologySummary": [],
  "dataSecurity": {
    "status": "",
    "details": ""
  },
  "findings": [
    {
      "severity": "Critical",
      "category": "",
      "title": "",
      "description": "",
      "recommendation": ""
    }
  ],
  "securityChecks": {
    "secretsExposure": "",
    "xss": "",
    "unsafeJavaScript": "",
    "inputValidation": "",
    "dataStorage": "",
    "externalResources": "",
    "authentication": "",
    "authorization": "",
    "privacy": "",
    "securityHeaders": "",
    "https": ""
  },
  "deploymentReadiness": {
    "ready": true,
    "reason": ""
  },
  "summary": ""
}

Analyze ONLY what is actually present in the code.

Check for:

1. API keys
2. Passwords
3. Tokens
4. Secrets
5. Personally identifiable information
6. XSS risks
7. unsafe DOM manipulation
8. eval()
9. Function()
10. unsafe JavaScript
11. input validation
12. localStorage/sessionStorage
13. cookies
14. external scripts
15. third-party resources
16. insecure HTTP resources
17. exposed configuration
18. authentication
19. authorization
20. data transmission
21. privacy risks
22. security headers
23. HTTPS
24. CDN/dependency risks
25. deployment configuration
26. other relevant OWASP-style risks

Important:
A static frontend cannot prove that server-side security exists.
Clearly identify what can and cannot be verified from these files.

HTML:
${html}

CSS:
${css}

JavaScript:
${js}
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
    throw new Error("Security analysis returned an empty response.");
  }

  return JSON.parse(text);
};