import "./Home.css";
import { Link } from "react-router-dom";

import {
  FaShieldAlt,
  FaRobot,
  FaDocker,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaCode,
} from "react-icons/fa";

function Home() {
  return (
    <div className="home">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="logo">
          🛡 Secure AI Deploy
        </div>

        <ul className="nav-links">

          <li>
            <a href="#features">Features</a>
          </li>

          <li>
            <a href="#workflow">Workflow</a>
          </li>

          <li>
            <a href="#technology">Technology</a>
          </li>

        </ul>

        <div className="nav-buttons">

          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/signup" className="signup-btn">
            Get Started
          </Link>

        </div>

      </nav>

      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-left">

          <span className="badge">
            🚀 AI Powered Secure Deployment Platform
          </span>

          <h1>
            Secure AI Deploy
          </h1>

          <h2>
            Deploy Your Code With
            <span> Full Confidence</span>
          </h2>

          <p>

            Secure AI Deploy is an intelligent deployment platform
            that reviews your source code using AI, performs
            vulnerability analysis, builds Docker containers,
            scans for security issues and deploys applications
            safely to the cloud.

          </p>

          <div className="hero-buttons">

            <Link to="/signup" className="primary-btn">
              Get Started
            </Link>

            <a href="#features" className="secondary-btn">
              Explore Features
            </a>

          </div>

        </div>

        {/* Right Side */}

        <div className="hero-right">

          <div className="dashboard-card">

            <h3>Deployment Status</h3>

            <div className="status">
              <span>Source Upload</span>
              <span className="done">✔</span>
            </div>

            <div className="status">
              <span>Dependency Analysis</span>
              <span className="done">✔</span>
            </div>

            <div className="status">
              <span>AI Code Review</span>
              <span className="done">✔</span>
            </div>

            <div className="status">
              <span>Security Scan</span>
              <span className="done">✔</span>
            </div>

            <div className="status">
              <span>Docker Build</span>
              <span className="loading">
                Running...
              </span>
            </div>

            <div className="status">
              <span>Cloud Deployment</span>
              <span className="loading">
                Pending
              </span>
            </div>

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section id="features" className="features">

        <h2>Why Choose Secure AI Deploy?</h2>

        <div className="feature-grid">

          <div className="feature-card">

            <FaRobot className="icon"/>

            <h3>AI Code Review</h3>

            <p>

              Analyze source code using AI and
              receive instant recommendations.

            </p>

          </div>

          <div className="feature-card">

            <FaShieldAlt className="icon"/>

            <h3>Security Scan</h3>

            <p>

              Detect vulnerabilities before
              deployment.

            </p>

          </div>

          <div className="feature-card">

            <FaDocker className="icon"/>

            <h3>Docker Deployment</h3>

            <p>

              Automatically build Docker images
              for your application.

            </p>

          </div>

          <div className="feature-card">

            <FaCloudUploadAlt className="icon"/>

            <h3>Cloud Ready</h3>

            <p>

              Deploy applications securely to
              cloud environments.

            </p>

          </div>

          <div className="feature-card">

            <FaCheckCircle className="icon"/>

            <h3>Quality Reports</h3>

            <p>

              Download AI generated deployment
              and security reports.

            </p>

          </div>

          <div className="feature-card">

            <FaCode className="icon"/>

            <h3>Developer Friendly</h3>

            <p>

              Modern interface designed for
              developers and DevOps teams.

            </p>

          </div>

        </div>

      </section>

      {/* ================= WORKFLOW ================= */}

      <section
      id="workflow"
      className="workflow">

        <h2>
          Deployment Workflow
        </h2>

        <div className="steps">

          <div className="step">

            <span>1</span>

            <h3>
              Upload Code
            </h3>

          </div>

          <div className="step">

            <span>2</span>

            <h3>
              AI Analysis
            </h3>

          </div>

          <div className="step">

            <span>3</span>

            <h3>
              Security Scan
            </h3>

          </div>

          <div className="step">

            <span>4</span>

            <h3>
              Docker Build
            </h3>

          </div>

          <div className="step">

            <span>5</span>

            <h3>
              Deploy
            </h3>

          </div>

        </div>

      </section>

      {/* ================= TECHNOLOGY ================= */}

      <section
      id="technology"
      className="technology">

        <h2>
          Technologies Used
        </h2>

        <div className="tech-grid">

          <div className="tech-card">

            <h3>React</h3>

            <p>

              Responsive frontend interface.

            </p>

          </div>

          <div className="tech-card">

            <h3>Gemini AI</h3>

            <p>

              AI powered code review and
              recommendations.

            </p>

          </div>

          <div className="tech-card">

            <h3>Docker</h3>

            <p>

              Containerized deployment.

            </p>

          </div>

          <div className="tech-card">

            <h3>Firebase</h3>

            <p>

              Authentication and cloud storage.

            </p>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="cta">

        <div className="cta-box">

          <h2>

            Ready To Deploy Securely?

          </h2>

          <p>

            Start deploying your applications
            using AI-powered security,
            intelligent code review,
            Docker automation and cloud deployment.

          </p>

          <Link to="/signup">

            Get Started Now

          </Link>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <h2>

          🛡 Secure AI Deploy

        </h2>

        <p>

          Deploy Your Code With Full Confidence

        </p>

        <p>

          AI • Security • Docker • Cloud Deployment

        </p>

        <p>

          © 2026 Secure AI Deploy. All Rights Reserved.

        </p>

      </footer>

    </div>
  );
}

export default Home;