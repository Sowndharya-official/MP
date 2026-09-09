import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";


function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalProjects: 0,
    deployments: 0,
    securityAlerts: 0,
    aiReviews: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/dashboard/stats"
        );

        const data = await response.json();

        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error(
          "Failed to load dashboard statistics:",
          error
        );
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">🛡 SecureAI Deploy</h2>

        <ul className="menu">
          <li className="active">🏠 Dashboard</li>
          <li>📁 Projects</li>
          <li>🤖 AI Review</li>
          <li>🛡 Security Scan</li>
          <li>🚀 Deployment</li>
          <li>📊 Reports</li>
          <li>⚙ Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        {/* Top Bar */}
        <div className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p className="subtitle">
              Welcome to SecureAI Deploy Platform
            </p>
          </div>

          <button
            onClick={() => navigate("/new-project")}
            className="new-project-button"
              >
  + New Project
</button>
        </div>

        {/* Dashboard Cards */}
        <div className="cards">
          <div className="card">
            <h3>Total Projects</h3>
            <h2>{stats.totalProjects}</h2>
          </div>

          <div className="card">
            <h3>Deployments</h3>
            <h2>{stats.deployments}</h2>
            
          </div>

          <div className="card">
            <h3>Security Alerts</h3>
            <h2>{stats.securityAlerts}</h2>
          </div>

          <div className="card">
            <h3>AI Reviews</h3>
            <h2>{stats.aiReviews}</h2>
          </div>
        </div>

        {/* Deployment Status */}
        <div className="deployment">
          <h2>Deployment Pipeline</h2>

          <div className="status">
            <div className="status-card">✅ Source Upload</div>
            <div className="status-card">✅ Dependency Analysis</div>
            <div className="status-card">✅ AI Review</div>
            <div className="status-card">✅ Security Scan</div>
            <div className="status-card">⏳ Docker Build</div>
            <div className="status-card">⏳ Cloud Deployment</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;