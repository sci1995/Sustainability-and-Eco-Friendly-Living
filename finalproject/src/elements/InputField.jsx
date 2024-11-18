// import React from "react";

// const InputField = ({ type, placeholder, value, onChange, name, required }) => {
//   return (
//     <div className="input-field-container">
//       <input
//         type={type || "text"} // Default to 'text' if type isn't provided
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         name={name}
//         required={required}
//         className="input-field p-2 border border-gray-300 rounded-md w-full h-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// };

// export default InputField;

import React from "react";

const InputField = ({ type, placeholder, value, onChange, name, required, rows }) => {
  if (type === "textarea") {
    return (
      <div className="input-field-container">
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          rows={rows || 6}  // Default rows for textarea to ensure height
          className="input-field p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }

  return (
    <div className="input-field-container">
      <input
        type={type || "text"} // Default to 'text' if type isn't provided
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className="input-field p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputField;
