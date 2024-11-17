import React from "react";
import "../Styles/MainContent.css";
import { latestPostType } from "../Common/interfaces";

const LatestPostCard = ({ content }: { content: latestPostType }) => {
  let { title, tags, updatedAt, author } = content;
  return (
    <li className="latest-post">
      <p className="latest-post-title">{title}</p>
      <div className="author-info">
        <p className="latest-post-author">{author.fullname}</p>
        <p className="latest-post-email">{author.email}</p>
      </div>

      <p className="latest-post-tags">Tags: {tags.join(", ")}</p>
      <p className="latest-post-date">
        Updated:{" "}
        {new Date(updatedAt).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // 24-hour time format
        })}
      </p>
    </li>
  );
};
export default LatestPostCard;
