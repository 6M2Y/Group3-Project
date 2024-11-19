import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/MainContent.css";
import { toast } from "react-toastify";
import LatestPostCard from "../Components/latestPostCard";
import { stripHtmlTags } from "../utils/cleanContent";
import {
  ApiResponse,
  HomeProps,
  latestPostType,
  Post,
  TagCount,
  User,
} from "../Common/interfaces";
import { FaCalendarAlt, FaChevronRight } from "react-icons/fa";
import { formatDate } from "../utils/formDate";
import { Link } from "react-router-dom";

const availableTags = [
  "Physical Health",
  "Fitness",
  "Mental Health",
  "Stress Management",
  "Nutrition",
  "Healthy Eating",
  "Self-Care",
];

const Home: React.FC<HomeProps> = ({
  isAuthenticated = false,
  userId = null,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<{ [key: string]: User }>({});
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [latestPosts, setLatestPosts] = useState<latestPostType[]>([]);
  const [tagCounts, setTagCounts] = useState<{ tag: string; count: number }[]>(
    []
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const postsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          `${process.env.REACT_APP_WIKI_API_URL}/posts`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Failed to fetch posts.");
      }
    };

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

    fetchAllPosts();
    fetchLatestPosts();
    fetchTagCounts();
  }, []);
  //filter by post

  const fetchUser = async (userId: string) => {
    console.log("Fetching user with ID:", userId); // Log the userId
    console.log("Current users object:", users); // Log the current users object

    if (!users[userId]) {
      try {
        const response = await axios.get<User>(
          `${process.env.REACT_APP_WIKI_API_URL}/users/${userId}`
        );
        setUsers((prevUsers) => {
          const updatedUsers: { [key: string]: User } = {
            ...prevUsers,
            [userId]: response.data,
          };
          return updatedUsers;
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          `${process.env.REACT_APP_WIKI_API_URL}/posts`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchUserPosts = async () => {
      if (isAuthenticated && userId) {
        try {
          const config = { headers: { Authorization: `Bearer ${userId}` } };
          const response = await axios.get<Post[]>(
            `${process.env.REACT_APP_WIKI_API_URL}/user/posts`,
            config
          );
          setUserPosts(response.data);
        } catch (error) {
          console.error("Error fetching user posts:", error);
        }
      }
    };

    fetchPosts();
    fetchUserPosts();
  }, [isAuthenticated, userId]);

  useEffect(() => {
    posts.forEach((post) => {
      if (post.author && isAuthenticated) {
        fetchUser(post.author);
      }
    });
  }, [posts]);

  const filteredPosts = selectedTag
    ? posts.filter((post) =>
        post.tags.some((tag) => tag.toLowerCase() === selectedTag)
      )
    : posts;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const loadByTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tag = e.currentTarget.textContent
      ?.match(/^[^\(]*/)?.[0]
      .trim()
      .toLowerCase();
    setSelectedTag(selectedTag === tag ? null : tag || null);
    setCurrentPage(1);
  };

  const handlePostClick = async (post: Post) => {
    try {
      await axios.get(
        `${process.env.REACT_APP_WIKI_API_URL}/pages/${post._id}`
      );
      navigate(`/postpage/${post._id}`, {
        state: { post, isAuthenticated, userId },
      });
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  };
  return (
    <div className="main-content">
      {/* Part 1: Tags Section */}
      <div className="tags-section">
        <h3>Tags</h3>
        <div className="tags-list">
          {tagCounts.map(({ tag, count }) => (
            <button
              onClick={loadByTag}
              className={`tag-button ${
                selectedTag === tag.toLowerCase() ? "active" : ""
              }`}
              key={tag}
            >
              {tag}
              <span className="tag-count">({count} posts)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Part 2: All Posts */}
      <div className="posts-section">
        <h2 className="homepagePost">
          Your Health, Your Success: Why Well-being Matters. Be part of the
          discussion. Share your thoughts!
        </h2>
        {/* If there are no posts to display */}
        {filteredPosts.length === 0 ? (
          <p
            style={{ textAlign: "center", fontSize: "18px", color: "#757575" }}
          >
            No posts available to show. Try selecting a different tag.
          </p>
        ) : (
          <div className="posts-grid">
            {currentPosts.map((post) => (
              <div
                className="post-card"
                key={post._id}
                onClick={() => handlePostClick(post)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={`${process.env.REACT_APP_WIKI_API_URL}${post.image}`}
                  alt={post.title}
                  className="image-300"
                />
                <h4 className="post-title">{post.title}</h4>
                <p className="post-summary">
                  {stripHtmlTags(post.content).slice(0, 100)}...
                </p>
                <div className="authorInfo">
                  <p className="by">
                    By: {users[post.author]?.fullname || "Loading..."}
                  </p>
                  <p className="post-date">{formatDate(post.createdAt)}</p>
                </div>

                <span className="post-tag">{post.tags.join(", ")}</span>
              </div>
            ))}
          </div>
        )}

        {/* pagination */}
        {filteredPosts.length > 0 && (
          <div className="pagination">
            {Array.from(
              { length: Math.ceil(filteredPosts.length / postsPerPage) },
              (_, index) => (
                <button key={index + 1} onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              )
            )}
          </div>
        )}
        {/* Part 3: User's Posts */}
        {isAuthenticated && (
          <div>
            <h2>Your Published Posts</h2>
            {userPosts.length === 0 ? (
              <p className="publishedPostStyle">
                You have published 0 article published.{" "}
                <Link to={"/createPost"}>Create a new post now.</Link>
              </p>
            ) : (
              userPosts.map((post) => (
                <section
                  key={post._id}
                  onClick={() => handlePostClick(post)}
                  className="publishedPostStyle"
                >
                  <h3>{post.title}</h3>

                  <div className="publishedPostStyleYours">
                    <FaCalendarAlt />
                    <span>{formatDate(post.createdAt)}</span>
                    <span
                      style={{
                        marginLeft: "auto",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span>Click to view details</span>
                      <FaChevronRight style={{ marginLeft: "5px" }} />
                    </span>
                  </div>
                </section>
              ))
            )}
          </div>
        )}
      </div>
      {/* Part 4: Latest Posts */}

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
export default Home;
