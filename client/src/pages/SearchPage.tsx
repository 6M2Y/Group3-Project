import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/searchPage.css";
import axios from "axios";
import { PostSearch } from "../Common/interfaces";
import {
  FaUser,
  FaEnvelope,
  FaTag,
  FaEye,
  FaCheckCircle,
} from "react-icons/fa";
import LeftSidebar from "../Components/LeftSidebar";
import RightSideBar from "../Components/RightSideBar";
import { toast } from "react-toastify";

const SearchPage: React.FC = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState<PostSearch[]>([]);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    //when we get a query search using the query
    const fetchSearchResults = async () => {
      try {
        setLoading(true);

        const response = await axios.post<{ wikiPost: PostSearch[] }>(
          `${process.env.REACT_APP_WIKI_API_URL}/searchByTag`,
          { tag: query }
        );

        setSearchResults(response.data.wikiPost || []);
      } catch (err: any) {
        toast.error("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  //after the search found a post, when a user clicks on it...goes to the post page to read
  const handlePostClick = async (post: PostSearch) => {
    try {
      await axios.get(
        `${process.env.REACT_APP_WIKI_API_URL}/pages/${post._id}`
      );
      navigate(`/postpage/${post._id}`, {
        state: { post },
      });
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  };

  return (
    <div className="main-content">
      <LeftSidebar />
      <div className="post-section search">
        <h1>Search Results for: {query}</h1>
        {loading && <p>Loading...</p>}
        {/* if the is a result from the search */}
        {searchResults.length > 0 ? (
          searchResults.map((post) => (
            <div
              key={post._id}
              className="post-result"
              onClick={() => handlePostClick(post)}
            >
              <div className="post-item">
                <img src={post.image} alt={post.title} className="post-image" />
                <div className="post-details">
                  <h3>{post.title}</h3>
                  <div className="details-inline">
                    {/* Author */}
                    <div className="author-info">
                      <FaUser />
                      <span>{post.author.fullname}</span>
                    </div>

                    {/* Email */}
                    <div className="email-info">
                      <FaEnvelope />
                      <span>{post.author.email}</span>
                    </div>
                  </div>

                  <div className="details-inline">
                    {/* Tags */}
                    <div className="tags-info">
                      <FaTag />
                      <span>{post.tags.join(", ")}</span>
                    </div>

                    {/* Views */}
                    <div className="views-info">
                      <FaEye />
                      <span>{post.views}</span>
                    </div>

                    {/* Published Status */}
                    <div className="published-info">
                      <FaCheckCircle />
                      <span>{post.published ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          // otherwise no result
          <p>No results found.</p>
        )}
      </div>
      <RightSideBar />
    </div>
  );
};

export default SearchPage;
