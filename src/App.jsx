import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UploadProject from "./pages/UploadProject";
import Analysis from "./pages/Analysis";
import Deploy from "./pages/Deploy";
import NewProject from "./pages/NewProject";
import Preview from "./pages/Preview";
import SecurityReport from "./pages/SecurityReport";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/preview" element={<Preview />} />
        <Route
           path="/security-report"
            element={<SecurityReport />}
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
          path="/deploy"
          element={<Deploy />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;