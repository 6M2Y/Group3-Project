import React from "react";
import "../Styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <nav className="footer-links">
          <Link to={"/teams"}>Teams</Link>
          <a href="/about">About</a>
          <Link to={"/teams"}>Contact Us</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
