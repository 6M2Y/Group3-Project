import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/MainContent.css";

interface PostPageProps {
  isAuthenticated: boolean;
  userId: string | null;
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

interface AddCommentResponse {
  message: string;
  comment: Comment;
}
const availableTags = [
  "Hero",
  "Villain",
  "Adventure",
  "Powers",
  "Universe",
  "Origins",
];

interface IncrementViewsResponse {
  views: number;
}

const PostPage: React.FC = () => {
  //const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { post, isAuthenticated } = location.state as {
    post: any;
    isAuthenticated: boolean;
  };
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  // Increment views when the page is loaded
  useEffect(() => {
    console.log(post._id);
    const incrementViews = async () => {
      try {
        const response = await axios.put<IncrementViewsResponse>(
          `http://localhost:4000/pages/${post._id}/views`
        );
        // You can also update the state to reflect the new view count
        post.views = response.data.views;
      } catch (error) {
        console.error("Error incrementing views:", error);
      }
    };

    incrementViews(); // Call the function to increment views when the component is mounted
  }, [post._id]); // This effect will run when the post's ID changes

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<AddCommentResponse>(
        `http://localhost:4000/comment`,
        {
          postId: post._id,
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setComments([...comments, response.data.comment]);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:4000/posts/${post._id}`, {
        content: editedContent,
      });
      setIsEditing(false);
      // Optionally, update the post content in the state
      post.content = editedContent;
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:4000/posts/${post._id}`);
      navigate("/"); // Redirect to home page after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
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
  return (
    <div>
      <p>
        <img
          src={`http://localhost:4000${post.image}`}
          alt={post.title}
          className="image-300"
        />
      </p>
      <h1>{post.title}</h1>
      {isEditing ? (
        <div>
          <textarea value={editedContent} onChange={handleEditChange} />
          <button onClick={handleEditSubmit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <p>{stripHtmlTags(post.content)}</p>
      )}
      <p>Tags: {post.tags.join(", ")}</p>
      <p>Views: {post.views}</p>

      {isAuthenticated && (
        <div>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}

      <h4>Versions:</h4>
      <ul>
        {post.versions.map((version: any) => (
          <li key={version._id}>
            <p>Content: {version.content}</p>
            <p>Editor: {version.editor}</p>
            <p>Date: {formatDate(version.date)}</p>
            <p>Tags: {version.tags.join(", ")}</p>
          </li>
        ))}
      </ul>

      <h4>Add Comment</h4>

      <form onSubmit={handleCommentSubmit}>
        {!isAuthenticated && <p>Please sign in to add a comment.</p>}
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add a comment"
          rows={4}
          cols={50}
          disabled={!isAuthenticated}
        />
        <button type="submit" disabled={!isAuthenticated}>
          Submit
        </button>
      </form>

      <h4>Comments</h4>
      <ul>
        {comments.map((comment: any, index: number) => (
          <li key={index}>{comment.content}</li>
        ))}
      </ul>
      <div className="dates">
        <span>Created At: {formatDate(post.createdAt)}</span>
        <span>Updated At: {formatDate(post.updatedAt)}</span>
      </div>
    </div>
  );
};

export default PostPage;
