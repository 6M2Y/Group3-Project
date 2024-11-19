import React from "react";
import "../Styles/aboutpage.css"; // CSS for styling
import LeftSidebar from "../Components/LeftSidebar";
import RightSideBar from "../Components/RightSideBar";

const AboutPage = () => {
  const members = [
    {
      name: "Minyahel Muluneh Yimer",
      role: "Front and backend",
      bio: "NTNU student",
      responsibility: {
        Backend:
          "Signin, signup, googleautho, tags, CRUD operation on forms and comments",
        Frontend: "Homepage, forms, navbar, footer",
      },

      image: "./minyahe.jpg",
      contacts: {
        email: "minyahey@ntnu.no",
        phone: "",
      },
    },
    {
      name: "Suzan Mustafa",
      role: "Backend Developer",
      bio: "Bob specializes in server-side development and ensures our systems are scalable and efficient.",
      responsibility: {
        Backend: "",
        Frontend: "",
      },
      image: "https://via.placeholder.com/150",
      contacts: {
        email: "",
        phone: "",
      },
    },
    {
      name: "Kristoffer Josefsen Hellerud",
      role: "Frontend Developer",
      bio: "Charlie is a creative frontend developer who focuses on crafting user-friendly interfaces.",
      responsibility: {
        Backend: "",
        Frontend: "",
      },
      image: "https://via.placeholder.com/150",
      contacts: {
        email: "",
        phone: "",
      },
    },
  ];

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
