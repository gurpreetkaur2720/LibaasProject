import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer
      className="footer"
      style={{
        backgroundImage: `url("/images/footer_banner.jpg")`

      }}
      aria-label="Site footer"
    >
      <div className="footer__overlay" />
      <div className="footer__content">
        <h3 className="footer__brand">libaas</h3>

        <p className="footer__tagline">
          by Gurpreet — sirf thumare nakhro ke liye
        </p>

        <nav className="footer__links" aria-label="Footer links">
          <Link to="/about">About Us</Link>
          <span className="sep" aria-hidden="true">•</span>
          <Link to="/size-chart">Size Chart</Link>
        </nav>
      </div>
    </footer>
  );
}
