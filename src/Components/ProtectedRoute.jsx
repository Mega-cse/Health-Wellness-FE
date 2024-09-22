// Components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If the user is not authenticated or the token is missing, redirect to login
    return <Navigate to="/login" />;
  }

  return children; // Render the children (the protected component) if authenticated
};

export default ProtectedRoute;
