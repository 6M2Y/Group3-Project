// import React, { useRef } from "react";
// import InputBox from "../Components/InputBox";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { emailRegEx, passwordRegEx } from "../utils/Regex"; //regular expr. for email and password

// export const Signup = () => {
//   const authForm = useRef<HTMLFormElement | null>(null);

//   const handleSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     e.preventDefault();
//     // Retrieve data from the signup form
//     if (authForm.current) {
//       const signupFormData = new FormData(authForm.current);
//       let signUpFormEntries: { [key: string]: FormDataEntryValue } = {};

//       // Iterate through the form data entries
//       for (let [key, value] of signupFormData.entries()) {
//         signUpFormEntries[key] = value;
//       }

//       let { fullname, email, password } = signUpFormEntries;
//       //validate form inputs
//       if (typeof fullname == "string" && fullname.length < 3)
//         toast.error("Full name must be at least 3 characters long", {});

//       if (!email) return "Enter email";
//       if (!emailRegEx.test(email as string))
//         toast.error("Invalid email format");

//       if (!passwordRegEx.test(password as string)) {
//         toast.error(
//           "Password must contain at least 1 letter, 1 digit, and be a minimum of 4 characters"
//         );
//       }
//     }
//   };
//   return (
//     <>
//       {" "}
//       <h1>Sign up</h1>
//       <form ref={authForm}>
//         <InputBox name_="fullname" type_="text" placeholder_="full name" />
//         <InputBox name_="email" type_="email" placeholder_="email" />
//         <InputBox name_="password" type_="password" placeholder_="password" />
//         <button onClick={handleSignUp}>Sign up</button>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "10px",
//             width: "50%",
//           }}
//         >
//           <hr
//             style={{ flex: 1, border: "none", borderTop: "1px solid #000" }}
//           />
//           <span>or</span>
//           <hr
//             style={{ flex: 1, border: "none", borderTop: "1px solid #000" }}
//           />
//         </div>
//         <button>Continue with google</button>
//       </form>
//     </>
//   );
// };
// import React, { useRef } from "react";
// import InputBox from "../Components/InputBox";
// import { toast } from "react-toastify";
// import ToastNotification from "../Components/ToastContainer";
// import "react-toastify/dist/ReactToastify.css";
// import { emailRegEx, passwordRegEx } from "../utils/Regex"; // Regular expressions for email and password
// import axios from "axios";

// export const Signup = () => {
//   const authForm = useRef<HTMLFormElement | null>(null);
//   let signUpFormEntries: { [key: string]: FormDataEntryValue } = {};

//   const handleSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     e.preventDefault();

//     if (authForm.current) {
//       const signupFormData = new FormData(authForm.current);
//       // let signUpFormEntries: { [key: string]: FormDataEntryValue } = {};

//       // Iterate through the form data entries
//       for (let [key, value] of signupFormData.entries()) {
//         signUpFormEntries[key] = value;
//       }

//       let { fullname, email, password } = signUpFormEntries;

//       // Validate form inputs and show toast messages
//       if (typeof fullname === "string" && fullname.length < 3) {
//         toast.error("Full name must be at least 3 characters long");
//       }

//       if (!email) {
//         toast.error("Enter email");
//       } else if (!emailRegEx.test(email as string)) {
//         toast.error("Invalid email format");
//       }

//       if (!passwordRegEx.test(password as string)) {
//         toast.error(
//           "Password must contain at least 1 letter, 1 digit, and be a minimum of 4 characters"
//         );
//       }
//     }

//     sendDataToServer(); //if everything is ok, send to server
//   };
//   const sendDataToServer = () => {
//     console.log(`${process.env.REACT_APP_WIKI_API_URL as string}/signup`);
//     axios
//       .post(
//         `${process.env.REACT_APP_WIKI_API_URL as string}/signup`,
//         signUpFormEntries
//       )
//       .then(({ data }) => {
//         console.log(data);
//       })
//       .catch(({ response }) => {
//         toast.error(response.data.error);
//       });
//   };
//   return (
//     <>
//       <h1>Sign up</h1>
//       <form ref={authForm}>
//         <InputBox name_="fullname" type_="text" placeholder_="full name" />
//         <InputBox name_="email" type_="email" placeholder_="email" />
//         <InputBox name_="password" type_="password" placeholder_="password" />
//         <button onClick={handleSignUp}>Sign up</button>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "10px",
//             width: "50%",
//           }}
//         >
//           <hr
//             style={{ flex: 1, border: "none", borderTop: "1px solid #000" }}
//           />
//           <span>or</span>
//           <hr
//             style={{ flex: 1, border: "none", borderTop: "1px solid #000" }}
//           />
//         </div>
//         <button>Continue with Google</button>
//       </form>
//       <ToastNotification /> {/* ToastContainer */}
//     </>
//   );
// };
// src/pages/Signup.tsx
import React from "react";

import { useFormValidation } from "../utils/useFormValidation";
import { useAuthForm } from "../utils/useAuthForm";
import AuthForm from "../Components/AuthForm";
import { GoogleAuth } from "../Components/GoogleAuth";
import { useUser } from "../utils/UserContext";
import { Navigate } from "react-router-dom";

const Signup: React.FC = () => {
  const { formRef, handleFormSubmit, formEntries } = useAuthForm("/signup");
  const { validate } = useFormValidation();
  const { signedUser } = useUser();

  const onSubmit = (e: React.FormEvent) => {
    if (validate(formEntries)) handleFormSubmit(e);
  };

  return signedUser?.access_token ? (
    <Navigate to="/" />
  ) : (
    <>
      <h1>Sign Up</h1>
      <AuthForm
        onSubmit={onSubmit}
        formRef={formRef}
        showFullname={true}
        buttonText="Sign Up"
      />
      {/* Continue with Google button */}
      <GoogleAuth />
    </>
  );
};

export default Signup;
