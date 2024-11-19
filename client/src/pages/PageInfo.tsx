import React from "react";
import "../Styles/pageinfo.css";
import RightSideBar from "../Components/RightSideBar";
import LeftSidebar from "../Components/LeftSidebar";

export const PageInfo = () => {
  return (
    <div className="main-content">
      <LeftSidebar />
      <div className="posts-section">
        <div className="about-container">
          <h1 className="about-title">
            Your Health, Your Success: Why Well-being Matters
          </h1>
          <p className="about-intro">
            Welcome to the Health and Well-being Hub!
          </p>
          <p className="about-text">
            As students, we often focus so much on our academics, deadlines, and
            future goals that we forget one key factor that shapes our success:
            our health. Whether it’s mental, physical, or emotional, maintaining
            a healthy lifestyle is not just about staying in shape or avoiding
            illness—it's about ensuring that we are in the best possible
            condition to thrive in all aspects of our lives.
          </p>
          <p className="about-text">
            This is a space where you can take charge of your well-being. Here,
            we share tips on managing stress, staying active during exam week,
            eating well on a budget, and practicing self-care amidst the
            pressures of student life. It's a place for open conversations about
            mental health, fitness routines, nutritious meals, and everything in
            between. Most importantly, it's a space where we support one
            another—because your well-being directly impacts your success.
          </p>
          <p className="about-text">
            As students, we're constantly evolving. What works for one person
            might not work for another, and that's why we're all here—to learn
            from each other. Whether you're looking for new ways to cope with
            exam stress, need a quick healthy recipe, or want advice on how to
            get better sleep, this wiki is here to guide you through it.
          </p>
          <p className="about-text">
            Remember: Taking care of yourself is not selfish. It’s essential.
            Your health is the foundation of everything you do—academically,
            socially, and personally. So, dive in! Explore the posts, share your
            experiences, ask questions, and leave your comments. This is your
            space to grow, learn, and succeed—while prioritizing you.
          </p>
          <p className="about-text">
            We’re all in this together. Let's take care of ourselves and each
            other. 💪🌿
          </p>
        </div>
      </div>
      <RightSideBar />
    </div>
  );
};
