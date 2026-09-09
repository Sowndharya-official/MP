import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import NewProject from "../pages/NewProject";
import UploadProject from "../pages/UploadProject";
import Analysis from "../pages/Analysis";
import SecurityReport from "../pages/SecurityReport";
import Deploy from "../pages/Deploy";

const AppRoutes = () => {
  return (
    <Routes>

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/new-project"
        element={<NewProject />}
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
        path="/security-report"
        element={<SecurityReport />}
      />

      <Route
        path="/deploy"
        element={<Deploy />}
      />

    </Routes>
  );
};

export default AppRoutes;