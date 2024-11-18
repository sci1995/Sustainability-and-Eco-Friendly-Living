// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//   <Routes>
//       <Route index={true} path="/" element={<App />} />
//   </Routes>
// </BrowserRouter>,
// )

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Only import this once
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter> {/* Only wrap the app once here */}
    <App />
  </BrowserRouter>
);
