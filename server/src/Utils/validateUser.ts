// Helper function for validating signup input
export const validateSignupInput = (fullname: string, email: string, password: string): string | null => {
  if (!fullname || fullname.length < 3) return "Full name must be at least 3 characters long";

  const emailRegEx = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  if (!email) return "Enter email";
  if (!emailRegEx.test(email)) return "Invalid email format";

  const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
  if (!passwordRegEx.test(password)) {
    return "Password must contain at least 1 letter, 1 digit, and be a minimum of 4 characters";
  }

  return null; // No errors found
};
