import React, { useState } from "react";
import API from "../services/api";

const Deploy = () => {
  const [deploying, setDeploying] = useState(false);
  const [deploymentUrl, setDeploymentUrl] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleDeploy = async () => {
    setDeploying(true);
    setMessage("🚀 Starting deployment...");
    setError("");
    setDeploymentUrl("");

    try {
      console.log("🚀 Sending deployment request...");

      const response = await API.post("/deploy");

      console.log("Vercel response:", response.data);

      if (response.data.success) {
        setMessage("✅ Project deployed successfully!");

        const url = response.data.deployment?.url;

        if (url) {
          setDeploymentUrl(url);
        } else {
          setMessage(
            "✅ Deployment completed, but Vercel did not return a URL."
          );
        }
      } else {
        setError(
          response.data.message || "Deployment failed."
        );
        setMessage("");
      }
    } catch (err) {
      console.error("❌ Deployment error:", err);

      setMessage("");

      setError(
        err.response?.data?.message ||
          err.message ||
          "Deployment failed."
      );
    } finally {
      setDeploying(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "50px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            marginBottom: "10px",
          }}
        >
          🚀 Deploy to Vercel
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "35px",
          }}
        >
          Your project has passed the AI analysis.
          You can now deploy it to Vercel.
        </p>

        {/* Deployment Card */}

        <div
          style={{
            background: "#1e293b",
            padding: "35px",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >
          {!deploymentUrl && (
            <>
              <h2>
                🚀 Ready for Deployment
              </h2>

              <p
                style={{
                  color: "#94a3b8",
                  marginTop: "15px",
                }}
              >
                Click the button below to deploy
                your uploaded project.
              </p>

              <button
                onClick={handleDeploy}
                disabled={deploying}
                style={{
                  marginTop: "30px",
                  background: deploying
                    ? "#475569"
                    : "#22c55e",
                  color: "white",
                  border: "none",
                  padding: "15px 35px",
                  borderRadius: "8px",
                  cursor: deploying
                    ? "not-allowed"
                    : "pointer",
                  fontSize: "17px",
                  fontWeight: "bold",
                }}
              >
                {deploying
                  ? "⏳ Deploying..."
                  : "🚀 Deploy to Vercel"}
              </button>
            </>
          )}

          {/* Status */}

          {message && (
            <div
              style={{
                marginTop: "25px",
                padding: "15px",
                borderRadius: "8px",
                background: "#052e16",
                color: "#4ade80",
              }}
            >
              {message}
            </div>
          )}

          {/* Error */}

          {error && (
            <div
              style={{
                marginTop: "25px",
                padding: "15px",
                borderRadius: "8px",
                background: "#450a0a",
                color: "#f87171",
                textAlign: "left",
              }}
            >
              <strong>❌ Deployment Failed</strong>

              <p
                style={{
                  marginTop: "10px",
                }}
              >
                {error}
              </p>
            </div>
          )}

          {/* Deployment URL */}

          {deploymentUrl && (
            <div
              style={{
                marginTop: "30px",
                padding: "25px",
                background: "#020617",
                borderRadius: "10px",
              }}
            >
              <h2
                style={{
                  color: "#4ade80",
                }}
              >
                🎉 Deployment Successful!
              </h2>

              <p
                style={{
                  color: "#94a3b8",
                  marginTop: "10px",
                }}
              >
                Your website is now live:
              </p>

              <a
                href={deploymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "15px",
                  color: "#60a5fa",
                  fontSize: "18px",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                🌐 {deploymentUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deploy;