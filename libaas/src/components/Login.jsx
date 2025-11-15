import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔹 Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // send request to backend
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // store token & user data in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.msg || "✅ Login successful!");

      // redirect to homepage or dashboard
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.msg || "❌ Invalid email or password!");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img
          src="https://evara.me/cdn/shop/files/24_876a20bc-bdef-44d7-a7c1-40711358f590.png?v=1753879684"
          alt="Libaas Fashion"
        />
      </div>

      <div className="signup-right">
        <div className="signup-card">
          <h2>Login to Your Libaas Account</h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="create-btn">
              Login
            </button>
          </form>

          <button className="google-btn">Continue With Google</button>

          <p className="login-text">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>

          <p className="back-home">
            <Link to="/">← Go Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
