import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import LoadSpinner from "../pages/LoadSpinner";

const ProtectedRoute = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const checkAuth = () => {
      if (isAuthenticated !== null) {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [isAuthenticated]);
  if (isLoading) {
    return <LoadSpinner />;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
