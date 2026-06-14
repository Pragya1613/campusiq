import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import MyApplicationsPage from "../pages/MyApplicationsPage";
import JobsPage from "../pages/JobsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard"
      element={
      <ProtectedRoute>
        <DashboardPage/>
        </ProtectedRoute>
      }
      />
      <Route
        path="/applications"
         element={
          <ProtectedRoute>
            <MyApplicationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <JobsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;