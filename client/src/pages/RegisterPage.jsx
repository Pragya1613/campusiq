import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import { registerStudent } from "../services/authService";

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

      alert(
        "Registration Successful"
      );

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }

  };

  return (
    <PublicLayout>

      <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">

        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">

          <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
            Create Student Account
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Join CampusIQ
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) =>
                setFullName(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-4 py-3"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-4 py-3"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-4 py-3"
              required
            />

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
              className="w-full border rounded-lg px-4 py-3"
              required
            />

            <input
              type="text"
              placeholder="Branch"
              value={branch}
              onChange={(e) =>
                setBranch(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-4 py-3"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Register
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-blue-600 font-semibold"
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