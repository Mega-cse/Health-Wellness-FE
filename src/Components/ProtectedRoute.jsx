// Components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  const token = localStorage.getItem('token');

  if (!user || !token) {
    // If the user is not authenticated or the token is missing, redirect to login
    return <Navigate to="/login" />;
  }

  return children; // Render the children (the protected component) if authenticated
};

export default ProtectedRoute;
