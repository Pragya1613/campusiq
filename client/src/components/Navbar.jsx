import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const {
    logout,
    role,
    isAuthenticated,
  } = useContext(AuthContext);

  const navigate =
    useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#172554] backdrop-blur-sm text-white px-8 py-4 flex justify-between items-center shadow-md">

      <Link
        to="/"
        className="text-2xl font-bold"
      >
        CampusIQ
      </Link>

      <div className="flex gap-6 items-center">

        {!isAuthenticated && (
          <>
            <Link
              to="/login"
              className="hover:text-blue-100"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-[#F97316] text-white px-4 py-2 rounded-lg hover:bg-[#EA580C] transition"
            >
              Register
            </Link>
          </>
        )}

        {isAuthenticated && role === "student" && (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/jobs">
              Jobs
            </Link>

            <Link to="/applications">
              Applications
            </Link>

            <Link to="/profile">
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}

        {isAuthenticated && role === "admin" && (
          <>
            <Link
              to="/admin-dashboard"
              className="hover:text-blue-100 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/create-job"
              className="hover:text-blue-100 transition"
            >
              Create Job
            </Link>

            <Link
              to="/manage-jobs"
              className="hover:text-blue-100 transition"
            >
              Manage Jobs
            </Link>

            <Link
              to="/admin-applications"
              className="hover:text-blue-100 transition"
            >
              Applications
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;