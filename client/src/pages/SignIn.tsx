// import React from "react";
// import InputBox from "../Components/InputBox";
// import { Link } from "react-router-dom";

// export const SignIn = () => {
//   return (
//     <>
//       {" "}
//       <h1>Sign in</h1>
//       <InputBox name_="username" type_="text" placeholder_="full name" />
//       <InputBox name_="email" type_="email" placeholder_="email" />
//       <button>Sign in</button>
//       <p>
//         Dont have an account? <Link to={"/signup"}>join us today </Link>
//       </p>
//     </>
//   );
// };
// src/pages/Signin.tsx
import React from "react";
import { useAuthForm } from "../utils/useAuthForm";
import AuthForm from "../Components/AuthForm";
import { Link, Navigate } from "react-router-dom";
import { useUser } from "../utils/UserContext";
import { GoogleAuth } from "../Components/GoogleAuth";

const Signin: React.FC = () => {
  const { formRef, handleFormSubmit } = useAuthForm("/signin");
  const { signedUser } = useUser();

  //if a use is already signedin, go to home else display signin
  return signedUser?.access_token ? (
    <Navigate to="/" />
  ) : (
    <>
      <h1>Sign In</h1>
      <AuthForm
        onSubmit={handleFormSubmit}
        formRef={formRef}
        showFullname={false}
        buttonText="Sign In"
      />
      {/* Sign up link */}
      <p>
        Don't have an account? <Link to={"/signup"}>Join us today</Link>
      </p>
      <GoogleAuth />
    </>
  );
};
export default Signin;
