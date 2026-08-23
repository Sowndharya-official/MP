import "./Signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();

    // Remove extra spaces
    const userName = name.trim();
    const userEmail = email.trim();
    const userPassword = password.trim();
    const userConfirmPassword = confirmPassword.trim();

    // Validation
    if (userName === "") {
      alert("Please enter your name.");
      return;
    }

    if (userPassword.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    if (userPassword !== userConfirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      // Save display name
      await updateProfile(userCredential.user, {
        displayName: userName,
      });

      alert("🎉 Account Created Successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.log(error.code);
      console.log(error.message);

      switch (error.code) {
        case "auth/email-already-in-use":
          alert("This email is already registered.");
          break;

        case "auth/invalid-email":
          alert("Invalid email address.");
          break;

        case "auth/weak-password":
          alert("Password should be at least 6 characters.");
          break;

        default:
          alert(error.message);
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">

        <h1>🛡 Secure AI Deploy</h1>

        <p>Create your account to deploy securely.</p>

        <form onSubmit={signup}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password (minimum 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        <div className="bottom">
          Already have an account?
          <Link to="/login"> Login</Link>
        </div>

        <Link className="home-link" to="/">
          ← Back to Home
        </Link>

      </div>
    </div>
  );
}

export default Signup;