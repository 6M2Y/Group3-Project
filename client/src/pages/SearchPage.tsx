import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/searchPage.css";
import axios from "axios";
import { Post } from "../Common/interfaces";
import {
  FaUser,
  FaEnvelope,
  FaTag,
  FaEye,
  FaCheckCircle,
} from "react-icons/fa";

// Define the Post interface based on the API response structure

// const SearchPage: React.FC = () => {
//   const { query } = useParams(); // Get the query from the route
//   const [searchResults, setSearchResults] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await axios.post<{ wikiPost: Post[] }>(
//           `${process.env.REACT_APP_WIKI_API_URL}/searchByTag`,
//           { tag: query }
//         );

//         setSearchResults(response.data.wikiPost || []);
//       } catch (err: any) {
//         setError(
//           err.response?.data?.error || "Failed to fetch search results."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (query) {
//       fetchSearchResults();
//     }
//   }, [query]);

//   return (
//     <div>
//       <h1>Search Results for: {query}</h1>
//       {loading && <p>Loading...</p>}
//       {error && <p className="error">{error}</p>}

//       {searchResults.length > 0 ? (
//         searchResults.map((post) => (
//           <div key={post._id} className="post-result">
//             <div className="post-item">
//               <img
//                 src={post.image}
//                 alt={post.title}
//                 className="post-image"
//                 style={{ width: "150px", height: "150px", objectFit: "cover" }}
//               />
//               <div className="post-details">
//                 <h3>{post.title}</h3>
//                 <div className="author-info">
//                   <p>
//                     <strong>Author:</strong> {post.author.fullname}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {post.author.email}
//                   </p>
//                 </div>
//                 <div className="tags">
//                   <strong>Tags:</strong> {post.tags.join(", ")}
//                 </div>
//                 <div className="views-and-status">
//                   <p>
//                     <strong>Views:</strong> {post.views}
//                   </p>
//                   <p>
//                     <strong>Published:</strong> {post.published ? "Yes" : "No"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No results found.</p>
//       )}
//     </div>
//   );
// };

// export default SearchPage;
const SearchPage: React.FC = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.post<{ wikiPost: Post[] }>(
          `${process.env.REACT_APP_WIKI_API_URL}/searchByTag`,
          { tag: query }
        );

        setSearchResults(response.data.wikiPost || []);
      } catch (err: any) {
        setError(
          err.response?.data?.error || "Failed to fetch search results."
        );
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  const handlePostClick = async (post: Post) => {
    try {
      await axios.get(`http://localhost:4000/pages/${post._id}`);
      navigate(`/postpage/${post._id}`, {
        state: { post },
      });
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  };

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {searchResults.length > 0 ? (
        searchResults.map((post) => (
          <div
            key={post._id}
            className="post-result"
            onClick={() => handlePostClick(post)}
          >
            <div className="post-item">
              <img
                src={post.image}
                alt={post.title}
                className="post-image"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
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

                  {/* Tags */}
                  <div className="tags-info">
                    <FaTag />
                    <span>{post.tags.join(", ")}</span>
                  </div>
                </div>

                <div className="views-and-status">
                  {/* Views */}
                  <div>
                    <FaEye />
                    <span>{post.views}</span>
                  </div>

                  {/* Published Status */}
                  <div>
                    <FaCheckCircle />
                    <span>{post.published ? "Yes" : "No"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
