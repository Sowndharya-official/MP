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

const PORT = process.env.PORT || 5000;

// =====================================================
// DASHBOARD STATISTICS
// =====================================================

const statsFile = path.join(
  process.cwd(),
  "server",
  "dashboardStats.json"
);

const getStats = () => {
  if (!fs.existsSync(statsFile)) {
    const defaultStats = {
      totalProjects: 12,
      deployments: 18,
      securityAlerts: 5,
      aiReviews: 28,
    };

    fs.writeFileSync(
      statsFile,
      JSON.stringify(defaultStats, null, 2),
      "utf8"
    );

    return defaultStats;
  }

  return JSON.parse(
    fs.readFileSync(statsFile, "utf8")
  );
};

const saveStats = (stats) => {
  fs.writeFileSync(
    statsFile,
    JSON.stringify(stats, null, 2),
    "utf8"
  );
};

app.use(cors());

app.use(express.json({ limit: "2mb" }));


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
    const { prompt } = req.body;

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

    const projectDir = path.join(
      process.cwd(),
      "server",
      "generated-project"
    );

    fs.mkdirSync(projectDir, {
      recursive: true,
    });

    // -------------------------------------------------
    // 3. Save generated files
    // -------------------------------------------------

    fs.writeFileSync(
      path.join(projectDir, "index.html"),
      files["index.html"],
      "utf8"
    );

    fs.writeFileSync(
      path.join(projectDir, "style.css"),
      files["style.css"],
      "utf8"
    );

    fs.writeFileSync(
      path.join(projectDir, "script.js"),
      files["script.js"],
      "utf8"
    );

    console.log(
      "Generated website saved to:",
      projectDir
    );

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

    console.log(
      "Starting AI security analysis..."
    );

    // -------------------------------------------------
    // 1. Locate generated project
    // -------------------------------------------------

    const projectDir = path.join(
      process.cwd(),
      "server",
      "generated-project"
    );

    // -------------------------------------------------
    // 2. Check whether generated files exist
    // -------------------------------------------------

    const htmlPath = path.join(
      projectDir,
      "index.html"
    );

    const cssPath = path.join(
      projectDir,
      "style.css"
    );

    const jsPath = path.join(
      projectDir,
      "script.js"
    );

    if (
      !fs.existsSync(htmlPath) ||
      !fs.existsSync(cssPath) ||
      !fs.existsSync(jsPath)
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Generated website files were not found. Please generate a website first.",
      });
    }

    // -------------------------------------------------
    // 3. Read generated files
    // -------------------------------------------------

    const html = fs.readFileSync(
      htmlPath,
      "utf8"
    );

    const css = fs.readFileSync(
      cssPath,
      "utf8"
    );

    const js = fs.readFileSync(
      jsPath,
      "utf8"
    );

    console.log(
      "Generated files loaded for security analysis."
    );

    // -------------------------------------------------
    // 4. Send code to security AI service
    // -------------------------------------------------

    const report = await analyzeSecurity({
      html,
      css,
      js,
    });
      // Update security alerts
const stats = getStats();

const findingsCount = Array.isArray(report.findings)
  ? report.findings.length
  : 0;

stats.securityAlerts += findingsCount;

saveStats(stats);
    console.log(
      "Security analysis completed."
    );

    // -------------------------------------------------
    // 5. Return security report
    // -------------------------------------------------

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

    const { files } = req.body;

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