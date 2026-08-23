import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Analysis = () => {
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [files, setFiles] = useState([]);
  const [projectPath, setProjectPath] = useState("");

  useEffect(() => {
    console.log(
      "Reading project analysis..."
    );

    const storedData =
      sessionStorage.getItem(
        "projectAnalysis"
      );

    console.log(
      "Stored analysis:",
      storedData
    );

    if (!storedData) {
      return;
    }

    try {
      const data = JSON.parse(
        storedData
      );

      console.log(
        "Parsed analysis:",
        data
      );

      setAnalysis(
        data.analysis
      );

      setFiles(
        data.files || []
      );

      setProjectPath(
        data.projectPath || ""
      );

    } catch (error) {
      console.error(
        "Failed to parse analysis:",
        error
      );
    }
  }, []);

  // ========================================
  // NO ANALYSIS
  // ========================================

  if (!analysis) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0f172a",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div>
          <h1>
            No analysis available
          </h1>

          <p
            style={{
              color: "#94a3b8",
              marginBottom: "25px",
            }}
          >
            Please upload a project first.
          </p>

          <button
            onClick={() =>
              navigate("/upload-project")
            }
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "14px 25px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Upload Project
          </button>
        </div>
      </div>
    );
  }

  // ========================================
  // ANALYSIS PAGE
  // ========================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >

        {/* HEADER */}

        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "34px",
              marginBottom: "10px",
            }}
          >
            🤖 AI Project Analysis
          </h1>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Your project has been analyzed by
            the AI agent.
          </p>
        </div>

        {/* PROJECT FILES */}

        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "12px",
            marginBottom: "25px",
          }}
        >
          <h2>
            📁 Project Files
          </h2>

          {files.length === 0 ? (
            <p>
              No file information available.
            </p>
          ) : (
            <ul>
              {files.map(
                (file, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "8px",
                      color: "#cbd5e1",
                    }}
                  >
                    {file.name}
                  </li>
                )
              )}
            </ul>
          )}
        </div>

        {/* GEMINI ANALYSIS */}

        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "12px",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            🧠 Gemini Analysis
          </h2>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              background: "#020617",
              padding: "25px",
              borderRadius: "10px",
              color: "#e2e8f0",
              lineHeight: "1.7",
              fontSize: "15px",
              overflowX: "auto",
            }}
          >
            {analysis}
          </pre>
        </div>

        {/* DEPLOYMENT */}

        <div
          style={{
            background:
              "linear-gradient(135deg, #172554, #1e3a8a)",
            padding: "30px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h2>
            🚀 Ready to Deploy?
          </h2>

          <p
            style={{
              color: "#bfdbfe",
              marginBottom: "20px",
            }}
          >
            Review the AI analysis before
            deploying your project.
          </p>

          <button
            onClick={() =>
              navigate("/deploy")
            }
            style={{
              background: "#22c55e",
              color: "white",
              border: "none",
              padding: "15px 35px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "17px",
              fontWeight: "bold",
            }}
          >
            🚀 Deploy to Vercel
          </button>
        </div>

      </div>
    </div>
  );
};

export default Analysis;