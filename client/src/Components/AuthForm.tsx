// src/components/AuthForm.tsx
import React from "react";

interface AuthFormProps {
  onSubmit: (e: React.FormEvent) => void;
  formRef: React.RefObject<HTMLFormElement>;
  showFullname?: boolean;
  buttonText: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  formRef,
  showFullname,
  buttonText,
}) => (
  <form ref={formRef} onSubmit={onSubmit}>
    {showFullname && (
      <>
        <input name="fullname" type="text" placeholder="Full Name" /> <br />
      </>
    )}
    <input name="email" type="email" placeholder="Email" />
    <input name="password" type="password" placeholder="Password" />
    <button type="submit">{buttonText}</button>
  </form>
);

export default AuthForm;
