import React from 'react';
import './Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>SuperHeroes</p>
        <nav className="footer-links">
          <a href="/teams">Teams</a>
          <a href="/help">Help</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/contact-us">Contact Us</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
