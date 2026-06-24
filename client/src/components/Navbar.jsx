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
    <nav className="sticky top-0 z-50 bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-md">

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
              className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100"
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
            <Link to="/admin-dashboard">
              Dashboard
            </Link>

            <Link to="/create-job">
              Create Job
            </Link>

            <Link to="/admin-applications">
              Applications
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
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