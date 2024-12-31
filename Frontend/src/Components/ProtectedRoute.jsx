import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem("role"); // Retrieve user role
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />; // Redirect if unauthorized
  }
  return children;
};

export default ProtectedRoute;
