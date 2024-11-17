// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../Styles/MainContent.css";
// import { UserAuthType } from "../utils/useAuthForm";
// import { toast } from "react-toastify";
// import LatestPostCard from "../Components/latestPostCard";

// interface HomeProps {
//   isAuthenticated?: boolean; // Make isAuthenticated optional
//   userId?: string | null; // Make userId optional
// }

// interface Version {
//   tags: string[];
//   content: string;
//   editor: string;
//   _id: string;
//   date: string;
// }

// interface Post {
//     _id: string;
//     title: string;
//     content: string;
//     author:string;
//     tags: string[];
//     versions: Version[];
//     views: number;
//     comments: string[]; // You can replace `any` with a more specific type if you have a structure for comments
//     image: string;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
// }

// interface User {
//     _id: string;
//     fullname: string;
//     // Add other user fields as necessary
// }
// const availableTags = [
//   "Hero",
//   "Villain",
//   "Adventure",
//   "Powers",
//   "Universe",
//   "Origins",
// ];

// export interface latestPostType {
//   author: {
//     fullname: string;
//     email: string;
//   };
//   title: string;
//   tags: string[];
//   updatedAt: string; // ISO string for date
// }
// interface ApiResponse {
//   wikiPost: latestPostType[];
// }

// interface TagCount {
//   tag: string;
//   count: number;
// }

// interface PostCountResponse {
//   postCount: number;
// }
//     const postsPerPage = 9;
//     const navigate = useNavigate();
//   /*
//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 console.log('User ID:', userId); // Log the userId to verify its value
//                 const config = isAuthenticated ? {
//                     headers: {
//                         Authorization: `Bearer ${userId}`, // Replace with your actual token
//                     },
//                 } : {};
//                 console.log("here");
//                 const response = isAuthenticated
//                     ? await axios.get<Post[]>(`http://localhost:4000/user/posts`, config)
//                     : await axios.get<Post[]>(`http://localhost:4000/posts`);
//                 console.log('Fetching All Posts...');
//                 //console.log('Posts response:', response.data);
//                 setPosts(response.data);
//             } catch (error) {
//                 console.error('Error fetching posts:', error);
//             }
//         };

//         const fetchLatestPosts = () => {
//           axios
//             .get<ApiResponse>(`${process.env.REACT_APP_WIKI_API_URL}/latest-posts`)
//             .then(({ data }) => {
//               setLatestPosts(data.wikiPost);
//             })
//             .catch((err) => {
//               toast.error(err.message);
//             });
//         };
//         fetchLatestPosts();
//         fetchPosts();
//     }, [isAuthenticated, userId]);*/

//     useEffect(() => {
//       const fetchUser = async (userId: string) => {
//         if (!users[userId]) {
//           try {
//             const response = await axios.get<User>(`http://localhost:4000/users/${userId}`);
//             const userData: User = response.data; // Type assertion
//             setUsers(prevUsers => ({ ...prevUsers, [userId]: userData }));
//           } catch (error) {
//             console.error('Error fetching user:', error);
//             setUsers(prevUsers => ({
//               ...prevUsers,
//               [userId]: { _id: userId, fullname: 'Unknown User' } as User,
//             }));
//           }
//         }
//       };

//       if (posts.length > 0) {
//         posts.forEach(post => {
//           fetchUser(post.author);
//           post.versions.forEach(version => {
//             fetchUser(version.editor);
//           });
//         });
//       }
//     }, [posts, users]);

//   const handlePostClick = async (post : Post) => {
//     try {
//       await axios.get(`http://localhost:4000/pages/${post._id}`);
//       navigate(`/postpage/${post._id}`, { state: { post, isAuthenticated, userId } });
//     } catch (error) {
//       console.error("Error incrementing views:", error);
//     }
//   };
//     //clean up the content before displaying it.
// const stripHtmlTags = (str: string) => {
//         return str.replace(/<\/?[^>]+(>|$)/g, "");
//     };
// //To extract just the date from the createdAt field

// const formatDate = (dateString: string) => { };
// const Home: React.FC<HomeProps> = ({
//   isAuthenticated = false,
//   userId = null,
// }) => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [users, setUsers] = useState<{ [key: string]: User }>({});
//   const [currentPage, setCurrentPage] = useState(1);

//   const [latestPosts, setLatestPosts] = useState<latestPostType[]>([]);
//   const [tagCounts, setTagCounts] = useState<{ tag: string; count: number }[]>(
//     []
//   );
//   const postsPerPage = 6;
//   const navigate = useNavigate();

//   const fetchLatestPosts = () => {
//     axios
//       .get<ApiResponse>(`${process.env.REACT_APP_WIKI_API_URL}/latest-posts`)
//       .then(({ data }) => {
//         setLatestPosts(data.wikiPost);
//       })
//       .catch((err) => {
//         toast.error(err.message);
//       });
//   };

//   const fetchTagCounts = async () => {
//     try {
//       const response = await axios.get<TagCount[]>(
//         `${process.env.REACT_APP_WIKI_API_URL}/tags/counts`
//       );

//       const mergedTagCounts = availableTags.map((tag) => {
//         // Look for the tag in the API response
//         const apiTag = response.data.find((t) => t.tag === tag);

//         // If found, use its count. Otherwise, set count to 0.
//         return { tag, count: apiTag ? apiTag.count : 0 };
//       });
//       setTagCounts(mergedTagCounts); // Assume `setTagCounts` accepts an array of TagCount
//       console.log(response.data);
//     } catch (error) {
//       {
//         toast.error("An unexpected error occurred.");
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         console.log("User ID:", userId); // Log the userId to verify its value
//         const config = isAuthenticated
//           ? {
//               headers: {
//                 Authorization: `Bearer ${userId}`, // Replace with your actual token
//               },
//             }
//           : {};
//         console.log("here");
//         const response = isAuthenticated
//           ? await axios.get<Post[]>(`http://localhost:4000/user/posts`, config)
//           : await axios.get<Post[]>(`http://localhost:4000/posts`);
//         console.log("Fetching All Posts...");
//         setPosts(response.data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts();
//   }, [isAuthenticated, userId]);

//   const fetchUser = async (userId: string) => {
//     if (!users[userId]) {
//       try {
//         const response = await axios.get<User>(
//           `http://localhost:4000/users/${userId}`
//         );
//         setUsers((prevUsers) => ({ ...prevUsers, [userId]: response.data }));
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     posts.forEach((post) => {
//       post.versions.forEach((version) => {
//         fetchUser(version.editor);
//       });
//     });
//   }, [posts]);

//   useEffect(() => {
//     fetchLatestPosts();
//     fetchTagCounts();
//   }, []);

//   const loadByTag = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const tag = e.currentTarget.textContent
//       ?.match(/^[^\(]*/)?.[0]
//       .toLowerCase();
//     console.log("Selected tag:", tag);
//   };

//   //clean up the content before displaying it.
//   const stripHtmlTags = (str: string) => {
//     return str.replace(/<\/?[^>]+(>|$)/g, "");
//   };
//   //To extract just the date from the createdAt field
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   const getFirst200Characters = (content: string) => {
//     const strippedContent = stripHtmlTags(content);
//     return strippedContent.length > 200
//       ? strippedContent.substring(0, 200) + "..."
//       : strippedContent;
//   };
//   // Calculate the posts to display on the current page
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

//   // Change page
//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   return (
//     <div className="main-content">
//       {/* Part 1: Tags Section */}
//       <div className="tags-section">
//         <h3>Tags</h3>
//         <div className="tags-list">
//           {tagCounts.map(({ tag, count }) => (
//             <button
//               onClick={loadByTag} // Replace with `loadByTag` or similar function
//               className="tag-button"
//               key={tag}
//             >
//               {tag}
//               <span className="tag-count">({count} posts)</span>
//             </button>
//           ))}
//         </div>
//       </div>

//  {/* Part 2: All Posts */}
//  <div className="posts-section">
//         <h2 style={{ color: '#ff5722', fontSize: '24px', textAlign: 'center' }}>Your Ultimate Superhero Hub</h2>
//         <div className="posts-grid">
//           {currentPosts.map((post) => (
//             <div className="post-card" key={post._id} onClick={() => handlePostClick(post)} style={{ cursor: 'pointer' }}>
//               <img src={`http://localhost:4000${post.image}`} alt={post.title} className="image-300" />
//               <h4 className="post-title">{post.title}</h4>
//               <p className="post-summary">{getFirst200Characters(post.content)}</p>
//               <p className="post-summary">By: {users[post.author]?.fullname || 'Loading...'}</p>

//              {/*  <div>{post.versions.map((version) => (
//                                     <p key={version._id}>By {users[version.editor]?.fullname || 'Loading...'}</p>
//                             ))}</div> */}
//               <p className="post-date">{formatDate(post.createdAt)}</p>
//               <span className="post-tag">{post.tags.join(', ')}</span>
//             </div>
//           ))}
//         </div>
//         <div className="pagination">
//           {Array.from(
//             { length: Math.ceil(posts.length / postsPerPage) },
//             (_, index) => (
//               <button key={index + 1} onClick={() => paginate(index + 1)}>
//                 {index + 1}
//               </button>
//             )
//           )}
//         </div>
//       </div>

//       {/* Part 3: Latest Posts */}
//       <div className="latest-posts-section">
//         <h3>Latest Posts</h3>
//         <ul>
//           {latestPosts.map((latestPost, index) => (
//             <LatestPostCard content={latestPost} key={index} />
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/MainContent.css";
import { UserAuthType } from "../utils/useAuthForm";
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
  author: string;
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
  fullname: string;
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
interface PostCountResponse {
  postCount: number;
}
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
  const postsPerPage = 9;
  const navigate = useNavigate();
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

  /* useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("User ID:", userId); // Log the userId to verify its value
        const config = isAuthenticated
          ? {
              headers: {
                Authorization: `Bearer ${userId}`, // Replace with your actual token
              },
            }
          : {};
        console.log("here");
        const response = isAuthenticated
          ? await axios.get<Post[]>(`http://localhost:4000/user/posts`, config)
          : await axios.get<Post[]>(`http://localhost:4000/posts`);
        console.log("Fetching All Posts...");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [isAuthenticated, userId]); */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(`http://localhost:4000/posts`);
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
            `http://localhost:4000/user/posts`,
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
    const fetchUser = async (userId: string) => {
      if (!users[userId]) {
        try {
          const response = await axios.get<User>(
            `http://localhost:4000/users/${userId}`
          );
          const userData: User = response.data; // Type assertion
          setUsers((prevUsers) => ({ ...prevUsers, [userId]: userData }));
        } catch (error) {
          console.error("Error fetching user:", error);
          setUsers((prevUsers) => ({
            ...prevUsers,
            [userId]: { _id: userId, fullname: "Unknown User" } as User,
          }));
        }
      }
    };
    /* if (posts.length > 0) {
      posts.forEach(post => {
        fetchUser(post.author);
        post.versions.forEach(version => {
          fetchUser(version.editor);
        });
      });
    } */
    if (posts.length > 0) {
      const uniqueUserIds = new Set<string>();
      posts.forEach((post) => {
        uniqueUserIds.add(post.author);
        post.versions.forEach((version) => {
          uniqueUserIds.add(version.editor);
        });
      });
      uniqueUserIds.forEach((userId) => fetchUser(userId));
    }
  }, [posts, users]);
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
  const handlePostClick = async (post: Post) => {
    try {
      await axios.get(`http://localhost:4000/pages/${post._id}`);
      navigate(`/postpage/${post._id}`, {
        state: { post, isAuthenticated, userId },
      });
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  };
  //clean up the content before displaying it.
  const stripHtmlTags = (str: string) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };
  //To extract just the date from the createdAt field
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const getFirst200Characters = (content: string) => {
    const strippedContent = stripHtmlTags(content);
    return strippedContent.length > 200
      ? strippedContent.substring(0, 200) + "..."
      : strippedContent;
  };
  // Calculate the posts to display on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
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
        </div>
      </div>
      {/* Part 2: All Posts */}
      <div className="posts-section">
        <h2 style={{ color: "#ff5722", fontSize: "24px", textAlign: "center" }}>
          Your Ultimate Superhero Hub
        </h2>
        <div className="posts-grid">
          {currentPosts.map((post) => (
            <div
              className="post-card"
              key={post._id}
              onClick={() => handlePostClick(post)}
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
              <p className="post-summary">
                By: {users[post.author]?.fullname || "Loading..."}
              </p>
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

        {/* Part 3: User's Posts */}
        {isAuthenticated && (
          <div className="posts-section">
            <h2>Your Published Posts</h2>

            {userPosts.map((post) => (
              <ul
                key={post._id}
                onClick={() => handlePostClick(post)}
                style={{ cursor: "pointer" }}
              >
                <li>{post.title}</li>
              </ul>
            ))}
          </div>
        )}
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
