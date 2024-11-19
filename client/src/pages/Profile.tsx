import React, { useEffect, useState } from "react";
import { useUser } from "../utils/UserContext";
import { lookInSession } from "../utils/session";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaFileAlt } from "react-icons/fa";
import "../Styles/profile.css";
import {
  ApiResponse,
  HomeProps,
  latestPostType,
  Post,
  PostCountResponse,
  ProfileData,
  TagCount,
  User,
} from "../Common/interfaces";
import RightSideBar from "../Components/RightSideBar";
import LeftSidebar from "../Components/LeftSidebar";
const Profile: React.FC = () => {
  const { signedUser } = useUser();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Ensure error is typed as string or null
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = lookInSession("user");
      const token = user ? JSON.parse(user).access_token : null;
      if (!token) {
        setError("User not authenticated");
        <Navigate to={"/"} />;
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching profile data...");
        const response = await axios.get<ProfileData>(
          `${process.env.REACT_APP_WIKI_API_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile(response.data);
      } catch (error) {
        toast.error("Error fetching profile data");
      } finally {
        setLoading(false);
      }
    };

    const fetchPostCount = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${signedUser?.access_token}`, // Use the token from signedUser
          },
        };
        const response = await axios.get<PostCountResponse>(
          `${process.env.REACT_APP_WIKI_API_URL}/user/posts/count`,
          config
        );
        setPostCount(response.data.postCount);
      } catch (error) {
        console.error("Error fetching post count:", error);
      }
    };

    fetchProfile();
    fetchPostCount();
  }, [signedUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="main-content">
      <LeftSidebar />

      {/* Profile Section */}
      <div className="posts-section">
        <div className="profile-container">
          <h1>User Profile</h1>

          <div className="profile-info">
            <p>
              <FaUser className="icon" />
              <strong>Username:</strong> {profile?.user.username}
            </p>
            <p>
              <FaEnvelope className="icon" />
              <strong>Email:</strong> {profile?.user.email}
            </p>
          </div>

          <div className="posts-created">
            <h2>
              <FaFileAlt className="icon" />
              Posts Created:
            </h2>
            <p>
              <strong>Total posts created:</strong> {postCount}
            </p>

            <ul>
              {profile?.pages.map((page) => (
                <li key={page._id}>
                  <strong>{page.title}</strong> (
                  {new Date(page.createdAt).toLocaleString()})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <RightSideBar />
    </div>
  );
};

export default Profile;
