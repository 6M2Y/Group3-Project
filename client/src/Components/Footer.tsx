import React from "react";
import "../Styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <nav className="footer-links">
          <Link to={"/teams"}>Teams</Link>
          <a href="/help">Help</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/contact-us">Contact Us</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
