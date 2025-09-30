import React from "react";
import { Link } from "react-router-dom";
import "./Login.css"; 

function Login() {
  return (
    <div className="signup-container">
      {/* Left Side - Image */}
      <div className="signup-image">
        <img
          src="https://evara.me/cdn/shop/files/24_876a20bc-bdef-44d7-a7c1-40711358f590.png?v=1753879684"
          alt="Libaas Fashion"
        />
      </div>

      {/* Right Side - Card Form */}
      <div className="signup-right">
        <div className="signup-card">
          <h2>Login to Your Libaas Account</h2>

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button className="create-btn">Login</button>
          <button className="google-btn">Continue With Google</button>

          <p className="login-text">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
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

export default Login;
