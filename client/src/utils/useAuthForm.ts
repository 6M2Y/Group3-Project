// src/hooks/useAuthForm.ts
import { useState, useRef, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { storeInSession } from "./session";
import { useUser } from "./UserContext";

export interface UserAuthType {
    fullname: string;
    password: string;
    email: string;
    username: string,
    access_token: string | null;
  }

export const useAuthForm = (endpoint: string) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formEntries, setFormEntries] = useState<{ [key: string]: string }>({});

    // const { setSignedUser } = useContext(UserContext);
    const { signedUser, setSignedUser } = useUser();
    console.log("token: " + signedUser?.access_token)

    const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const entries: { [key: string]: string } = {};
      formData.forEach((value, key) => (entries[key] = value as string));
      setFormEntries(entries);

      try {
        const response = await axios.post<UserAuthType>(
          `${process.env.REACT_APP_WIKI_API_URL}${endpoint}`,
          entries
        );
          toast.success("Request successful!");
          //storing data in the session
          storeInSession("user", JSON.stringify(response.data));
          setSignedUser(response.data)
          //  console.log(response.data);
      } catch (error: any) {
        toast.error(error.response?.data?.error || "An error occurred");
      }
    }
  };

  return { formRef, formEntries, handleFormSubmit };
};
