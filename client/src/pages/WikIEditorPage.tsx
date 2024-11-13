import React, { FormEvent, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formats, modules } from "../utils/QuillFormats";

import Button from "../Components/Button";
import TextArea from "../Components/TextArea";
import InputBox from "../Components/InputBox";
import bannerImg from "../WikiBanner/logo512.png";
import { toast } from "react-toastify";
import Modal from "../Components/Modal"; // Import the new Modal component
import axios from "axios";
import { useUser } from "../utils/UserContext";
import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-hooks/rules-of-hooks
// let navigate = useNavigate();

const WikIEditorPage = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { signedUser } = useUser();

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

    const formData = new FormData();
    if (file) formData.append("image", file);
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("tags", JSON.stringify(selectedTags));

    try {
      let loadingToast = toast.loading("publishing started....");
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

  // const handleSaveDraft = async () => {
  //   if (!title.length) {
  //     return toast.error("Title for the draft is missing");
  //   }

  //   const formData = new FormData();
  //   if (file) formData.append("image", file);
  //   formData.append("title", title);
  //   formData.append("summary", summary);
  //   formData.append("content", content);
  //   formData.append("tags", JSON.stringify(selectedTags));

  //   try {
  //     let loadingToast = toast.loading("Saving draft started....");
  //     axios
  //       .post(`${process.env.REACT_APP_WIKI_API_URL}/save-draft`, formData, {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${signedUser?.access_token}`,
  //         },
  //       })
  //       .then(() => {
  //         setTimeout(() => {
  //           toast.dismiss(loadingToast);
  //         }, 1000);

  //         toast.success("Draft saved successfully!");

  //         setTimeout(() => {
  //           setRedirect(true);
  //         }, 1500);
  //       })
  //       .catch((error) => {
  //         toast.error("Something went wrong. Please try again.");
  //       });
  //   } catch (error) {
  //     toast.error("An error occurred while saving the post.");
  //   }
  // };

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
            src={bannerImg}
            alt="Banner"
            style={{ maxWidth: "50%", height: "40%" }}
          />
        )}
      </div>

      <form
        onSubmit={handlePreview}
        style={{
          width: "50%",
          margin: "auto",
          backgroundColor: "#f5f5f0",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "left", marginBottom: "20px" }}>
          Create a New Post
        </h2>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="title">Title</label>
          <TextArea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            maxLength={titleCharacterLimit}
            rows={3}
          />
          <p>{titleCharacterLimit - title.length} characters left</p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="summary">Summary</label>
          <TextArea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            maxLength={summaryCharacterLimit}
            placeholder="Enter post summary"
            rows={4}
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
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            style={{ width: "100%", height: "300px", borderRadius: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
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
              style={{
                width: "50%",
                height: "auto",
                display: "block",
                margin: "0 auto 15px auto",
                borderRadius: "5px",
              }}
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
          <div>
            <strong>Tags:</strong> {selectedTags.join(", ")}
          </div>
          <Button label="Publish" onClick={handlePublish} />
          <Button label="Back to Edit" onClick={() => setShowPreview(false)} />
        </Modal>
      )}
    </>
  );
};

export default WikIEditorPage;
