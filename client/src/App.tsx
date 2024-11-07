import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { Signup } from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/createpost" element={<h1>write here</h1>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
