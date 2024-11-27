// src/components/ProtectedRoute.tsx

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.tsx"; // Ensure correct import path

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!role) {
    // Assuming role=true means venueManager
    return (
      <div className="py-5 px-5 mt-5 max-w-4xl mx-auto">
        <div className="bg-red-100 text-red-700 p-4 rounded">
          <h2 className="text-2xl font-semibold">Access Denied</h2>
          <p>You do not have the necessary permissions to access this page.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
