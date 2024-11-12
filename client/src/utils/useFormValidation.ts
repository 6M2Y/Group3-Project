import { emailRegEx, passwordRegEx } from "../utils/Regex";
import { toast } from "react-toastify";

export const useFormValidation = () => {
  const validate = (entries: { [key: string]: string }) => {
    const { fullname, email, password } = entries;

    if (fullname && fullname.length < 3) {
      toast.error("Full name must be at least 3 characters long");
      return false;
    }

    if (email && !emailRegEx.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (password && !passwordRegEx.test(password)) {
      toast.error(
        "Password must contain at least 1 letter, 1 digit, and be a minimum of 4 characters"
      );
      return false;
    }

    return true;
  };

  return { validate };
};