function Footer() {
  return (
    <footer className="bg-white border-t-2 border-orange-500 mt-16 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-6">

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Logo */}

          <div className="flex items-center gap-2">

            <i className="fa-solid fa-graduation-cap text-orange-500 text-xl"></i>

            <h2 className="text-2xl font-bold text-slate-900">
              CampusIQ
            </h2>

          </div>

          {/* Links */}

          <div className="flex gap-6 text-slate-700 font-medium">

            <a
              href="/"
              className="hover:text-orange-500"
            >
              Home
            </a>

            <a
              href="/jobs"
              className="hover:text-orange-500"
            >
              Jobs
            </a>

            <a
              href="/login"
              className="hover:text-orange-500"
            >
              Login
            </a>

            <a
              href="/register"
              className="hover:text-orange-500"
            >
              Register
            </a>

          </div>

          {/* Social Icons */}

          <div className="flex gap-5 text-xl text-slate-700">

            <a
              href="#"
              className="hover:text-blue-600"
            >
              <i className="fab fa-linkedin"></i>
            </a>

            <a
              href="#"
              className="hover:text-pink-600"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              href="#"
              className="hover:text-slate-900"
            >
              <i className="fab fa-github"></i>
            </a>

          </div>

        </div>

        <div className="text-center text-gray-500 mt-5 border-t pt-4">

          © 2026 CampusIQ. All rights reserved.

        </div>

      </div>

    </footer>
  );
}

export default Footer;