// export default PostPage;
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/MainContent.css";
import "../Styles/Comments.css"; // New CSS file for styling comments
import { useUser } from "../utils/UserContext";

import WikIEditorPage from "./WikIEditorPage";

import { lookInSession } from "../utils/session";
import { toast } from "react-toastify";

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

interface SaveVersionResponse {
  message: string;
  post: {
    _id: string;
    title: string;
    summary: string;
    content: string;
    tags: string[];
    versions: {
      title: string;
      summary: string;
      content: string;
      tags: string[];
      image?: string;
      published: boolean;
      editor: string;
      date: string;
    }[];
    views: number;
    comments: string[];
    published: boolean;
    createdAt: string;
    updatedAt: string;
    image?: string;
  };
}
interface Post {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  versions: Version[];
  views: number;
  comments: string[];
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface AddCommentResponse {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

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
  // const [comments, setComments] = useState<Comment[]>(post.comments);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [previewPost, setPreviewPost] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(post.content);

  const { signedUser } = useUser();

  const [comments, setComments] = useState<AddCommentResponse[]>([]);
  const [loadingComments, setLoadingComments] = useState<boolean>(true);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [originalCommentContent, setOriginalCommentContent] = useState<
    string | null
  >(null); // Store original content

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
  //     2,
  //     "0"
  //   )}-${String(date.getDate()).padStart(2, "0")}`;
  // };

  // Memoized dates to avoid recalculation on every render
  const formattedCreatedAt = useMemo(
    () => formatDate(post.createdAt),
    [post.createdAt]
  );
  const formattedUpdatedAt = useMemo(
    () => formatDate(post.updatedAt),
    [post.updatedAt]
  );
  const fetchComments = async () => {
    try {
      const response = await axios.get<AddCommentResponse[]>(
        `${process.env.REACT_APP_WIKI_API_URL}/posts/${post._id}/comments`
      );
      setComments(response.data);
      console.log(response.data);
      setLoadingComments(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setLoadingComments(false);
    }
  };
  useEffect(() => {
    if (post._id) {
      fetchComments();
    }
  }, [post._id]);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        const response = await axios.put<IncrementViewsResponse>(
          `${process.env.REACT_APP_WIKI_API_URL}/pages/${post._id}/views`
        );
        post.views = response.data.views;
      } catch (error) {
        console.error("Error incrementing views:", error);
      }
    };

    incrementViews();
  }, [post._id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<AddCommentResponse>(
        `${process.env.REACT_APP_WIKI_API_URL}/comment`,
        { postId: post._id, content: comment },
        { headers: { Authorization: `Bearer ${signedUser?.access_token}` } }
      );

      setComments([...comments, response.data]);

      const handleEditClick = () => {
        setIsEditing(true); // Enable edit mode
      };

      const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedContent(e.target.value);
      };

      const handleEditSubmit = async (updatedPost: any) => {
        try {
          console.log("Updated Post Payload:", updatedPost);

          const response = await axios.put<SaveVersionResponse>(
            `http://localhost:4000/posts/${post._id}/version`,
            {
              title: updatedPost.title,
              summary: updatedPost.summary,
              content: updatedPost.content,
              tags: updatedPost.tags,
              image: updatedPost.image,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          setIsEditing(false);
          post.title = updatedPost.title;
          post.summary = updatedPost.summary;
          post.content = updatedPost.content;
          post.tags = updatedPost.tags;
          post.image = updatedPost.image;
          post.versions.push(response.data.post.versions.slice(-1)[0]); // Add the new version to the post
          console.log(post.image);
        } catch (error) {
          console.error("Error updating post:", error);
        }
      };
      const handleDeleteClick = async () => {
        try {
          const token = localStorage.getItem("token"); // or wherever you store your token
          console.log("Token here:", token); // Log the token to check its format
          if (!token) {
            throw new Error("No token found");
          }
          await axios.delete(`http://localhost:4000/delete/${post._id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          toast.success("Post deleted successfully!");

          navigate("/"); // Redirect to home page after deletion
        } catch (error) {
          console.error("Error deleting post:", error);
        }
      };
      //clean up the content before displaying it.
      const stripHtmlTags = (str: string) => {
        return str.replace(/<\/?[^>]+(>|$)/g, "");
      };

      // Add the new comment to the existing comments
      setComments((prevComments) => [...prevComments, response.data]);

      // Clear the comment input field
      setComment("");
      toast.success("You comments is now added");
      fetchComments(); // in order to add new comments
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleEditPost = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_WIKI_API_URL}/posts/${post._id}`,
        { content: editedContent },
        { headers: { Authorization: `Bearer ${signedUser?.access_token}` } }
      );
      setIsEditingPost(false);
      post.content = editedContent;
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };
  const handleDeleteComment = async (commentId: string) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_WIKI_API_URL}/comment/${commentId}`,
        { headers: { Authorization: `Bearer ${signedUser?.access_token}` } }
      );
      setComments(comments.filter((comment) => comment._id !== commentId));
      toast.success("Comment deleted successfully");
    } catch (error) {
      const errorMessage =
        (error as any)?.response?.data?.message ||
        "An error occurred while deleting the comment.";
      toast.error(errorMessage);
    }
  };
  const handleEditComment = (commentId: string, currentContent: string) => {
    // Enable editing mode and store the original content
    setEditingCommentId(commentId);
    setEditedCommentContent(currentContent);
    setOriginalCommentContent(currentContent); // Save the original content for cancellation
  };

  const handleCancelCommentEdit = () => {
    // Cancel the edit and restore the original content
    if (originalCommentContent !== null) {
      setEditedCommentContent(originalCommentContent); // Reset to original content
    }
    setOriginalCommentContent(null); // Clear the original content reference
    setEditingCommentId(null); // Exit the editing mode
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveCommentEdit = async (commentId: string) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_WIKI_API_URL}/comment/${commentId}`,
        { content: editedCommentContent },
        { headers: { Authorization: `Bearer ${signedUser?.access_token}` } }
      );
      // Update the comments list with the new edited comment
      setComments(
        comments.map((comment) =>
          comment._id === commentId
            ? { ...comment, content: editedCommentContent }
            : comment
        )
      );
      setEditingCommentId(null); // Exit edit mode
      setEditedCommentContent(""); // Clear edited content
      setOriginalCommentContent(null); // Clear the original content
      toast.success("Comment updated successfully");
    } catch (error) {
      toast.error("Failed to edit comment");
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
  const handleEditSubmit = async (updatedPost: any) => {
    try {
      console.log("Updated Post Payload:", updatedPost);

      const response = await axios.put<SaveVersionResponse>(
        `http://localhost:4000/posts/${post._id}/version`,
        {
          title: updatedPost.title,
          summary: updatedPost.summary,
          content: updatedPost.content,
          tags: updatedPost.tags,
          image: updatedPost.image,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setIsEditing(false);
      post.title = updatedPost.title;
      post.summary = updatedPost.summary;
      post.content = updatedPost.content;
      post.tags = updatedPost.tags;
      post.image = updatedPost.image;
      post.versions.push(response.data.post.versions.slice(-1)[0]); // Add the new version to the post
      console.log(post.image);
    } catch (error) {
      console.error("Error updating post:", error);
    }
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
      <h1>Title: {post.title}</h1>
      {isEditing ? (
        <WikIEditorPage
          post={post}
          onSave={(updatedContent) => {
            handleEditSubmit({ ...post, content: updatedContent });
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <p>Content: {stripHtmlTags(post.content)}</p>
      )}
      <p>Tags: {post.tags.join(", ")}</p>

      {isAuthenticated && !isEditing && (
        <div>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
      <h2>Post statistics:</h2>
      <p>Views: {post.views}</p>
      <h3>Versions:</h3>
      <ul>
        {post.versions.map((version: any, index: number) => (
          <li key={index}>
            <p>Title: {version.title}</p>
            <p>Content: {stripHtmlTags(version.content)}</p>
            <p>Editor: {version.editor}</p>
            <p>Date: {formatDate(version.date)}</p>
            <p>Tags: {version.tags.join(", ")}</p>
          </li>
        ))}
      </ul>
      <h3>Add Comment</h3>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          rows={4}
          cols={50}
          disabled={!isAuthenticated}
        />
        <button type="submit" disabled={!isAuthenticated}>
          Add comment
        </button>
      </form>
      <div className="post-page">
        <h4>Comments</h4>
        {loadingComments ? (
          <p>Loading comments...</p>
        ) : (
          <div className="comments-section">
            {comments.length === 0 ? (
              <p>No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="comment-box">
                  {/* Edit comment inline using textarea */}
                  {editingCommentId === comment._id ? (
                    <div>
                      <textarea
                        value={editedCommentContent}
                        onChange={(e) =>
                          setEditedCommentContent(e.target.value)
                        }
                        style={{
                          width: "100%",
                          minHeight: "100px",
                          border: "1px solid #ddd",
                          padding: "5px",
                        }}
                      />
                      <div className="comment-actions">
                        <button
                          onClick={() => handleSaveCommentEdit(comment._id)}
                        >
                          Save
                        </button>
                        <button onClick={handleCancelCommentEdit}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p>{comment.content}</p>
                      <div className="comment-actions">
                        <button
                          onClick={() =>
                            handleEditComment(comment._id, comment.content)
                          }
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;