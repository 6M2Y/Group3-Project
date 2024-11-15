import { useEffect, useState } from "react";
import "../Styles/MainContent.css";
import { UserAuthType } from "../utils/useAuthForm";
import axios from "axios";
import { toast } from "react-toastify";
import LatestPostCard from "../Components/latestPostCard";

const availableTags = [
  "Hero",
  "Villain",
  "Adventure",
  "Powers",
  "Universe",
  "Origins",
];

const posts = [
  {
    id: 1,
    image: "https://via.placeholder.com/300",
    title: "The Rise of Heroes",
    summary:
      "This post is about the rise of superheroes in a world full of dangers.",
    author: "John Doe",
    createdAt: "2024-11-14",
    tag: "Hero",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300",
    title: "Villains of the Universe",
    summary: "A deep dive into the villains that shaped the universe.",
    author: "Jane Doe",
    createdAt: "2024-11-10",
    tag: "Villain",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/300",
    title: "Adventure Awaits",
    summary: "Join our heroes on a journey across dimensions.",
    author: "Alice Smith",
    createdAt: "2024-11-12",
    tag: "Adventure",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/300",
    title: "The Power of Legends",
    summary: "Exploring the untold powers of ancient legends.",
    author: "Bob Brown",
    createdAt: "2024-11-11",
    tag: "Powers",
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
          {posts.map((post) => (
            <div className="post-card" key={post.id}>
              <img src={post.image} alt={post.title} className="post-image" />
              <h4 className="post-title">{post.title}</h4>
              <p className="post-summary">{post.summary}</p>
              <p className="post-author">By {post.author}</p>
              <p className="post-date">{post.createdAt}</p>
              <span className="post-tag">{post.tag}</span>
            </div>
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
