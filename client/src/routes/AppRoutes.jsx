import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import MyApplicationsPage from "../pages/MyApplicationsPage";
import JobsPage from "../pages/JobsPage";
import CreateJobPage from "../pages/CreateJobPage";
import AdminApplicationsPage
from "../pages/AdminApplicationsPage";

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

      <Route
         path="/create-job"
           element={<CreateJobPage />}
      />

      <Route
        path="/admin-applications"
          element={
            <AdminApplicationsPage />
          }
      />

    </Routes>
  );
}

export default AppRoutes;