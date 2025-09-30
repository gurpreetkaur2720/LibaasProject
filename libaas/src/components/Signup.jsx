import React from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  return (
    <div className="signup-container">
      {/* Left Side - Image */}
      <div className="signup-image">
        <img
          src="https://evara.me/cdn/shop/files/34.png?v=1752668215"
          alt="Libaas Fashion"
        />
      </div>

      {/* Right Side - Card Form */}
      <div className="signup-right">
        <div className="signup-card">
          <h2>Create Your Libaas Account</h2>

          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button className="create-btn">Sign Up</button>
          <button className="google-btn">Continue With Google</button>

          <p className="login-text">
            Already have an account? <Link to="/login">Log In</Link>
          </p>

          {/* ✅ Go Back Option */}
          <p className="back-home">
            <Link to="/">← Go Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
