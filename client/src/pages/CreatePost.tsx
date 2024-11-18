import { Navigate } from "react-router-dom";
import { useUser } from "../utils/UserContext";
import React, { useEffect, useState }  from "react";
import WikIEditorPage from "./WikIEditorPage";
import { toast } from "react-toastify";
import axios from "axios";
import LatestPostCard from "../Components/latestPostCard";
import {
  ApiResponse,
  HomeProps,
  latestPostType,
  Post,
  TagCount,
  User,
} from "../Common/interfaces";

const availableTags = [
  "Hero",
  "Villain",
  "Adventure",
  "Powers",
  "Universe",
  "Origins",
];
export const CreatePost: React.FC  = () => {
  // const [pageState, setPageState] = useState("editor");
  const { signedUser } = useUser(); //whether the user is in session
  const [latestPosts, setLatestPosts] = useState<latestPostType[]>([]);
  const [tagCounts, setTagCounts] = useState<{ tag: string; count: number }[]>([]);
  const [post, setPost] = useState({
    _id: '',
    title: '',
    content: '',
    tags: [],
    versions: [],
    views: 0,
    comments: [],
    image: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
  });

  const handleSave = (content: string) => {
    // Logic to save the new post
    console.log('Post saved:', content);
    // You can add your save logic here, such as making an API call to save the post
};

const handleCancel = () => {
    // Logic to handle cancel action
    console.log('Edit canceled');
    // You can add your cancel logic here, such as resetting the form or navigating away
}; 

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
  return !signedUser?.access_token ? (
    <Navigate to="/signin" />
  ) : (
    <div className="main-content">
     {/*  Tags Section */}
     <div className="tags-section">
     <h3>Tags</h3>
     <div className="tags-list">
       {tagCounts.map(({ tag, count }) => (
         <button
           onClick={loadByTag} // Ensure `loadByTag` is properly defined
           className="tag-button"
           key={tag}
         >
           {tag}
           <span className="tag-count">({count} posts)</span>
         </button>
       ))}
     </div> </div>
    <WikIEditorPage post={post} onSave={handleSave} onCancel={handleCancel} />
    {/*  Latest Posts */}
    <div className="latest-posts-section">
    <h3>Latest Posts</h3>
    <ul>
      {latestPosts.length > 0 ? (
        latestPosts.map((latestPost, index) => (
          <LatestPostCard content={latestPost} key={index} />
        ))
      ) : (
        <p>No latest posts available.</p>
      )}
    </ul>
  </div>
  </div>
 
  );
};
