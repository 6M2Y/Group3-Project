import { Navigate } from "react-router-dom";
import { useUser } from "../utils/UserContext";
import { useState } from "react";
import WikIEditorPage from "./WikIEditorPage";

export const CreatePost = () => {
  // const [pageState, setPageState] = useState("editor");
  const { signedUser } = useUser(); //whether the user is in session

  return !signedUser?.access_token ? (
    <Navigate to="/signin" />
  ) : (
    <WikIEditorPage />
  );
};
