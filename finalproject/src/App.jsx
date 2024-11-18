import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header"; 
import HomePage from "./pages/HomePage"; 
import CreatePost from "./pages/CreatPost";
import PostPage from './pages/PostPage'; 
import EditPost from './pages/EditPost'; 
import "./App.css"; 

const App = () => {
  return (
    <div>
      <Header onSearch={(query) => console.log(query)} /> 
      
      <Routes>
        {/* Define routes for different pages */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/create-post" element={<CreatePost />} /> 
        <Route path="/post/:id" element={<PostPage />} /> {/* Update 'component' to 'element' */}
        <Route path="/edit-post/:id" element={<EditPost />} /> {/* Update 'component' to 'element' */}
        </Routes>
    </div>
  );
};

export default App;