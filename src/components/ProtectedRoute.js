// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token is present

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the child components
  return children;
}

export default ProtectedRoute;
