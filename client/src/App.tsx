import React from 'react';
import "./App.css";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { Signup } from "./pages/Signup";
import Footer from './Components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<h1>Superheroes</h1>} />
          <Route path="/createpost" element={<h1>Write here</h1>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}


export default App;
