import React, { useState, useEffect, MouseEvent } from "react";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import { useUser } from "../utils/UserContext";
import { FaUser, FaPen, FaBars, FaSignOutAlt, FaSearch } from "react-icons/fa";
import { removeFromSession } from "../utils/session";
import { toast } from "react-toastify";
import { Post, wikiPostSearch } from "../Common/interfaces";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search input
  // const [searchResults, setSearchResults] = useState<Post[]>([]);
  // const [error, setError] = useState<string | null>(null); // State for error handling
  // const [loading, setLoading] = useState(false); // State for loading indicator
  const { signedUser, setSignedUser } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();
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

  const handleKeyDownOnSearch = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const query = (e.target as HTMLInputElement).value.trim();
    if (e.key === "Enter" && query.length) {
      navigate(`/search/${query}`); // Navigate to the search results page with the query
    }
  };
  // const handlekeyDownOnSearch = (e: KeyboardEvent) => {
  //   let query = (e.target as HTMLInputElement).value;
  //   if (e.key == "Enter" && query.length) {
  //     navigate(`search/${query}`);
  //   }
  // };

  // const handleKeyDownOnSearch = async (
  //   e: React.KeyboardEvent<HTMLInputElement>
  // ) => {
  //   const query = (e.target as HTMLInputElement).value.trim();
  //   if (e.key === "Enter" && query.length) {
  //     try {
  //       setLoading(true);
  //       setError(null);

  //       // Make API call to search
  //       const response = await axios.post<wikiPostSearch>(
  //         `${process.env.REACT_APP_WIKI_API_URL}/searchByTag`,
  //         { tag: query }
  //       );
  //       setSearchResults(response.data.wikiPost || []); // Update results state
  //     } catch (err: any) {
  //       setError(
  //         err.response?.data?.error || "Failed to fetch search results."
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  return (
    <>
      <nav className="navbar" onClick={(e: MouseEvent) => e.stopPropagation()}>
        {/* Left side - Logo */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            {/* <img src="/logo.webp" alt="" /> */}
            <span className="logo1">Health</span>
            <br />
            <span className="logo">Wellbeing</span>
          </Link>
        </div>

        {/* Centered Search Input */}
        <div className="navbar-center">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Sync input state
              onKeyDown={handleKeyDownOnSearch} // Trigger on Enter key
            />
            {/* <input
              type="text"
              placeholder="Search"
              onKeyDown={handlekeyDownOnSearch}
            /> */}
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
