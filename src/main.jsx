import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Pages/App.jsx';  // Ensure this path is correct based on your project structure
import './index.css';  // Ensure this file exists and is in the correct location

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
