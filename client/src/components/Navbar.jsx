import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { logout, role, isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  // Dashboard ke exact style jaisi active underline
  const navClass = ({ isActive }) =>
    isActive
      ? "text-white font-medium relative after:absolute after:left-0 after:-bottom-2 after:w-full after:h-0.5 after:bg-orange-500 after:rounded-full"
      : "text-blue-100 hover:text-white transition";

  return (
    <>
      {/* =========================
          Fixed Navbar
      ========================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[76px] bg-[#172554]/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="w-full h-full px-5 sm:px-7 lg:px-12 xl:px-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-white hover:text-blue-100 transition"
          >
            CampusIQ
          </Link>

          {/* =========================
              Desktop Navigation
          ========================== */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm lg:text-base">

            {/* Public */}
            {!isAuthenticated && (
              <>
                <NavLink to="/login" className={navClass}>
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="bg-[#F97316] text-white px-4 py-2 rounded-lg hover:bg-[#EA580C] transition"
                >
                  Register
                </NavLink>
              </>
            )}

            {/* =========================
                Student Navigation
            ========================== */}
            {isAuthenticated && role === "student" && (
              <>
                <NavLink to="/dashboard" className={navClass}>
                  Dashboard
                </NavLink>

                <NavLink to="/jobs" className={navClass}>
                  Jobs
                </NavLink>

                <NavLink to="/applications" className={navClass}>
                  Applications
                </NavLink>

                <NavLink to="/experiences" className={navClass}>
                  Experiences
                </NavLink>

                <NavLink to="/ai-scans" className={navClass}>
                  AIScan
                </NavLink>

                <NavLink to="/profile" className={navClass}>
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="ml-1 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md hover:shadow-lg transition"
                >
                  Logout
                </button>
              </>
            )}

            {/* =========================
                Admin Navigation
            ========================== */}
            {isAuthenticated && role === "admin" && (
              <>
                <NavLink to="/admin-dashboard" className={navClass}>
                  Dashboard
                </NavLink>

                <NavLink to="/create-job" className={navClass}>
                  Create Job
                </NavLink>

                <NavLink to="/manage-jobs" className={navClass}>
                  Manage Jobs
                </NavLink>

                <NavLink to="/admin-applications" className={navClass}>
                  Applications
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="ml-1 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md hover:shadow-lg transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* =========================
              Mobile Menu Button
          ========================== */}
          <button
            className="md:hidden w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
            onClick={() => {
              const menu = document.getElementById(
                "mobile-navbar-menu"
              );

              menu?.classList.toggle("hidden");
            }}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        {/* =========================
            Mobile Navigation
        ========================== */}
        <div
          id="mobile-navbar-menu"
          className="hidden md:hidden bg-[#172554] border-t border-white/10 px-5 py-4 shadow-lg"
        >
          <div className="flex flex-col gap-1">

            {isAuthenticated && role === "student" && (
              <>
                <NavLink
                  to="/dashboard"
                  className="px-4 py-3 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/jobs"
                  className="px-4 py-3 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
                >
                  Jobs
                </NavLink>

                <NavLink
                  to="/applications"
                  className="px-4 py-3 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
                >
                  Applications
                </NavLink>

                <NavLink
                  to="/experiences"
                  className="px-4 py-3 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
                >
                  Experiences
                </NavLink>

                <NavLink
                  to="/ai-scans"
                  className="px-4 py-3 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
                >
                  AIScan
                </NavLink>

                <NavLink
                  to="/profile"
                  className="px-4 py-3 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
                >
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="mt-2 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition text-left"
                >
                  Logout
                </button>
              </>
            )}

            {isAuthenticated && role === "admin" && (
              <>
                <NavLink
                  to="/admin-dashboard"
                  className="px-4 py-3 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/create-job"
                  className="px-4 py-3 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
                >
                  Create Job
                </NavLink>

                <NavLink
                  to="/manage-jobs"
                  className="px-4 py-3 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
                >
                  Manage Jobs
                </NavLink>

                <NavLink
                  to="/admin-applications"
                  className="px-4 py-3 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition"
                >
                  Applications
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="mt-2 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition text-left"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* 
        Fixed navbar ke neeche space reserve karta hai.
        Isse page ka top content navbar ke peeche hide nahi hoga.
      */}
      <div className="h-[76px]" aria-hidden="true"></div>
    </>
  );
}

export default Navbar;