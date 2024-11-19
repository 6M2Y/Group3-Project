//import React from "react";
//import { useUser } from "../utils/UserContext";

//export const Profile = () => {
//  const { signedUser } = useUser();
//  return <>{signedUser?.access_token && <div>Profile</div>}</>;
//};

import React, { useEffect, useState } from "react";
import { useUser } from "../utils/UserContext";
import { lookInSession } from "../utils/session";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
// import { LatestPostCard } from "../Components/LatestPostCard";
import { FaUser, FaEnvelope, FaFileAlt } from "react-icons/fa";
import "../Styles/profile.css";

import {
  ApiResponse,
  HomeProps,
  latestPostType,
  Post,
  TagCount,
  User,
} from "../Common/interfaces";
import RightSideBar from "../Components/RightSideBar";
import LeftSidebar from "../Components/LeftSidebar";

interface Page {
  _id: string;
  title: string;
  createdAt: string;
}

interface Comment {
  _id: string;
  content: string;
  page: Page;
  createdAt: string;
}

interface ProfileData {
  user: User;
  pages: Page[];
  comments: Comment[];
  tags: string[];
}

interface PostCountResponse {
  postCount: number;
}
const availableTags = [
  "Hero",
  "Villain",
  "Adventure",
  "Powers",
  "Universe",
  "Origins",
];
const Profile: React.FC = () => {
  //const { signedUser } = useUser();
  //const [profile, setProfile] = useState<ProfileData | null>(null);
  //const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const { signedUser } = useUser();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Ensure error is typed as string or null
  const [postCount, setPostCount] = useState(0);
  const [latestPosts, setLatestPosts] = useState<latestPostType[]>([]);
  const [tagCounts, setTagCounts] = useState<{ tag: string; count: number }[]>(
    []
  );

  useEffect(() => {
    const fetchProfile = async () => {
      const user = lookInSession("user");
      const token = user ? JSON.parse(user).access_token : null;
      if (!token) {
        setError("User not authenticated");
        //redirect to homepage
        <Navigate to={"/"} />;
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching profile data...");
        const response = await axios.get<ProfileData>(
          "http://localhost:4000/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Profile data fetched:", response.data);

        setProfile(response.data);
      } catch (error) {
        setError("Error fetching profile data");
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
          `http://localhost:4000/user/posts/count`,
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

  const fetchLatestPosts = () => {
    axios
      .get<ApiResponse>(`${process.env.REACT_APP_WIKI_API_URL}/latest-posts`)
      .then(({ data }) => {
        setLatestPosts(data.wikiPost);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const fetchTagCounts = async () => {
    try {
      const response = await axios.get<TagCount[]>(
        `${process.env.REACT_APP_WIKI_API_URL}/tags/counts`
      );

      const mergedTagCounts = availableTags.map((tag) => {
        // Look for the tag in the API response
        const apiTag = response.data.find((t) => t.tag === tag);

        // If found, use its count. Otherwise, set count to 0.
        return { tag, count: apiTag ? apiTag.count : 0 };
      });
      setTagCounts(mergedTagCounts); // Assume `setTagCounts` accepts an array of TagCount
      console.log(response.data);
    } catch (error) {
      {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  useEffect(() => {
    fetchLatestPosts();
    fetchTagCounts();
  }, []);

  // const loadByTag = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const tag = e.currentTarget.textContent
  //     ?.match(/^[^\(]*/)?.[0]
  //     .toLowerCase();
  //   console.log("Selected tag:", tag);
  // };
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
