import React from "react";
import InputBox from "../Components/InputBox";

export const Signup = () => {
  return (
    <>
      {" "}
      <h1>Sign up</h1>
      <InputBox name_="fullname" type_="text" placeholder_="full name" />
      <InputBox name_="email" type_="email" placeholder_="email" />
      <InputBox name_="password" type_="password" placeholder_="password" />
      <button>Sign up</button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: "50%",
        }}
      >
        <hr style={{ flex: 1, border: "none", borderTop: "1px solid #000" }} />
        <span>or</span>
        <hr style={{ flex: 1, border: "none", borderTop: "1px solid #000" }} />
      </div>
      <button>Continue with google</button>
    </>
  );
};
