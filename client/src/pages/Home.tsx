import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/MainContent.css";
import { UserAuthType } from "../utils/useAuthForm";
import axios from "axios";
import { toast } from "react-toastify";
import LatestPostCard from "../Components/latestPostCard";

interface HomeProps {
  isAuthenticated?: boolean; // Make isAuthenticated optional
  userId?: string | null; // Make userId optional
}

interface Version {
  tags: string[];
  content: string;
  editor: string;
  _id: string;
  date: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  versions: Version[];
  views: number;
  comments: string[]; // You can replace `any` with a more specific type if you have a structure for comments
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface User {
  _id: string;
  name: string;
  // Add other user fields as necessary
}
const availableTags = [
  "Hero",
  "Villain",
  "Adventure",
  "Powers",
  "Universe",
  "Origins",
];

const latestPosts = [
  {
    title: "The Ultimate Showdown",
    author: "Sam Black",
    createdAt: "2024-11-15",
  },
  {
    title: "The Fall of the Universe",
    author: "Cathy Green",
    createdAt: "2024-11-14",
  },
];

export interface latestPostType {
  author: {
    fullname: string;
    email: string;
  };
  title: string;
  tags: string[];
  updatedAt: string; // ISO string for date
}
interface ApiResponse {
  wikiPost: latestPostType[];
}

interface TagCount {
  tag: string;
  count: number;
}

export const Home = () => {
  const [latestPosts, setLatestPosts] = useState<latestPostType[]>([]);
  const [tagCounts, setTagCounts] = useState<{ tag: string; count: number }[]>(
    []
  );
  const [pageState, setPageState] = useState("All Posts");

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

  return (
    <div className="main-content">
      {/* Part 1: Tags Section */}
      <div className="tags-section">
        <h3>Tags</h3>
        <div className="tags-list">
          {tagCounts.map(({ tag, count }) => (
            <button
              onClick={loadByTag} // Replace with `loadByTag` or similar function
              className="tag-button"
              key={tag}
            >
              {tag}
              <span className="tag-count">({count} posts)</span>
            </button>
          ))}
          {/* {availableTags.map((tag, index) => (
            <button onClick={loadByTag} className="tag-button" key={index}>
              {tag}
              <span className="tag-count">(12 posts)</span>
            </button>
          ))} */}
        </div>
      </div>

      {/* Part 2: All Posts */}
      <div className="posts-section">
        {/* dynamically render the posts based on selected tag */}
        <h3>{pageState}</h3>
        <div className="posts-grid">
          {currentPosts.map((post) => (
            <div
              className="post-card"
              key={post._id}
              onClick={() =>
                navigate(`/postpage/${post._id}`, {
                  state: { post, isAuthenticated, userId },
                })
              }
              style={{ cursor: "pointer" }}
            >
              <img
                src={`http://localhost:4000${post.image}`}
                alt={post.title}
                className="image-300"
              />
              <h4 className="post-title">{post.title}</h4>
              <p className="post-summary">
                {getFirst200Characters(post.content)}
              </p>

              <div>
                {post.versions.map((version) => (
                  <p>By {users[version.editor]?.name || "Loading..."}</p>
                ))}
              </div>
              <p className="post-date">{formatDate(post.createdAt)}</p>
              <span className="post-tag">{post.tags.join(", ")}</span>
            </div>
          ))}
        </div>
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(posts.length / postsPerPage) },
            (_, index) => (
              <button key={index + 1} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>

      {/* Part 3: Latest Posts */}
      <div className="latest-posts-section">
        <h3>Latest Posts</h3>
        <ul>
          {latestPosts.map((latestPost, index) => (
            <LatestPostCard content={latestPost} key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
