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

  const navigate = useNavigate();

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

      alert(
        "Login Successful"
      );

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

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (
    <PublicLayout>

      <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">

        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
            Login to CampusIQ
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Access your placement portal
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Enter email"
                required
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full border rounded-lg px-4 py-3"
                placeholder="Enter password"
                required
              />

            </div>

            <div className="text-right">

              <button
                type="button"
                className="text-blue-600 text-sm hover:underline"
              >
                Forgot Password?
              </button>

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>

          </form>

          <p className="text-center text-gray-600 mt-6">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
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