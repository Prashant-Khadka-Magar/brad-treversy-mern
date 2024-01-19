import React from 'react';
import './Spinner.css'; // Create a CSS file for styling

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        LOADING
      </div>
    </div>
  );
};

export default Spinner;
