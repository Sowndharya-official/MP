import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {

    e.preventDefault();

    try {

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );

      alert("🎉 Login Successful!");

      navigate("/dashboard");

    } catch (error) {

      console.log(error.code);
      console.log(error.message);

      switch (error.code) {

        case "auth/invalid-credential":
          alert("Incorrect email or password.");
          break;

        case "auth/user-not-found":
          alert("No account found. Please sign up first.");
          break;

        case "auth/wrong-password":
          alert("Incorrect password.");
          break;

        case "auth/invalid-email":
          alert("Invalid email address.");
          break;

        default:
          alert(error.message);

      }

    }

  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h1>🔐 Secure AI Deploy</h1>

        <p>Login to continue your secure deployments.</p>

        <form onSubmit={login}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <div className="bottom-text">

          Don't have an account?

          <Link to="/signup">
            Sign Up
          </Link>

        </div>

        <Link className="back-home" to="/">
          ← Back to Home
        </Link>

      </div>

    </div>

  );

}

export default Login;