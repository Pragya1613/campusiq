import {
  useState,
  useContext,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {

  const navigate =
    useNavigate();

  const { login } =
    useContext(AuthContext);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

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

      <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 px-4">

        <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

          <div className="text-center mb-8">

            <i className="fa-solid fa-graduation-cap text-orange-500 text-5xl mb-4"></i>

            <h1 className="text-3xl font-bold text-[#172554]">
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-2">
              Login to CampusIQ
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <div className="relative">

              <i className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />

            </div>

            <div className="relative">

              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />

            </div>

            <div className="text-right">

              <button
                type="button"
                className="text-[#1E3A8A] text-sm hover:underline"
              >
                Forgot Password?
              </button>

            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-[#1E3A8A] font-semibold hover:underline"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </PublicLayout>
  );
}

export default LoginPage;