import React from "react";
import { Link } from "react-router-dom"; // To handle navigation
import Logo from "../elements/Logo";
import SearchBar from "./SearchBar";
import Button from "./Button";
import "./Header.css"; // Import the CSS file

const Header = ({ onSearch }) => {
  return (
    <header className="header">
      <div className="container">
       
        <div className="logo-container">
          <Logo />
          <span>Sustainability and Eco-Friendly Living</span>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Navigation Buttons */}
        <div className="button-container">
          <Link to="/home">
            <Button
              text="Home"
              styleClass="bg-blue-500"
            />
          </Link>
          <Link to="/create-post">
            <Button
              text="Create Post"
              styleClass="bg-green-500"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
