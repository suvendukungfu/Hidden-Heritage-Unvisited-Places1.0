import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Hidden Heritage</h3>
          <p>Discover India's forgotten treasures and experience the magic of untold stories.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/" data-testid="footer-home">Home</Link>
          <Link to="/explore" data-testid="footer-explore">Explore</Link>
          <Link to="/trip-builder" data-testid="footer-trip-builder">Trip Builder</Link>
          <Link to="/about" data-testid="footer-about">About</Link>
          <Link to="/feedback" data-testid="footer-feedback">Feedback</Link>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@hiddenheritage.in</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: Chambal Region, Madhya Pradesh, India</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <a href="#" data-testid="footer-facebook">Facebook</a>
          <a href="#" data-testid="footer-instagram">Instagram</a>
          <a href="#" data-testid="footer-twitter">Twitter</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Hidden Heritage. All rights reserved. Built with passion for India's heritage.</p>
      </div>
    </footer>
  );
};

export default Footer;
