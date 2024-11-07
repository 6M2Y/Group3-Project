import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        {/* Left side - Logo */}
        <div className="navbar-left">
          <Link to={"/"}>
            <img src="your-logo.png" alt="logo" />
          </Link>
        </div>

        {/* Centered Search Input */}
        <div className="navbar-center">
          <input type="text" placeholder="Search" />
        </div>

        {/* Right side - Navigation Links */}
        <div className="navbar-right">
          <NavLink to={"/createPost"}>Write</NavLink>
          <NavLink to={"/signIn"}>SignIn</NavLink>
          <NavLink to={"/signUp"}>SignUp</NavLink>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
