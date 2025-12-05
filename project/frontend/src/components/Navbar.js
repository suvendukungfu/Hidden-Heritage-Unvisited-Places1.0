import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar" data-testid="navbar">
      <Link to="/" className="navbar-brand" data-testid="navbar-brand">
        Hidden Heritage
      </Link>
      <ul className="navbar-links">
        <li><Link to="/" data-testid="nav-home">Home</Link></li>
        <li><Link to="/explore" data-testid="nav-explore">Explore</Link></li>
        <li><Link to="/trip-builder" data-testid="nav-bookings">Trip Builder</Link></li>
        <li><Link to="/about" data-testid="nav-about">About</Link></li>
        <li><Link to="/feedback" data-testid="nav-feedback">Feedback</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
