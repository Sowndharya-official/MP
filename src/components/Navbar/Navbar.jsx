import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/")}>
        <span className="navbar-shield">🛡</span>
        <span className="navbar-title">SecureDeploy</span>
      </div>

      {!user && (
        <div className="navbar-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#technologies">Technologies</a>
        </div>
      )}

      <div className="navbar-actions">
        {user ? (
          <>
            <span className="navbar-user">{user.displayName || user.email}</span>
            <button className="btn-outline" onClick={onLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-ghost">Login</Link>
            <Link to="/signup" className="btn-primary">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
}
