import React, { useState, useEffect, MouseEvent } from "react";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useUser } from "../utils/UserContext";
import {
  FaBell,
  FaUser,
  FaPen,
  FaBars,
  FaSignOutAlt,
  FaSearch,
} from "react-icons/fa";
import { removeFromSession } from "../utils/session";
import { toast } from "react-toastify";

const Navbar: React.FC = () => {
  const { signedUser, setSignedUser } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  //sign out
  const handleSignOut = () => {
    removeFromSession("user");
    setSignedUser(null);
    toast.success("You are signed out!");
  };

  const toggleMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener(
      "click",
      handleClickOutside as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside as unknown as EventListener
      );
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="navbar" onClick={(e: MouseEvent) => e.stopPropagation()}>
        {/* Left side - Logo */}
        <div className="navbar-left">
          <Link to={"/"}>
            <img src="your-logo.png" alt="" />
          </Link>
          <span className="logo">SuperBlog</span>
        </div>

        {/* Centered Search Input */}
        <div className="navbar-center">
          <div className="search-container">
            <input type="text" placeholder="Search" />
            <FaSearch className="search-icon" />
          </div>
        </div>

        {/* Right side - Navigation Links */}
        <div className="navbar-right">
          <Link to={"/createPost"}>
            <span className={signedUser?.access_token ? "active" : "inactive"}>
              <FaPen /> Write
            </span>
          </Link>
          {/* whether the user is logged in */}
          {signedUser?.access_token ? (
            <>
              {/* <Link to={"/dashboard/notification"}>
                <button>
                  <FaBell />
                </button>
              </Link> */}
              <Link to={"/profile"}>
                <button>
                  <FaUser />
                </button>
              </Link>
              <Link to={"/"}>
                <button onClick={handleSignOut}>
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
          <button className="hamburger" onClick={toggleMenu}>
            <FaBars />
          </button>
        </div>
        {isMenuOpen && (
          <div className="dropdown-menu">
            <Link to={"/createPost"} onClick={closeMenu}>
              <FaPen /> Write
            </Link>
            <Link to={"/dashboard/notification"} onClick={closeMenu}>
              <FaBell /> Notifications
            </Link>
            <Link to={"/profile"} onClick={closeMenu}>
              <FaUser /> Profile
            </Link>
            <button onClick={handleSignOut}>
              <FaSignOutAlt /> SignOut
            </button>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
