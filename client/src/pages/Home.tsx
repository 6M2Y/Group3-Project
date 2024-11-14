import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface HomePageProps {
  isAuthenticated: boolean;
  userId: string | null;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  // Add other fields as necessary
}

interface PostCountResponse {
  postCount: number;
}
const Home : React.FC<HomePageProps> = ({ isAuthenticated, userId }) => {
    const [posts, setPosts] =  useState<Post[]>([]);
    const [postCount, setPostCount] = useState(0);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
              console.log('User ID:', userId); // Log the userId to verify its value
              const config = isAuthenticated ? {
                headers: {
                    Authorization: `Bearer ${userId}`, // Replace with your actual token
                },
            } : {};
            console.log("here")
              const response = isAuthenticated
              ? await axios.get<Post[]>(`http://localhost:4000/user/posts`,config)
              : await axios.get<Post[]>(`http://localhost:4000/posts`);
              console.log('Fetching All Posts...');

                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
                
            }
        };
        

        fetchPosts();

    }, [isAuthenticated, userId]);

    return (
        <div>
            <h1>Welcome to SuperHeroes HomePage</h1>
            <div>
            <h2>Total posts:</h2>
                {posts.length > 0 ? (
                  <ul>
                    {posts.map((post) => (
                        <li key={post._id}>
                            <h2>Post Title: {post.title}</h2>
                            <p>Post Contnet: {post.content}</p>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p>No posts available</p>
                )}
            </div>
        </div>
    );
};

export default Home;