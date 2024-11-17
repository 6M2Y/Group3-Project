// export default PostPage;
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/MainContent.css";
import "../Styles/Comments.css"; // New CSS file for styling comments
import { useUser } from "../utils/UserContext";
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
  const location = useLocation();
  const navigate = useNavigate();
  const { post, isAuthenticated } = location.state as {
    post: Post;
    isAuthenticated: boolean;
  };

  const { signedUser } = useUser();

  const [comments, setComments] = useState<AddCommentResponse[]>([]);
  const [loadingComments, setLoadingComments] = useState<boolean>(true);
  const [comment, setComment] = useState("");
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [originalCommentContent, setOriginalCommentContent] = useState<
    string | null
  >(null); // Store original content

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

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

  return (
    <div className="post-page">
      <img
        src={`http://localhost:4000${post.image}`}
        alt={post.title}
        className="post-image"
      />
      <h1>{post.title}</h1>
      {isEditingPost ? (
        <div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleEditPost}>Save</button>
          <button onClick={() => setIsEditingPost(false)}>Cancel</button>
        </div>
      ) : (
        <p>{post.content}</p>
      )}
      <p>Tags: {post.tags.join(", ")}</p>
      <p>Views: {post.views}</p>
      <div className="dates">
        <span>Created At: {formattedCreatedAt}</span>
        <span>Updated At: {formattedUpdatedAt}</span>
      </div>

      {isAuthenticated && (
        <div>
          <button onClick={() => setIsEditingPost(true)}>Edit</button>
        </div>
      )}

      <h4>Add Comment</h4>
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
