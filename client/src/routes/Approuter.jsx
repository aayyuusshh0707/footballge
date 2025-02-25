import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; 
import Home from "../Pages/Home/Home";
import Adminlogin from "../Pages/admin/Adminlogin";
import Dashboard from "../Pages/admin/Admindashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function Approuter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Adminlogin />} />
      <Route path="/dashboard" element={<ProtectedRoute />}>
        <Route path="" element={<Dashboard />} />
      </Route>
      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
