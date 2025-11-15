// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // check login state

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img src="/LibaasLogo.jpg" alt="Libaas Logo" className="logo-img" />
        </Link>
      </div>

      {/* Center Links */}
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/lahori-kudiyan">Lahori Kudiyan</Link></li>
        <li><Link to="/bollywood-begums">Bollywood Begums</Link></li>
        <li><Link to="/ambarsari-apsaras">Ambarsari Apsaras</Link></li>
      </ul>

      {/* Right Side Icons */}
      <div className="navbar-icons">
        <Link to="/wishlist" className="icon">♡</Link>
        <Link to="/cart" className="icon">🛒</Link>

        {/* Conditional rendering */}
        {user ? (
          <div className="user-info">
            <span className="username">
              Hi, <b>{user.name}</b>
            </span>
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn login-btn">Login</Link>
            <Link to="/signup" className="btn signup-btn">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
