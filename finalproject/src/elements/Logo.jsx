import React from "react";
import logo from "../images/logo.webp"; 

const Logo = () => {
  return (
    <div className="logo-container">
      <img
        src={logo} 
        alt="App Logo"
        
      />
    </div>
  );
};

export default Logo;