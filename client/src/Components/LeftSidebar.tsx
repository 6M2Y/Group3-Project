// Sidebar.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ApiResponse, latestPostType, TagCount } from "../Common/interfaces";
import LatestPostCard from "./latestPostCard";

const availableTags = [
  "Hero",
  "Villain",
  "Adventure",
  "Powers",
  "Universe",
  "Origins",
];

const LeftSidebar: React.FC = () => {
  const [tagCounts, setTagCounts] = useState<{ tag: string; count: number }[]>(
    []
  );
  const [latestPosts, setLatestPosts] = useState<latestPostType[]>([]);

  useEffect(() => {
    // const fetchLatestPosts = async () => {
    //   try {
    //     const response = await axios.get<ApiResponse>(
    //       `${process.env.REACT_APP_WIKI_API_URL}/latest-posts`
    //     );
    //     setLatestPosts(response.data.wikiPost || []);
    //   } catch (error) {
    //     console.error("Error fetching latest posts:", error);
    //     toast.error("Failed to fetch latest posts.");
    //   }
    // };

    const fetchTagCounts = async () => {
      try {
        const response = await axios.get<TagCount[]>(
          `${process.env.REACT_APP_WIKI_API_URL}/tags/counts`
        );
        const mergedTagCounts = availableTags.map((tag) => {
          const apiTag = response.data.find((t) => t.tag === tag);
          return { tag, count: apiTag ? apiTag.count : 0 };
        });
        setTagCounts(mergedTagCounts);
      } catch (error) {
        console.error("Error fetching tag counts:", error);
        toast.error("Failed to fetch tag counts.");
      }
    };

    // fetchLatestPosts();
    fetchTagCounts();
  }, []);

  const loadByTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tag = e.currentTarget.textContent
      ?.match(/^[^\(]*/)?.[0]
      .toLowerCase();
    console.log("Selected tag:", tag);
  };

  return (
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
      </div>{" "}
    </div>
  );
};

export default LeftSidebar;
