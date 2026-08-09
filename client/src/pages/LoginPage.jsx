import {
  useState,
  useContext,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";
import PublicLayout from "../layouts/PublicLayout";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {

  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data =
        await loginUser(
          email,
          password
        );

      login(
        data.token,
        data.student.role
      );

      toast.success("Login Successful");

      if (
        data.student.role ===
        "admin"
      ) {

        navigate(
          "/admin-dashboard"
        );

      }
      else if (
        !data.student.profileCompleted
      ) {

        navigate(
          "/profile"
        );

      }
      else {

        navigate(
          "/dashboard"
        );

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };


  return (

    <PublicLayout>

      <div className="min-h-[calc(100vh-80px)] bg-[#f8fafc] px-4 py-12 flex items-center justify-center">

        <div className="w-full max-w-md">

          {/* Login Card */}

          <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.10)] px-7 sm:px-9 py-9 sm:py-10">

            {/* Header */}

            <div className="text-center mb-8">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-5">

                <i className="fa-solid fa-graduation-cap text-orange-500 text-3xl"></i>

              </div>

              <h1 className="text-3xl font-bold tracking-tight text-[#172554]">

                Welcome Back

              </h1>

              <p className="text-slate-500 mt-2">

                Login to CampusIQ

              </p>

            </div>


            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}

              <div>

                <label className="block text-sm font-semibold text-[#172554] mb-2">

                  Email Address

                </label>

                <div className="relative">

                  <i className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors"></i>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-[#172554] placeholder:text-slate-400 outline-none transition-all duration-200 hover:border-slate-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    required
                  />

                </div>

              </div>


              {/* Password */}

              <div>

                <div className="flex items-center justify-between mb-2">

                  <label className="block text-sm font-semibold text-[#172554]">

                    Password

                  </label>

                </div>

                <div className="relative">

                  <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-12 text-[#172554] placeholder:text-slate-400 outline-none transition-all duration-200 hover:border-slate-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors duration-200"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    <i
                      className={
                        showPassword
                          ? "fa-solid fa-eye-slash"
                          : "fa-solid fa-eye"
                      }
                    ></i>

                  </button>

                </div>

              </div>


              {/* Forgot Password */}

              <div className="flex justify-end">

                <button
                  type="button"
                  className="text-[#1E3A8A] text-sm font-medium hover:text-orange-500 hover:underline transition-colors duration-200"
                >
                  Forgot Password?
                </button>

              </div>


              {/* Login Button */}

              <button
                type="submit"
                className="w-full h-12 bg-orange-500 text-white rounded-xl font-semibold shadow-sm hover:bg-orange-600 hover:shadow-md active:scale-[0.99] transition-all duration-200"
              >
                <span className="flex items-center justify-center gap-2">

                  Login

                  <i className="fa-solid fa-arrow-right text-sm"></i>

                </span>

              </button>

            </form>


            {/* Register */}

            <div className="relative my-7">

              <div className="absolute inset-0 flex items-center">

                <div className="w-full border-t border-slate-200"></div>

              </div>

              <div className="relative flex justify-center">

                <span className="bg-white px-3 text-xs text-slate-400 uppercase tracking-wider">

                  New to CampusIQ?

                </span>

              </div>

            </div>


            <p className="text-center text-slate-500">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-[#1E3A8A] font-semibold hover:text-orange-500 hover:underline transition-colors duration-200"
              >
                Register
              </Link>

            </p>

          </div>


          {/* Small supporting text */}

          <p className="text-center text-xs text-slate-400 mt-5">

            Your placement journey starts here.

          </p>

        </div>

      </div>

    </PublicLayout>

  );

}

export default LoginPage;