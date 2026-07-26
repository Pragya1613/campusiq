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

  const [confirmPassword, setConfirmPassword] =
    useState("");
  
  const [showPassword, setShowPassword] =
    useState(false);
  
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

const strength = Object.values(passwordChecks).filter(Boolean).length;


  const [
    enrollmentNumber,
    setEnrollmentNumber,
  ] = useState("");

  const [branch, setBranch] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

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
                type={showPassword ? "text" :  "password"}
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500"
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


            {password && (
              <div className="space-y-1 mt-2 text-sm">
              
                <p className={passwordChecks.length ? "text-green-600" : "text-gray-500"}>
                  <i className={`fa-solid ${
                    passwordChecks.length
                      ? "fa-circle-check"
                      : "fa-circle"
                  } mr-2`}></i>
                  Minimum 8 characters
                </p>
                
                <p className={passwordChecks.uppercase ? "text-green-600" : "text-gray-500"}>
                  <i className={`fa-solid ${
                    passwordChecks.uppercase
                      ? "fa-circle-check"
                      : "fa-circle"
                  } mr-2`}></i>
                  One uppercase letter
                </p>
                
                <p className={passwordChecks.lowercase ? "text-green-600" : "text-gray-500"}>
                  <i className={`fa-solid ${
                    passwordChecks.lowercase
                      ? "fa-circle-check"
                      : "fa-circle"
                  } mr-2`}></i>
                  One lowercase letter
                </p>
                
                <p className={passwordChecks.number ? "text-green-600" : "text-gray-500"}>
                  <i className={`fa-solid ${
                    passwordChecks.number
                      ? "fa-circle-check"
                      : "fa-circle"
                  } mr-2`}></i>
                  One number
                </p>
                
                <p className={passwordChecks.special ? "text-green-600" : "text-gray-500"}>
                  <i className={`fa-solid ${
                    passwordChecks.special
                      ? "fa-circle-check"
                      : "fa-circle"
                  } mr-2`}></i>
                  One special character
                </p>
                
              </div>
            )}            


            {password && (
              <div className="mt-3">
              
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            
                  <div
                    className={`h-full transition-all duration-300 ${
                      strength <= 2
                        ? "bg-red-500"
                        : strength <= 4
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{
                      width: `${(strength / 5) * 100}%`,
                    }}
                  ></div>

                </div>
                  
                <p className="text-sm text-gray-600 mt-2">
                  Password Strength:
                  <span
                    className={`ml-1 font-medium ${
                      strength <= 2
                        ? "text-red-600"
                        : strength <= 4
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {strength <= 2
                      ? "Weak"
                      : strength <= 4
                      ? "Medium"
                      : "Strong"}
                  </span>
                </p>
                    
              </div>
            )}



            <div className="relative">

              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full border rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500"
              >
                <i
                  className={
                    showConfirmPassword
                      ? "fa-solid fa-eye-slash"
                      : "fa-solid fa-eye"
                  }
                ></i>
              </button>
                
            </div>


            {confirmPassword && (
              <p
                className={`text-sm mt-1 ${
                  password === confirmPassword
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {password === confirmPassword ? (
                  <>
                    <i className="fa-solid fa-circle-check mr-1"></i>
                    Passwords match
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-circle-xmark mr-1"></i>
                    Passwords do not match
                  </>
                )}
              </p>
            )}


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
              disabled={
                !password ||
                !confirmPassword ||
                password !== confirmPassword
              }
              className={`w-full py-3 rounded-xl font-semibold transition ${
                !password ||
                !confirmPassword ||
                password !== confirmPassword
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
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