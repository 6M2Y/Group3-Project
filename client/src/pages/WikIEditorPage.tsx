import Button from "../Components/Button";
import React, { FormEvent, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formats, modules } from "../utils/QuillFormats";
import { Navigate } from "react-router-dom";
import InputBox from "../Components/InputBox";
import bannerImg from "../WikiBanner/logo512.png";
import { toast } from "react-toastify";
import TextArea from "../Components/TextArea";

const WikIEditorPage = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [redirect, setRedirect] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const submitPost = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);

    const result = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (result.ok) {
      setRedirect(true);
      toast.success("Post created successfully!");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (redirect) return <Navigate to="/" />;

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src={bannerImg}
          alt="Banner"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>

      <form
        onSubmit={submitPost}
        style={{
          width: "80%",
          margin: "auto",
          backgroundColor: "#f5f5f0",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Create a New Post
        </h2>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="title"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Title
          </label>
          <TextArea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            rows={3}
            style={{ resize: "vertical" }} // Optional: customize styles for summary field
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="summary"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Summary
          </label>
          <TextArea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Enter post summary (keep it short and concise)"
            rows={4}
            style={{ resize: "vertical" }} // Optional: customize styles for summary field
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="file"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Upload Image
          </label>
          <InputBox
            type_="file"
            accept_=".png, .jpg, .jpeg"
            onChange={handleFileChange}
            // style={{
            //   width: "100%",
            //   padding: "10px",
            //   fontSize: "16px",
            //   borderRadius: "5px",
            //   border: "1px solid #ddd",
            // }}
          />
          {file && <p>Selected file: {file.name}</p>}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="content"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Content
          </label>
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            label="Publish"
            type_="submit"
            className="publish-button"
            // style={{
            //   padding: "10px 20px",
            //   backgroundColor: "#4CAF50",
            //   color: "#fff",
            //   border: "none",
            //   borderRadius: "5px",
            //   cursor: "pointer",
            //   fontWeight: "bold",
            // }}
          />
          <Button
            label="Save Draft"
            type_="button"
            className="save-draft-button"
            // style={{
            //   padding: "10px 20px",
            //   backgroundColor: "#ff9800",
            //   color: "#fff",
            //   border: "none",
            //   borderRadius: "5px",
            //   cursor: "pointer",
            //   fontWeight: "bold",
            // }}
          />
        </div>
      </form>
    </>
  );
};

export default WikIEditorPage;
