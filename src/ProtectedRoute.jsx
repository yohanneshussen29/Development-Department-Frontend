import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    // Redirect to the login page if not logged in
    return <Navigate to="/" replace />;
  }

  // Allow access to the protected route if logged in
  return children;
};

export default ProtectedRoute;