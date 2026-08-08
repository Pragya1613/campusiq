import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        {/* CTA Strip */}
        <div className="rounded-3xl bg-gradient-to-r from-[#172554] to-[#1E3A8A] px-8 py-5 lg:px-10 lg:py-6 flex flex-col lg:flex-row items-center justify-between gap-5 border border-white/10">
          <div className="max-w-2xl">
            <p className="uppercase tracking-widest text-orange-400 text-xs font-semibold">
              CampusIQ
            </p>

            <h2 className="text-2xl lg:text-[2rem] font-bold text-white mt-2">
              Ready to start your placement journey?
            </h2>

            <p className="text-slate-200 mt-2 leading-6 text-sm lg:text-base max-w-xl">
              Analyze your resume, track applications and prepare smarter with
              one clean platform.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 transition font-semibold text-white"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white hover:text-[#172554] transition font-semibold text-white"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Main Footer */}
        <div className="mt-7 grid lg:grid-cols-4 md:grid-cols-2 gap-6">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              CampusIQ
            </h2>

            <p className="mt-3 leading-6 text-slate-400 text-sm lg:text-base">
              A smart campus placement portal that helps students manage resumes,
              explore opportunities, track applications and prepare for placements.
            </p>

            <div className="flex gap-4 mt-4">
              <a
                href="https://github.com/Pragya1613/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-orange-500 transition flex items-center justify-center"
              >
                <i className="fa-brands fa-github text-lg"></i>
              </a>

              <a
                href="https://www.linkedin.com/in/pragya1613/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-600 transition flex items-center justify-center"
              >
                <i className="fa-brands fa-linkedin-in text-lg"></i>
              </a>

              <a
                href="mailto:pragyasoni162004@gmail.com"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-green-600 transition flex items-center justify-center"
              >
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm lg:text-base">
              <li>
                <Link to="/#home" className="hover:text-orange-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#about" className="hover:text-orange-400 transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-orange-400 transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-orange-400 transition">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Platform
            </h3>

            <ul className="space-y-2 text-sm lg:text-base">
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-file-waveform text-orange-400"></i>
                AI Resume Analysis
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-briefcase text-orange-400"></i>
                Job Portal
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-list-check text-orange-400"></i>
                Application Tracking
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-comments text-orange-400"></i>
                Interview Experiences
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Contact
            </h3>

            <div className="space-y-3 text-sm lg:text-base">
              <div className="flex gap-3">
                <i className="fa-solid fa-location-dot text-orange-400 mt-1"></i>
                <span>Delhi, India</span>
              </div>

              <div className="flex gap-3">
                <i className="fa-solid fa-envelope text-orange-400 mt-1"></i>
                <span>support@campusiq.com</span>
              </div>

              <div className="flex gap-3">
                <i className="fa-solid fa-phone text-orange-400 mt-1"></i>
                <span>+91 XXXXX XXXXX</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-6 pt-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            © 2026 CampusIQ. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <Link to="/" className="hover:text-orange-400 transition">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-orange-400 transition">
              Terms of Service
            </Link>
            <Link to="/" className="hover:text-orange-400 transition">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;