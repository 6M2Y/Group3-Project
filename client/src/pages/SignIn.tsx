import React from "react";
import InputBox from "../Components/InputBox";
import { Link } from "react-router-dom";

export const SignIn = () => {
  return (
    <>
      {" "}
      <h1>Sign in</h1>
      <InputBox name_="username" type_="text" placeholder_="full name" />
      <InputBox name_="email" type_="email" placeholder_="email" />
      <button>Sign in</button>
      <p>
        Dont have an account? <Link to={"/signup"}>join us today </Link>
      </p>
    </>
  );
};
