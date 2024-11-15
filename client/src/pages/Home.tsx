import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
 
interface PostCountResponse {
    postCount: number;
}

const Home: React.FC<HomeProps> = ({ isAuthenticated = false, userId = null }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<{ [key: string]: User }>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [latestPosts, setLatestPosts] = useState<latestPostType[]>([]);

    const postsPerPage = 6;
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
  
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log('User ID:', userId); // Log the userId to verify its value
                const config = isAuthenticated ? {
                    headers: {
                        Authorization: `Bearer ${userId}`, // Replace with your actual token
                    },
                } : {};
                console.log("here");
                const response = isAuthenticated
                    ? await axios.get<Post[]>(`http://localhost:4000/user/posts`, config)
                    : await axios.get<Post[]>(`http://localhost:4000/posts`);
                console.log('Fetching All Posts...');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchLatestPosts();
        fetchPosts();
    }, [isAuthenticated, userId]);

    const fetchUser = async (userId: string) => {
        if (!users[userId]) {
            try {
                const response = await axios.get<User>(`http://localhost:4000/users/${userId}`);
                setUsers(prevUsers => ({ ...prevUsers, [userId]: response.data }));
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }
    };

    useEffect(() => {
        posts.forEach(post => {
            post.versions.forEach(version => {
                fetchUser(version.editor);
            });
        });
    }, [posts]);

    //clean up the content before displaying it.
    const stripHtmlTags = (str: string) => {
        return str.replace(/<\/?[^>]+(>|$)/g, "");
    };
//To extract just the date from the createdAt field
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getFirst200Characters = (content: string) => {
  const strippedContent = stripHtmlTags(content);
  return strippedContent.length > 200 ? strippedContent.substring(0, 200) + '...' : strippedContent;
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
            {availableTags.map((tag, index) => (
              <div className="tag-item" key={index}>
                <span className="tag-name">{tag}</span>
                <span className="tag-count">(12 posts)</span>
              </div>
            ))}
          </div>
        </div>

            
                   


 {/* Part 2: All Posts */}
 <div className="posts-section">
        <h3>All Posts For You</h3>
        <div className="posts-grid">
          {currentPosts.map((post) => (
            <div className="post-card" key={post._id} onClick={() => navigate(`/postpage/${post._id}`,{ state: { post, isAuthenticated, userId } })} style={{ cursor: 'pointer' }}>
              <img src={`http://localhost:4000${post.image}`} alt={post.title} className="image-300" />
              <h4 className="post-title">{post.title}</h4>
              <p className="post-summary">{getFirst200Characters(post.content)}</p>
              
              <div>{post.versions.map((version) => (
                                    <p>By {users[version.editor]?.name || 'Loading...'}</p>
                            ))}</div>
              <p className="post-date">{formatDate(post.createdAt)}</p>              
              <span className="post-tag">{post.tags.join(', ')}</span>
            </div>
            
          ))}
        </div>
        <div className='pagination'>
                {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
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