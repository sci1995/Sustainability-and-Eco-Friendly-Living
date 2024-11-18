import React, { useState } from "react";
import InputField from "../elements/InputField";
import Button from "./Button";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(query); 
  };

  return (
    <div className="search-bar flex items-center space-x-2">
      <InputField
        type="text"
        placeholder="Search posts by title..."
        value={query}
        onChange={handleSearchChange}
        name="search"
        required={false}
      />
      <Button
        text="Search"
        onClick={handleSearchClick}
      />
    </div>
  );
};

export default SearchBar;