import React from "react";
import "../Styles/MainContent.css";

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
export const Home = () => {
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
        <h3>All Posts</h3>
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
            <li key={index} className="latest-post">
              <p className="latest-post-title">{latestPost.title}</p>
              <p className="latest-post-author">{latestPost.author}</p>
              <p className="latest-post-date">{latestPost.createdAt}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  // return <div>Home</div>;
  //suzan
  // list of cards
  // from database
};
export default Home;
