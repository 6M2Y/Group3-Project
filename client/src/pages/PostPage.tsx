import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import "../Styles/MainContent.css";
import { toast } from "react-toastify";

import WikIEditorPage from './WikIEditorPage';

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


const PostPage: React.FC = () => {
    //const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const { post, isAuthenticated } = location.state as { post: any, isAuthenticated: boolean };
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<Comment[]>(post.comments);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(post.content);
    const [previewPost, setPreviewPost] = useState<any>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(post.content);

    


    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post<AddCommentResponse>(`http://localhost:4000/comment`, {
                postId: post._id,
                content: comment
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setComments([...comments, response.data.comment]);
            setComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true); // Enable edit mode
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedContent(e.target.value);
    };
  
const handleEditSubmit = async (updatedPost: any) => {
    try {
        console.log("Updated Post Payload:", updatedPost);

        const response = await axios.put<SaveVersionResponse>
        (`http://localhost:4000/posts/${post._id}/version`, {
            title: updatedPost.title,
            summary: updatedPost.summary,
            content: updatedPost.content,
            tags: updatedPost.tags,
            image: updatedPost.image,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        setIsEditing(false);
        post.title = updatedPost.title;
        post.summary = updatedPost.summary;
        post.content = updatedPost.content;
        post.tags = updatedPost.tags;
        post.image = updatedPost.image;
        post.versions.push(response.data.post.versions.slice(-1)[0]); // Add the new version to the post
        console.log(post.image)
    } catch (error) {
        console.error('Error updating post:', error);
       
    }
};
    const handleDeleteClick = async () => {
        try {
            const token = localStorage.getItem('token'); // or wherever you store your token
            console.log('Token here:', token); // Log the token to check its format
            if (!token) {
                throw new Error('No token found');
            }
            await axios.delete(`http://localhost:4000/delete/${post._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success("Post deleted successfully!");

            navigate('/'); // Redirect to home page after deletion
        } catch (error) {
            console.error('Error deleting post:', error);
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
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
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
        <p>Tags: {post.tags.join(', ')}</p>
        
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
                    <p>Tags: {version.tags.join(', ')}</p>
                </li>
            ))}
        </ul>
        <h3>Add Comment</h3>
        <form onSubmit={handleCommentSubmit}>
            <textarea
                value={comment}
                onChange={handleCommentChange}
                disabled={!isAuthenticated}
            />
            {!isAuthenticated && <p>Please sign in to add a comment.</p>}
            <button type="submit" disabled={!isAuthenticated}>Submit</button>
        </form>
        <h4>Comments</h4>
        <ul>
            {comments.map((comment: any, index: number) => (
                <li key={index}>{comment}</li>
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

/*
    return (
            <div>
                <p><img src={`http://localhost:4000${post.image}`} alt={post.title} className="image-300" /></p>
                <h1>{post.title}</h1>
                {isEditing ? (
                <WikIEditorPage  post={post} onSave={handleEditSubmit} onCancel={() => setIsEditing(false)} /> // Pass onSave and onCancel props
            ) : (
                 <p>{stripHtmlTags(post.content)}</p>
            )}
                <p>Tags: {post.tags.join(', ')}</p>
                <p>Views: {post.views}</p>
                
                {isAuthenticated  &&  !isEditing && ( 
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
                            <p>Tags: {version.tags.join(', ')}</p>
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
                <button type="submit" disabled={!isAuthenticated}>Submit</button>
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

export default PostPage;*/