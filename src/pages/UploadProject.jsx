import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import UploadCard from "../components/UploadCard";
import ProgressBar from "../components/ProgressBar";
import API from "../services/api";

const UploadProject = () => {
  const navigate = useNavigate();

  // ================================
  // ZIP UPLOAD STATES
  // ================================

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // ================================
  // GITHUB STATES
  // ================================

  const [repoUrl, setRepoUrl] = useState("");
  const [branch, setBranch] = useState("main");
  const [githubMessage, setGithubMessage] = useState("");
  const [githubLoading, setGithubLoading] = useState(false);

  // ================================
  // ZIP UPLOAD
  // ================================

  const uploadFile = async () => {
    if (!file) {
      setMessage("Please choose a ZIP file.");
      return;
    }

    setProgress(0);
    setMessage("");
    setUploading(true);

    const formData = new FormData();
    formData.append("project", file);

    try {
      setMessage("Uploading project...");

      const response = await API.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          onUploadProgress: (event) => {
            if (event.total) {
              const percent = Math.round(
                (event.loaded * 100) / event.total
              );

              setProgress(percent);
            }
          },
        }
      );

      console.log(
        "================================"
      );

      console.log(
        "UPLOAD RESPONSE:"
      );

      console.log(
        response.data
      );

      console.log(
        "ANALYSIS:"
      );

      console.log(
        response.data.analysis
      );

      console.log(
        "================================"
      );

      // ========================================
      // SUCCESS
      // ========================================

      if (response.data.success) {
        setProgress(100);

        setMessage(
          "✓ Project uploaded and AI analysis completed!"
        );

        /*
         * IMPORTANT
         *
         * Save the analysis in sessionStorage.
         *
         * This allows the Analysis page to
         * receive the Gemini result.
         */

        const analysisData = {
          analysis: response.data.analysis,
          files: response.data.files || [],
          projectPath:
            response.data.projectPath || "",
        };

        sessionStorage.setItem(
          "projectAnalysis",
          JSON.stringify(analysisData)
        );

        console.log(
          "Analysis saved to sessionStorage"
        );

        // ========================================
        // REDIRECT TO ANALYSIS PAGE
        // ========================================

        setTimeout(() => {
          navigate("/analysis");
        }, 500);

      } else {
        setMessage(
          response.data.message ||
            "Upload failed."
        );
      }

    } catch (error) {
      console.error(
        "Upload Error:",
        error
      );

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Upload Failed";

      setMessage(
        `❌ ${errorMessage}`
      );

    } finally {
      setUploading(false);
    }
  };

  // ================================
  // GITHUB REPOSITORY
  // ================================

  const connectGithubRepo = async () => {
    if (!repoUrl.trim()) {
      setGithubMessage(
        "Please enter a GitHub Repository URL."
      );
      return;
    }

    setGithubMessage("");
    setGithubLoading(true);

    try {
      const response = await API.post(
        "/github",
        {
          repoUrl: repoUrl.trim(),
          branch: branch.trim() || "main",
        }
      );

      console.log(
        "GitHub Response:",
        response.data
      );

      if (response.data.success) {
        setGithubMessage(
          `✓ ${response.data.message}`
        );
      } else {
        setGithubMessage(
          response.data.message ||
            "GitHub connection failed."
        );
      }

    } catch (error) {
      console.error(
        "GitHub Error:",
        error
      );

      setGithubMessage(
        error.response?.data?.message ||
          "❌ GitHub Connection Failed"
      );

    } finally {
      setGithubLoading(false);
    }
  };

  // ================================
  // PAGE UI
  // ================================

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >

        {/* HEADER */}

        <h1
          style={{
            fontSize: "32px",
            marginBottom: "10px",
          }}
        >
          🚀 New Deployment
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "16px",
            marginBottom: "30px",
          }}
        >
          Upload your React, Node.js or Full Stack
          project to begin deployment and AI analysis.
        </p>

        {/* ZIP UPLOAD */}

        <UploadCard
          file={file}
          setFile={setFile}
          uploadFile={uploadFile}
          uploading={uploading}
        />

        {/* PROGRESS */}

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <ProgressBar
            progress={progress}
          />
        </div>

        {/* STATUS */}

        {message && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              borderRadius: "8px",
              background: "#1e293b",
              color: message.startsWith("❌")
                ? "#f87171"
                : "#4ade80",
            }}
          >
            {message}
          </div>
        )}

        {/* AI PROCESSING */}

        {uploading && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#172554",
              borderRadius: "8px",
              color: "#93c5fd",
            }}
          >
            🤖 AI Agent is reading your project
            files...
          </div>
        )}

        {/* DIVIDER */}

        <div
          style={{
            marginTop: "60px",
            marginBottom: "40px",
            textAlign: "center",
            color: "#64748b",
          }}
        >
          <h2>
            ──────────── OR ────────────
          </h2>
        </div>

        {/* GITHUB */}

        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "12px",
            width: "100%",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          <h2>
            🐙 Deploy from GitHub
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginBottom: "20px",
            }}
          >
            Enter your GitHub repository URL and
            branch name.
          </p>

          <input
            type="text"
            placeholder="https://github.com/username/project"
            value={repoUrl}
            onChange={(e) =>
              setRepoUrl(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="text"
            placeholder="Branch Name"
            value={branch}
            onChange={(e) =>
              setBranch(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "15px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <button
            onClick={connectGithubRepo}
            disabled={githubLoading}
            style={{
              marginTop: "20px",
              background: githubLoading
                ? "#475569"
                : "#24292e",
              color: "white",
              padding: "12px 25px",
              border: "none",
              borderRadius: "8px",
              cursor: githubLoading
                ? "not-allowed"
                : "pointer",
              fontSize: "16px",
            }}
          >
            {githubLoading
              ? "Connecting..."
              : "Connect Repository"}
          </button>

          {githubMessage && (
            <div
              style={{
                marginTop: "20px",
                padding: "12px",
                borderRadius: "8px",
                background: "#0f172a",
                color:
                  githubMessage.startsWith("❌")
                    ? "#f87171"
                    : "#4ade80",
              }}
            >
              {githubMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadProject;