//import React from "react";
//import { useUser } from "../utils/UserContext";

//export const Profile = () => {
//  const { signedUser } = useUser();
//  return <>{signedUser?.access_token && <div>Profile</div>}</>;
//};


import React, { useEffect, useState } from 'react';
import { useUser } from "../utils/UserContext";
import { lookInSession } from '../utils/session';
import axios from 'axios';

interface User {
  username: string;
  email: string;
}

interface Page {
  _id: string;
  title: string;
  createdAt: string;
}

interface Comment {
  _id: string;
  content: string;
  page: Page;
  createdAt: string;
}

interface ProfileData {
  user: User;
  pages: Page[];
  comments: Comment[];
  tags: string[];
}

const Profile: React.FC = () => {
  //const { signedUser } = useUser();
  //const [profile, setProfile] = useState<ProfileData | null>(null);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState<string | null>(null);
  const { signedUser } = useUser();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Ensure error is typed as string or null

  useEffect(() => {
    const fetchProfile = async () => {
      const user = lookInSession('user');
      const token = user ?
  JSON.parse(user).access_token : null;
      if (!token) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching profile data...');
        const response = await axios.get<ProfileData>('http://localhost:4000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Profile data fetched:', response.data);

        setProfile(response.data);
      } catch (error) {
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [signedUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      
      <h1>{profile?.user.username}'s Profile</h1>
      <p>Email: {profile?.user.email}</p>

      <h2>Pages Created</h2>
      <ul>
        {profile?.pages.map(page => (
          <li key={page._id}>{page.title} ({new Date(page.createdAt).toLocaleString()})</li>
        ))}
      </ul>

      <h2>Comments</h2>
      <ul>
        {profile?.comments.map(comment => (
          <li key={comment._id}>{comment.content} on {comment.page.title} ({new Date(comment.createdAt).toLocaleString()})</li>
        ))}
      </ul>

      <h2>Tags Used</h2>
      <ul>
        {profile?.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
