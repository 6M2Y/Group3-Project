import React from "react";
import { useUser } from "../utils/UserContext";

export const Profile = () => {
  const { signedUser } = useUser();
  return <>{signedUser?.access_token && <div>Profile</div>}</>;
};
