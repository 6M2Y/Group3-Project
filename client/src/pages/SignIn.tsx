import React from "react";
import { useAuthForm } from "../utils/useAuthForm";
import AuthForm from "../Components/AuthForm";
import { Link, Navigate } from "react-router-dom";
import { useUser } from "../utils/UserContext";
import { GoogleAuth } from "../Components/GoogleAuth";
import "../Styles/searchPage.css";
import LeftSidebar from "../Components/LeftSidebar";

import RightSideBar from "../Components/RightSideBar";

const Signin: React.FC = () => {
  const { formRef, handleFormSubmit } = useAuthForm("/signin");
  const { signedUser } = useUser();

  //if a use is already signedin, go to home else display signin
  return signedUser?.access_token ? (
    <Navigate to="/" />
  ) : (
    <div className="main-content">
      <LeftSidebar />
      <div className="posts-section">
        <div className="user-signin-out">
          <h1>Sign In</h1>
          <AuthForm
            onSubmit={handleFormSubmit}
            formRef={formRef}
            showFullname={false}
            buttonText="Sign In"
          />

          {/* Horizontal line with 'or' */}
          <div className="or-container">
            <span>or</span>
          </div>

          {/* Google Auth */}
          <GoogleAuth />

          {/* Sign up link */}
          <p>
            Don't have an account? <Link to={"/signup"}>Join us today</Link>
          </p>
        </div>
      </div>
      <RightSideBar />
    </div>
  );
};
export default Signin;
