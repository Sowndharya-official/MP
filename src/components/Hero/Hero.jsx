import { Link } from "react-router-dom";
import StatusCard from "../StatusCard/StatusCard";
import "./Hero.css";

const marketingStages = [
  { label: "Source Upload", status: "done" },
  { label: "Security Scan", status: "done" },
  { label: "Docker Build", status: "done" },
  { label: "Deployment", status: "progress" },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="hero-badge">Secure DevSecOps Platform</span>
        <h1 className="hero-title">
          Deploy Your Apps<br />
          <span className="hero-accent">Securely</span>
        </h1>
        <p className="hero-subtitle">
          Upload your source code, perform automatic cybersecurity scans, detect
          vulnerabilities, and deploy your applications securely using Docker.
        </p>
        <div className="hero-buttons">
          <Link to="/signup" className="btn-primary btn-lg">Get Started →</Link>
          <a href="#how-it-works" className="btn-outline btn-lg">Learn More</a>
        </div>
      </div>

      <div className="hero-right">
        <StatusCard stages={marketingStages} />
      </div>
    </section>
  );
}
