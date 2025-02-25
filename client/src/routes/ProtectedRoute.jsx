import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("http://localhost:8000/api/admin/dashboard", {
        credentials: "include", // Send cookies
      });
      setAuth(res.ok);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;
  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
