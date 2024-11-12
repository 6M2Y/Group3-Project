import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Navbar.css";
import { useUser } from "../utils/UserContext";
import { FaBell, FaUser, FaPen, FaSignOutAlt } from "react-icons/fa";
import { removeFromSession } from "../utils/session";

const Navbar = () => {
  const { signedUser, setSignedUser } = useUser();

  //sign out
  const handleSignOut = () => {
    removeFromSession("user");
    setSignedUser(null);
  };

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
          <Link to={"/createPost"}>
            <span
              style={{
                color: signedUser?.access_token ? "black" : "gray",
                textDecoration: "none",
                cursor: signedUser?.access_token ? "pointer" : "cursor",
              }}
            >
              <FaPen /> Write
            </span>
          </Link>
          {/* whether the user is logged in */}
          {signedUser?.access_token ? (
            <>
              <Link to={"/dashboard/notification"}>
                <button>
                  {" "}
                  <FaBell />
                </button>
              </Link>
              <Link to={"/profile"}>
                <button>
                  {" "}
                  <FaUser />
                </button>
              </Link>
              <Link to={"/profile"}>
                <button onClick={handleSignOut}>
                  {" "}
                  <FaSignOutAlt />
                  SignOut
                  <p>@{signedUser?.username}</p>
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/signIn"}>SignIn</Link>
              <Link to={"/signUp"}>SignUp</Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
