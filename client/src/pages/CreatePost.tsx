import { Navigate } from "react-router-dom";
import { useUser } from "../utils/UserContext";
import React, { useState } from "react";
import WikIEditorPage from "./WikIEditorPage";
import LeftSidebar from "../Components/LeftSidebar";
import RightSideBar from "../Components/RightSideBar";

export const CreatePost: React.FC = () => {
  // const [pageState, setPageState] = useState("editor");
  const { signedUser } = useUser(); //whether the user is in session
  // const [latestPosts, setLatestPosts] = useState<latestPostType[]>([]);
  // const [tagCounts, setTagCounts] = useState<{ tag: string; count: number }[]>(
  //   []
  // );
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

  const handleSave = (content: string) => {
    // Logic to save the new post
    console.log("Post saved:", content);
    // You can add your save logic here, such as making an API call to save the post
  };

  const handleCancel = () => {
    // Logic to handle cancel action
    console.log("Edit canceled");
    // You can add your cancel logic here, such as resetting the form or navigating away
  };

  return !signedUser?.access_token ? (
    <Navigate to="/signin" />
  ) : (
    <div className="main-content">
      {/*  Tags Section */}
      <LeftSidebar />
      {/* <div className="post-section"> */}
      <WikIEditorPage post={post} onSave={handleSave} onCancel={handleCancel} />
      {/*  Latest Posts */}
      {/* </div> */}
      <RightSideBar />
    </div>
  );
};
