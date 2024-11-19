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
import LatestPostCard from "../Components/latestPostCard";
import {
  ApiResponse,
  HomeProps,
  latestPostType,
  Post,
  TagCount,
  User,
} from "../Common/interfaces";


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
  const [tagCounts, setTagCounts] = useState<{ tag: string; count: number }[]>([]);


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

  
  const loadByTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tag = e.currentTarget.textContent
      ?.match(/^[^\(]*/)?.[0]
      .toLowerCase();
    console.log("Selected tag:", tag);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div className="main-content">
      {/*  Tags Section */}
      <div className="tags-section">
      <h3>Tags</h3>
      <div className="tags-list">
        {tagCounts.map(({ tag, count }) => (
          <button
            onClick={loadByTag} // Ensure `loadByTag` is properly defined
            className="tag-button"
            key={tag}
          >
            {tag}
            <span className="tag-count">({count} posts)</span>
          </button>
        ))}
      </div> </div>
     

  {/* Profile Section */}
  <div className="posts-section">
    <div style={{ textAlign: "left", margin: "20px" }}>
      <h1>User Profile</h1>
      <p>Username: {profile?.user.username}</p>
      <p>Email: {profile?.user.email}</p>
      <div style={{ marginBottom: "20px" }}>
        <h2>Posts Created:</h2>
        <p>Total posts created: {postCount}</p>
        <ul>
          {profile?.pages.map((page) => (
            <li key={page._id}>
              {page.title} ({new Date(page.createdAt).toLocaleString()})
            </li>
          ))}
        </ul>
      </div>
  </div>
  </div>
       {/*  Latest Posts */}
       <div className="latest-posts-section">
        <h3>Latest Posts</h3>
        <ul>
          {latestPosts.length > 0 ? (
            latestPosts.map((latestPost, index) => (
              <LatestPostCard content={latestPost} key={index} />
            ))
          ) : (
            <p>No latest posts available.</p>
          )}
        </ul>
      </div>
     
     
    </div>
  );
};

export default Profile;
