import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import CreateCard from "./Components/CreateCard";
import CardList from "./Components/CardList";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import { lookInSession } from "./utils/session";
import { UserProvider } from "./utils/UserContext";
import Profile from "./pages/Profile";
import ToastNotification from "./Components/ToastContainer";
import { CreatePost } from "./pages/CreatePost";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import { UserAuthType } from "./utils/useAuthForm";
import SearchPage from "./pages/SearchPage";

function App() {
  //const [signedUser, setSignedUser] = useState<{ access_token: string | null }>(
  //{
  //access_token: null,
  //}
  //);
  const [signedUser, setSignedUser] = useState<UserAuthType | null>(null);

  useEffect(() => {
    const userInSession = lookInSession("user");
    if (userInSession) {
      setSignedUser(JSON.parse(userInSession));
    }
  }, []);

  const isAuthenticated = !!signedUser?.access_token; // Determine if the user is authenticated
  return (
    <UserProvider value={{ signedUser, setSignedUser }}>
      <div>
        <Navbar />
        <ToastNotification />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  isAuthenticated={isAuthenticated}
                  userId={signedUser?.access_token}
                />
              }
            />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/postpage/:id" element={<PostPage />} />
            <Route path="/cardList" element={<CardList />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="search/:query" element={<SearchPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
