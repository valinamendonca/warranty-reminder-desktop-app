// src/components/BackToHome.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BackToHome = ({ to = "/", label = "← Back to Home" }) => {
  return (
    <div className="text-center mt-6">
      <Link
        to={to}
        className="text-blue-600 font-medium hover:underline hover:text-blue-800 transition"
      >
        {label}
      </Link>
    </div>
  );
};

export default BackToHome;
