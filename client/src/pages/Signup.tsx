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
