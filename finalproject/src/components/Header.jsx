import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../elements/Logo";
import SearchBar from "./SearchBar";
import Button from "./Button";
// import "./Header.css";

const Header = ({ onSearch, isLoading }) => {
  // State for theme management
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme to `body` on change
  useEffect(() => {
    document.body.className = theme; // Apply theme class to body
    localStorage.setItem("theme", theme); // Persist theme in localStorage
  }, [theme]);

  // Theme toggle logic
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : theme === "dark" ? "blue" : theme ==="blue"? "red":"light";
    setTheme(newTheme);
  };

  return (
    <header className="header">
      <div className="container">
       
          <span>Sustainability and Eco-Friendly Living</span>
       

        {/* Search Bar */}
        <div className="search-container">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Navigation Buttons */}
        <div className="button-container">
          <Link to="/home">
            <Button text="Home" styleClass="bg-blue-500" />
          </Link>
          <Link to="/create-post">
            <Button text="Create Post" styleClass="bg-green-500" />
          </Link>
          <Button text="Switch Theme" styleClass="bg-gray-500" onClick={toggleTheme} />
        </div>

        {/* Loading Animation */}
        {isLoading && <div className="loading-spinner">Loading...</div>}
      </div>
    </header>
  );
};

export default Header;