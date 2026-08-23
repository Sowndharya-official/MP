import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        <h2>🛡 SecureAI Deploy</h2>
      </div>

      <ul className="nav-links">

        <li>
          <a href="#features">Features</a>
        </li>

        <li>
          <a href="#workflow">How It Works</a>
        </li>

        <li>
          <a href="#technology">Technologies</a>
        </li>

        <li>
          <a href="#contact">Contact</a>
        </li>

      </ul>

      <div className="buttons">

        <Link to="/login">
          <button className="login-btn">
            Login
          </button>
        </Link>

        <Link to="/signup">
          <button className="start-btn">
            Get Started
          </button>
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;