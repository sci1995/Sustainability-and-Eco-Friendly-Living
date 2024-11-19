// import React, { useState } from "react";
// import InputField from "../elements/InputField";
// import Button from "./Button";

// const SearchBar = ({ onSearch }) => {
//   const [query, setQuery] = useState("");

//   const handleSearchChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const handleSearchClick = () => {
//     onSearch(query); 
//   };

//   return (
//     <div className="search-bar flex items-center space-x-2">
//       <InputField
//         type="text"
//         placeholder="Search posts by title..."
//         value={query}
//         onChange={handleSearchChange}
//         name="search"
//         required={false}
//       />
//       <Button
//         text="Search"
//         onClick={handleSearchClick}
//       />
//     </div>
//   );
// };

// export default SearchBar;

import React, { useState } from "react";
import InputField from "../elements/InputField";
import Button from "./Button";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { supabase } from "../client"; // Assuming you're using Supabase to store posts

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = async () => {
    try {
      // Query Supabase to find a post with a matching title
      const { data: posts, error } = await supabase
        .from("Posts")
        .select("id, title")
        .ilike("title", `%${query}%`); // Case-insensitive match on title

      if (error) {
        throw new Error("Error fetching posts: " + error.message);
      }

      // Check if a post was found
      if (posts && posts.length > 0) {
        // Navigate to the first post with the matching title
        navigate(`/post/${posts[0].id}`);
      } else {
        alert("No posts found matching the title.");
      }
    } catch (err) {
      console.error("Error searching for posts:", err);
      alert("An error occurred while searching.");
    }
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
