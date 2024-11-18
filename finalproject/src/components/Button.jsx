import React from "react";


const Button = ({ text, onClick, styleClass, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${styleClass} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
