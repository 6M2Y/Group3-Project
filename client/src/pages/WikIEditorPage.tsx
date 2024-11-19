import React, { FormEvent, useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formats, modules } from "../utils/QuillFormats";
import Button from "../Components/Button";
import TextArea from "../Components/TextArea";
import InputBox from "../Components/InputBox";
// import bannerImg from "../WikiBanner/logo512.png";
import { toast } from "react-toastify";
import Modal from "../Components/Modal"; // Import the new Modal component
import axios from "axios";
import { useUser } from "../utils/UserContext";
import { Navigate } from "react-router-dom";
import "../Styles/createPost.css";

// import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-hooks/rules-of-hooks
// let navigate = useNavigate();
interface WikiEditorPageProps {
  post: any; // You can replace `any` with a more specific type if you have one
  onSave: (updatedPost: any) => void;
  onCancel: () => void;
}

const WikIEditorPage: React.FC<WikiEditorPageProps> = ({
  post,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [tags, setTags] = useState(post?.tags?.join(", ") || ""); // Assuming tags are a comma-separated string
  const [summary, setSummary] = useState(post?.summary || ""); // Assuming there's a summary field
  const [file, setFile] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { signedUser } = useUser();
  const quillRef = useRef<ReactQuill>(null);
  const [isNewPost, setIsNewPost] = useState(true); // true for new post, false for updating existing post

  const postId = post._id; // Assuming `post` is the object containing the post details

  useEffect(() => {
    setTitle(post?.title || "");
    setContent(post?.content || "");
    setSummary(post?.summary || "");
    setTags(post?.tags?.join(", ") || "");
  }, [post]);

  const handleSave = () => {
    const updatedPost = {
      ...post,
      title,
      content,
      tags: tags.split(",").map((tag: string) => tag.trim()), // Convert back to array
      summary,
    };
    onSave(updatedPost);
  };

  const availableTags = [
    "Hero",
    "Villain",
    "Adventure",
    "Powers",
    "Universe",
    "Origins",
  ];

  //setting character limits
  const summaryCharacterLimit = 200,
    titleCharacterLimit = 75;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleTagSelection = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handlePreview = (e: FormEvent) => {
    e.preventDefault();
    setShowPreview(true); // Open the preview modal
  };

  //to handle publish
  const handlePublish = () => {
    setShowPreview(false);

    //input validation
    if (!title.length) {
      return toast.error("Title is missing");
    }
    if (!summary.length) {
      return toast.error("Summary is missing");
    }
    if (!content.length) {
      return toast.error("Content is missing");
    }
    if (!selectedTags.length) {
      return toast.error("Tags is missing");
    }

    //create a form data
    const formData = new FormData();
    if (file) formData.append("image", file);
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("tags", JSON.stringify(selectedTags));

    try {
      let loadingToast = toast.loading("publishing started....");
      if (isNewPost) {
        // Publish new post
        axios
          .post(`${process.env.REACT_APP_WIKI_API_URL}/publish`, formData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${signedUser?.access_token}`,
            },
          })
          .then(() => {
            setTimeout(() => {
              toast.dismiss(loadingToast);
            }, 1000);

            toast.success("Post published successfully!");

            setTimeout(() => {
              setRedirect(true);
            }, 1500);
          })
          .catch((error) => {
            toast.error("Something went wrong. Please try again.");
          });
      } else {
        // Update existing post with new version
        const postId = post._id;
        axios
          .put(
            `${process.env.REACT_APP_WIKI_API_URL}/posts/${postId}/version`,
            formData,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${signedUser?.access_token}`,
              },
            }
          )
          .then(() => {
            setTimeout(() => {
              toast.dismiss(loadingToast);
            }, 1000);

            toast.success("Post updated successfully!");

            setTimeout(() => {
              setRedirect(true);
            }, 1500);
          })
          .catch((error) => {
            toast.error("Something went wrong. Please try again.");
          });
      }
    } catch (error) {
      toast.error("An error occurred while publishing the post.");
    }
  };

  //save the draft
  const handleSaveDraft = async () => {
    if (!title.length) {
      return toast.error("Title for the draft is missing");
    }

    const formData = new FormData();
    if (file) formData.append("image", file);
    if (title) formData.append("title", title);
    if (summary) formData.append("summary", summary);
    if (content) formData.append("content", content);
    if (selectedTags.length)
      formData.append("tags", JSON.stringify(selectedTags));

    let loadingToast;

    try {
      // Show loading toast
      loadingToast = toast.loading("Saving draft...");

      // Await the post request for cleaner async handling
      await axios.post(
        `${process.env.REACT_APP_WIKI_API_URL}/save-draft`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${signedUser?.access_token}`,
          },
        }
      );
      // Dismiss loading toast and show success message
      toast.dismiss(loadingToast);
      toast.success("Draft saved successfully!");

      // Redirect after success
      setTimeout(() => {
        setRedirect(true);
      }, 1500);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unknown error");
      }
      // Dismiss loading toast and show error message
      toast.dismiss(loadingToast);
    }
  };

  if (redirect) return <Navigate to="/" />;

  return (
    <>
      <div style={{ textAlign: "center", margin: "20px" }}>
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            style={{ maxWidth: "30%", maxHeight: "10%" }}
            alt="Selected Image"
          />
        ) : (
          <img
            // src={bannerImg}
            alt="Uploaded image appears here"
            style={{ maxWidth: "50%", height: "40%" }}
          />
        )}
      </div>

      <form onSubmit={handlePreview} className="createForm">
        <h2 style={{ textAlign: "left", marginBottom: "20px" }}>
          Write a New Post
        </h2>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="title">Title</label>
          <TextArea
            value={title}
            onChange={(e) => {
              if (e.target.value.length <= titleCharacterLimit) {
                setTitle(e.target.value);
              }
            }}
            placeholder="Enter post title"
            maxLength={titleCharacterLimit}
            rows={2}
          />
          <p>{titleCharacterLimit - title.length} characters left</p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="summary">Summary</label>
          <TextArea
            value={summary}
            onChange={(e) => {
              if (e.target.value.length <= summaryCharacterLimit) {
                setSummary(e.target.value);
              }
            }}
            maxLength={summaryCharacterLimit}
            placeholder="Enter post summary"
            rows={2}
          />
          <p>{summaryCharacterLimit - summary.length} characters left</p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="file">Upload Image</label>
          <InputBox
            type_="file"
            accept_="image/*"
            onChange={handleFileChange}
          />
          {file && <p>Selected file: {file.name}</p>}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="content">Content</label>
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            style={{ width: "100%", height: "200px", borderRadius: "5px" }}
          />
        </div>

        <div style={{ margin: "30px 0" }}>
          <label>Tags</label>
          <div>
            {availableTags.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => handleTagSelection(tag)}
                style={{
                  padding: "5px 10px",
                  margin: "5px",
                  backgroundColor: selectedTags.includes(tag)
                    ? "#007BFF"
                    : "#ddd",
                  color: selectedTags.includes(tag) ? "#fff" : "#000",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button label="Preview" type_="submit" />
          <Button label="Save Draft" type_="button" onClick={handleSaveDraft} />
        </div>
      </form>

      {/* Preview Modal */}
      {showPreview && (
        <Modal onClose={() => setShowPreview(false)} title="Preview Post">
          <h1>{title}</h1>
          <p>
            <strong>Summary:</strong> {summary}
          </p>
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="createformimage"
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
          <div>
            <strong>Tags:</strong> {selectedTags.join(", ")}
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="publishOption"
                value="new"
                checked={isNewPost}
                onChange={() => setIsNewPost(true)}
              />
              Publish New Post
            </label>
            <label>
              <input
                type="radio"
                name="publishOption"
                value="update"
                checked={!isNewPost}
                onChange={() => setIsNewPost(false)}
              />
              Update Existing Post
            </label>
          </div>
          <Button label="Publish" onClick={handlePublish} />
          <Button label="Back to Edit" onClick={() => setShowPreview(false)} />
        </Modal>
      )}
    </>
  );
};

export default WikIEditorPage;
