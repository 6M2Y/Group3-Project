import React from "react";
import { NavLink, Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">SuperHeroes</Link>
      </div>
      <div className="navbar-center">
        <input type="text" placeholder="Search" />
      </div>
      <div className="navbar-right">
        <NavLink to="/createpost">Write</NavLink>
        <NavLink to="/signin">Sign In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;;
