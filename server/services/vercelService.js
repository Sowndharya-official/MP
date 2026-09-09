import dotenv from "dotenv";

dotenv.config();

const VERCEL_API = "https://api.vercel.com";

export const deployToVercel = async (files) => {
  const token = process.env.VERCEL_TOKEN;

  if (!token) {
    throw new Error("VERCEL_TOKEN is missing from .env");
  }

  if (
    !files ||
    !files["index.html"] ||
    !files["style.css"] ||
    !files["script.js"]
  ) {
    throw new Error("Generated website files are missing.");
  }

  const filesToDeploy = [
    {
      file: "index.html",
      data: files["index.html"],
    },
    {
      file: "style.css",
      data: files["style.css"],
    },
    {
      file: "script.js",
      data: files["script.js"],
    },
  ];

  const response = await fetch(
    `${VERCEL_API}/v13/deployments`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: "ai-generated-website",

        files: filesToDeploy,

        projectSettings: {
          framework: null,
        },
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Vercel API error:", data);

    throw new Error(
      data.error?.message ||
        "Vercel deployment failed."
    );
  }

  return {
    success: true,
    deploymentId: data.id,
    url: data.url
      ? `https://${data.url}`
      : null,
  };
};