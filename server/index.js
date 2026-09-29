import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import { generateWebsite } from "./services/geminiService.js";
import { analyzeSecurity } from "./services/securityService.js";
import { deployToVercel } from "./services/vercelService.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "2mb" }));
app.use(cors());

const PORT = process.env.PORT || 5000;

// =====================================================
// DASHBOARD STATISTICS
// =====================================================

const statsFile = path.join(
  process.cwd(),
  "server",
  "dashboardStats.json"
);

const defaultStats = {
  totalProjects: 12,
  deployments: 18,
  securityAlerts: 5,
  aiReviews: 28,
};

const getStats = () => {
  try {
    if (fs.existsSync(statsFile)) {
      return JSON.parse(
        fs.readFileSync(statsFile, "utf8")
      );
    }
  } catch (error) {
    console.error("Stats file read error:", error);
  }

  return { ...defaultStats };
};

const saveStats = () => {
  // Vercel serverless filesystem is read-only.
  // Statistics are not persisted in production.
};

// =====================================================
// HOME / HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Website Generator Backend is running",
  });
});


// =====================================================
// GENERATE WEBSITE
// =====================================================

app.post("/api/ai/generate", async (req, res) => {
  try {
    const { prompt } = req.body || {};

    // Validate prompt
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required.",
      });
    }

    console.log("Generating website for prompt:");
    console.log(prompt);

    // -------------------------------------------------
    // 1. Generate website using Gemini
    // -------------------------------------------------

    const files = await generateWebsite(prompt);

    // Update dashboard statistics
const stats = getStats();

stats.totalProjects += 1;
stats.aiReviews += 1;

saveStats(stats);

    // -------------------------------------------------
    // 2. Create generated-project directory
    // -------------------------------------------------
console.log("Generated website created successfully.");
    // -------------------------------------------------
    // 4. Send generated files to frontend
    // -------------------------------------------------

    res.json({
      success: true,
      message: "Website generated successfully.",
      files,
    });

  } catch (error) {

    console.error(
      "Gemini generation error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to generate website.",
      error: error.message,
    });
  }
});


// =====================================================
// AI SECURITY CHECK
// =====================================================

app.post("/api/ai/security-check", async (req, res) => {
  try {
    console.log("Starting AI security analysis...");

    const { files } = req.body || {};

    if (
      !files ||
      !files["index.html"] ||
      !files["style.css"] ||
      !files["script.js"]
    ) {
      return res.status(400).json({
        success: false,
        message: "Generated website files are missing.",
      });
    }

    const html = files["index.html"];
    const css = files["style.css"];
    const js = files["script.js"];

    console.log("Generated files received for security analysis.");

    const report = await analyzeSecurity({
      html,
      css,
      js,
    });

    const findingsCount = Array.isArray(report.findings)
      ? report.findings.length
      : 0;

    console.log(
      `Security analysis completed. Findings: ${findingsCount}`
    );

    res.json({
      success: true,
      message: "Security analysis completed successfully.",
      report,
    });

  } catch (error) {
    console.error(
      "Security analysis error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Security analysis failed.",
      error: error.message,
    });
  }
});
// =====================================================
// VERCEL DEPLOYMENT
// =====================================================

app.post("/api/deploy", async (req, res) => {
  try {
    console.log("Starting Vercel deployment...");

    const { files } = req.body || {};

const deployment = await deployToVercel(files);
    // Update deployment statistics
const stats = getStats();

stats.deployments += 1;

saveStats(stats);
    console.log(
      "Deployment successful:",
      deployment.url
    );

    res.json({
      success: true,
      message: "Website deployed successfully.",
      deployment,
    });

  } catch (error) {

    console.error(
      "Deployment error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Deployment failed.",
      error: error.message,
    });
  }
});

// =====================================================
// DASHBOARD STATISTICS API
// =====================================================

app.get("/api/dashboard/stats", (req, res) => {
  try {
    const stats = getStats();

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error(
      "Dashboard stats error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard statistics.",
    });
  }
});
// =====================================================
// START SERVER
// =====================================================

export default app;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(
      `AI backend running on http://localhost:${PORT}`
    );
  });
}