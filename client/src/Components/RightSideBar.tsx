import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ApiResponse, latestPostType } from "../Common/interfaces";
import { LatestPostCard } from "./LatesPostCard"; // Import the LatestPostCard component

const RightSideBar: React.FC = () => {
  const [latestPosts, setLatestPosts] = useState<latestPostType[]>([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `${process.env.REACT_APP_WIKI_API_URL}/latest-posts`
        );
        setLatestPosts(response.data.wikiPost || []);
      } catch (error) {
        console.error("Error fetching latest posts:", error);
        toast.error("Failed to fetch latest posts.");
      }
    };

    fetchLatestPosts();
  }, []);

  return (
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
  );
};

export default RightSideBar;
