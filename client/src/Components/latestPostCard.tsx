import React from "react";
import "../Styles/MainContent.css";
import { latestPostType } from "../Common/interfaces";
import { FaUser, FaCalendarAlt, FaTag } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const LatestPostCard = ({ content }: { content: latestPostType }) => {
  let { title, tags, updatedAt, author } = content;
  return (
    <li className="latest-post">
      <p className="latest-post-title">{title}</p>
      <div className="author-info">
        <p className="latest-post-author">
          <FaUser size={10} color="rgb(255, 87, 34)" /> {author.fullname}
        </p>
        <p className="latest-post-email">
          {" "}
          <MdEmail size={10} color="rgb(255, 87, 34)" />
          {author.email}
        </p>
      </div>

      <p className="latest-post-tags">
        <FaTag size={10} color="rgb(255, 87, 34)" /> Tags: {tags.join(", ")}
      </p>
      <p className="latest-post-date">
        {" "}
        <FaCalendarAlt size={10} color="rgb(255, 87, 34)" />
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
