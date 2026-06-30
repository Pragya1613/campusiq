import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import { registerStudent } from "../services/authService";
import toast from "react-hot-toast";

function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    enrollmentNumber,
    setEnrollmentNumber,
  ] = useState("");

  const [branch, setBranch] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerStudent({
        fullName,
        email,
        password,
        enrollmentNumber,
        branch,
      });

      toast.success("Registration Successful");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 px-4">

        <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg">

          <div className="text-center mb-8">

            <i className="fa-solid fa-graduation-cap text-orange-500 text-5xl mb-4"></i>

            <h1 className="text-3xl font-bold text-[#172554]">
              Create Student Account
            </h1>

            <p className="text-gray-500 mt-2">
              Join CampusIQ and start your placement journey
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <div className="relative">

              <i className="fa-regular fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) =>
                  setFullName(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />

            </div>

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

            <div className="relative">

              <i className="fa-solid fa-id-card absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

              <input
                type="text"
                placeholder="Enrollment Number"
                value={
                  enrollmentNumber
                }
                onChange={(e) =>
                  setEnrollmentNumber(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />

            </div>

            <div className="relative">

              <i className="fa-solid fa-building-columns absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

              <input
                type="text"
                placeholder="Branch"
                value={branch}
                onChange={(e) =>
                  setBranch(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />

            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              Register
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-[#1E3A8A] font-semibold hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>
    </PublicLayout>
  );
}

export default RegisterPage;