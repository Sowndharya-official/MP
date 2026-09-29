import React, { useEffect, useState } from "react";

const SecurityReport = () => {
  const [files, setFiles] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Deployment states
  const [deploying, setDeploying] = useState(false);
  const [deployment, setDeployment] = useState(null);
  const [deployError, setDeployError] = useState("");

  // =====================================================
  // SECURITY CHECK
  // =====================================================

  useEffect(() => {
  const runSecurityCheck = async () => {
    try {
      const savedProject = sessionStorage.getItem("generatedProject");

      if (!savedProject) {
        throw new Error("Generated website files were not found.");
      }

      const project = JSON.parse(savedProject);

      if (!project.files) {
        throw new Error("Generated website files are missing.");
      }

      setFiles(project.files);

      const response = await fetch(
        "/api/ai/security-check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            files: project.files,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Security analysis failed."
        );
      }

      setReport(data.report);

    } catch (err) {
      console.error("Security analysis error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  runSecurityCheck();
}, []);
  // =====================================================
  // DEPLOY TO VERCEL
  // =====================================================

  const handleDeploy = async () => {
    try {
      setDeploying(true);
      setDeployError("");
      setDeployment(null);

      const savedProject = sessionStorage.getItem("generatedProject");

if (!savedProject) {
  throw new Error("Generated website files were not found.");
}

const project = JSON.parse(savedProject);

if (!project.files) {
  throw new Error("Generated website files are missing.");
}

const response = await fetch(
  "/api/deploy",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      files: project.files,
    }),
  }
);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Deployment failed."
        );
      }

      setDeployment(data.deployment);

    } catch (err) {
      console.error("Deployment error:", err);

      setDeployError(
        err.message || "Unable to deploy website."
      );

    } finally {
      setDeploying(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingCard}>
          <div style={styles.spinner}>⟳</div>

          <h2>
            🔐 Analyzing Website Security...
          </h2>

          <p>
            Gemini is checking your generated code for
            cybersecurity and deployment risks.
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // SECURITY ERROR
  // =====================================================

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.errorCard}>
          <h2>
            ❌ Security Analysis Failed
          </h2>

          <p>{error}</p>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN REPORT
  // =====================================================

  return (
    <div style={styles.page}>

      {/* HEADER */}

      <div style={styles.header}>
                <h1 style={styles.headerTitle}>
                🔐 AI Security Report
                </h1>

                <p style={styles.headerText}>
                    AI-powered cybersecurity analysis of your
                    generated website.
                    </p>
                        </div>


      {/* SECURITY SCORE */}

      <div style={styles.scoreGrid}>

        <div style={styles.scoreCard}>
          <p style={styles.cardLabel}>
            Security Score
          </p>

          <h2 style={styles.score}>
            {report.securityScore}/100
          </h2>
        </div>


        <div style={styles.scoreCard}>
          <p style={styles.cardLabel}>
            Overall Rating
          </p>

          <h2>
            {report.overallRating}
          </h2>
        </div>

      </div>


      {/* TECHNOLOGY */}

      <div style={styles.card}>

        <h3>
          🧩 Technology Detected
        </h3>

        <div style={styles.tagContainer}>

          {report.technologySummary?.map(
            (item, index) => (
              <span
                key={index}
                style={styles.tag}
              >
                {item}
              </span>
            )
          )}

        </div>

      </div>


      {/* DATA SECURITY */}

      <div style={styles.card}>

        <h3>
          🛡️ Data Security
        </h3>

        <p>
          <strong>
            {report.dataSecurity?.status}
          </strong>
        </p>

        <p>
          {report.dataSecurity?.details}
        </p>

      </div>


      {/* SECURITY CHECKS */}

      <div style={styles.card}>

        <h3>
          🔍 Security Checks
        </h3>

        <div>

          {Object.entries(
            report.securityChecks || {}
          ).map(([key, value]) => (

            <div
              key={key}
              style={styles.checkItem}
            >

              <strong>
                {key}
              </strong>

              <p>
                {value}
              </p>

            </div>

          ))}

        </div>

      </div>


      {/* FINDINGS */}

      <div style={styles.card}>

        <h3>
          🚨 Security Findings
        </h3>

        {report.findings?.length === 0 ? (

          <p>
            ✅ No significant security issues
            detected.
          </p>

        ) : (

          report.findings?.map(
            (finding, index) => (

              <div
                key={index}
                style={styles.finding}
              >

                <h4>
                  {finding.severity} —{" "}
                  {finding.title}
                </h4>

                <p>
                  <strong>
                    Category:
                  </strong>{" "}
                  {finding.category}
                </p>

                <p>
                  {finding.description}
                </p>

                <p>
                  <strong>
                    Recommendation:
                  </strong>{" "}
                  {finding.recommendation}
                </p>

              </div>

            )
          )

        )}

      </div>


      {/* DEPLOYMENT READINESS */}

      <div style={styles.card}>

        <h3>
          🚀 Deployment Readiness
        </h3>

        <p style={styles.readiness}>

          {report.deploymentReadiness?.ready
            ? "✅ Ready for deployment"
            : "⚠️ Not ready for deployment"}

        </p>

        <p>
          {report.deploymentReadiness?.reason}
        </p>

      </div>


      {/* SUMMARY */}

      <div style={styles.card}>

        <h3>
          📋 Security Summary
        </h3>

        <p>
          {report.summary}
        </p>

      </div>


      {/* =================================================
          DEPLOYMENT SECTION
      ================================================= */}

      <div style={styles.deployCard}>

        <div style={styles.deployIcon}>
          🚀
        </div>

        <h2>
          Deploy Your Website
        </h2>

        <p>
          Your website has been generated, analyzed,
          and is ready to be deployed to Vercel.
        </p>


        {/* DEPLOY BUTTON */}

        {!deployment && (

          <button
            onClick={handleDeploy}
            disabled={deploying}
            style={
              deploying
                ? styles.deployButtonDisabled
                : styles.deployButton
            }
          >

            {deploying
              ? "🚀 Deploying..."
              : "🚀 Deploy Website"}

          </button>

        )}


        {/* DEPLOYMENT ERROR */}

        {deployError && (

          <div style={styles.deployError}>

            ❌ Deployment Failed

            <p>
              {deployError}
            </p>

          </div>

        )}


        {/* SUCCESS */}

        {deployment && (

          <div style={styles.successBox}>

            <h3>
              ✅ Website Deployed Successfully!
            </h3>

            <p>
              Your AI-generated website is now
              available online.
            </p>


            {/* URL */}

            <div style={styles.urlBox}>

              <strong>
                Deployment URL
              </strong>

              <a
                href={deployment.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.url}
              >
                {deployment.url}
              </a>

            </div>


            {/* VISIT BUTTON */}

            <a
              href={deployment.url}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.visitButton}
            >
              🌐 Visit Deployed Website
            </a>

          </div>

        )}

      </div>

    </div>
  );
};


// =====================================================
// STYLES
// =====================================================

const styles = {

  page: {
    minHeight: "100vh",
    background: "#eaeaea",
    padding: "40px",
    fontFamily:
      "Arial, Helvetica, sans-serif",
  },

  header: {
    maxWidth: "1100px",
    margin: "0 auto 30px",
  },

  header: {
    fontSize: "32px",
    marginBottom: "8px",
  },

  header: {
    color: "#666",
  },

  loadingCard: {
    maxWidth: "600px",
    margin: "100px auto",
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.08)",
  },

  spinner: {
    fontSize: "40px",
    marginBottom: "15px",
  },

  errorCard: {
    maxWidth: "600px",
    margin: "100px auto",
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    color: "#b91c1c",
  },

  scoreGrid: {
    maxWidth: "1100px",
    margin: "0 auto 20px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  scoreCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.06)",
  },

  cardLabel: {
    color: "#777",
    marginBottom: "8px",
  },

  score: {
    fontSize: "30px",
    margin: 0,
  },

  card: {
    maxWidth: "1100px",
    margin: "0 auto 20px",
    background: "#fff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.06)",
  },

  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  tag: {
    background: "#eef2ff",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "14px",
  },

  checkItem: {
    padding: "12px 0",
    borderBottom:
      "1px solid #eee",
  },

  finding: {
    padding: "18px",
    marginBottom: "12px",
    border: "1px solid #ddd",
    borderRadius: "12px",
  },

  readiness: {
    fontSize: "18px",
    fontWeight: "bold",
  },

  deployCard: {
    maxWidth: "1100px",
    margin: "30px auto",
    background:
      "linear-gradient(135deg, #111827, #1f2937)",
    color: "#0b375d",
    padding: "45px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow:
      "0 15px 40px rgba(0,0,0,0.15)",
  },

  deployIcon: {
    fontSize: "45px",
  },

  deployButton: {
    marginTop: "20px",
    padding: "14px 30px",
    border: "none",
    borderRadius: "10px",
    background: "#fff",
    color: "#111827",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  deployButtonDisabled: {
    marginTop: "20px",
    padding: "14px 30px",
    border: "none",
    borderRadius: "10px",
    background: "#9ca3af",
    color: "#0b375d",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "not-allowed",
  },

  deployError: {
    marginTop: "20px",
    background: "#fee2e2",
    color: "#991b1b",
    padding: "15px",
    borderRadius: "10px",
  },

  successBox: {
    marginTop: "25px",
    background: "#fff",
    color: "#111827",
    padding: "25px",
    borderRadius: "15px",
  },

  urlBox: {
    marginTop: "20px",
    padding: "15px",
    background: "#f3f4f6",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  url: {
    color: "#2563eb",
    fontWeight: "bold",
    wordBreak: "break-all",
  },

  visitButton: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 24px",
    background: "#2563eb",
    color: "#0b375d",
    textDecoration: "none",
    borderRadius: "10px",
    fontWeight: "bold",
  },
};

export default SecurityReport;