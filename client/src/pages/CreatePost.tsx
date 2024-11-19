import { Navigate } from "react-router-dom";
import { useUser } from "../utils/UserContext";
import React, { useState } from "react";
import WikIEditorPage from "./WikIEditorPage";
import LeftSidebar from "../Components/LeftSidebar";
import RightSideBar from "../Components/RightSideBar";

export const CreatePost: React.FC = () => {
  const { signedUser } = useUser(); //whether the user is in session
  const [post, setPost] = useState({
    _id: "",
    title: "",
    content: "",
    tags: [],
    versions: [],
    views: 0,
    comments: [],
    image: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });

  return !signedUser?.access_token ? (
    <Navigate to="/signin" />
  ) : (
    <div className="main-content">
      {/*  Tags Section */}
      <LeftSidebar />
      {/* <div className="post-section"> */}
      <WikIEditorPage post={post} onSave={() => {}} onCancel={() => {}} />
      {/*  Latest Posts */}
      <RightSideBar />
    </div>
  );
};
