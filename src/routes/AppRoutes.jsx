import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import UploadProject from "../pages/UploadProject";
import Analysis from "../pages/Analysis";

const AppRoutes = () => {
  return (
    <Routes>

    <Route
        path="/"
        element={<Home />}
    />

    <Route
        path="/login"
        element={<Login />}
    />

    <Route
        path="/signup"
        element={<Signup />}
    />

    <Route
        path="/dashboard"
        element={<Dashboard />}
    />

    <Route
        path="/upload-project"
        element={<UploadProject />}
    />

    <Route
        path="/analysis"
        element={<Analysis />}
    />

    <Route
        path="*"
        element={
            <Navigate
                to="/"
                replace
            />
        }
    />

</Routes>
  );
};

export default AppRoutes;