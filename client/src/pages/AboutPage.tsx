import React from "react";
import "../Styles/aboutpage.css"; // CSS for styling
import LeftSidebar from "../Components/LeftSidebar";
import RightSideBar from "../Components/RightSideBar";
import { members } from "../Common/members";

const AboutPage = () => {
  return (
    <div className="main-content">
      <LeftSidebar />
      <div className="posts-section">
        <div className="about-page">
          {members.map((member, index) => (
            <section className="member-card" key={index}>
              <img
                src={member.image}
                alt={member.name}
                className="member-image"
              />
              <div className="member-details">
                <h2 className="member-name">{member.name}</h2>
                <h3 className="member-role">{member.role}</h3>
                <p className="member-bio">{member.bio}</p>
                <div className="member-responsibility">
                  <h4>Responsibilities:</h4>
                  <p>
                    <strong>Backend:</strong> {member.responsibility.Backend}
                  </p>
                  <p>
                    <strong>Frontend:</strong> {member.responsibility.Frontend}
                  </p>
                </div>
                <div className="member-responsibility">
                  <h4>Contacts:</h4>
                  <p>
                    <strong>Email:</strong> {member.contacts.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {member.contacts.phone}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
      <RightSideBar />
    </div>
  );
};

export default AboutPage;
