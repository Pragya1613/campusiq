import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { logout } =
    useContext(AuthContext);

  const navigate =
    useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        CampusIQ
      </h1>

      <div className="flex gap-6 items-center">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/jobs">
          Jobs
        </Link>

        <Link to="/applications">
          Applications
        </Link>

        <Link to="/create-job">
          Create Job
        </Link>

        <Link to="/admin-applications">
          Admin Panel
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;