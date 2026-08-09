import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import { registerStudent } from "../services/authService";
import toast from "react-hot-toast";

function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const strength = Object.values(passwordChecks).filter(Boolean).length;

  const [enrollmentNumber, setEnrollmentNumber] = useState("");

  const [branch, setBranch] = useState("");

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
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10 sm:py-12">
        
        <div className="w-full max-w-xl mx-auto">

          {/* Main Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_15px_45px_rgba(15,23,42,0.08)] overflow-hidden">

            {/* Header */}
            <div className="px-7 sm:px-10 pt-9 sm:pt-10 pb-7 text-center">

              <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] mx-auto rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shadow-sm">
                <i className="fa-solid fa-graduation-cap text-3xl sm:text-4xl text-orange-500"></i>
              </div>

              <h1 className="text-3xl sm:text-[34px] font-bold tracking-tight text-[#172554] mt-5">
                Create Student Account
              </h1>

              <p className="text-slate-500 mt-2 text-sm sm:text-base">
                Join CampusIQ and start your placement journey
              </p>

              <div className="w-12 h-1 bg-orange-500 rounded-full mx-auto mt-5"></div>

            </div>


            {/* Form */}
            <div className="px-7 sm:px-10 pb-9 sm:pb-10">

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                {/* Full Name */}
                <div className="relative group">

                  <i className="fa-regular fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors duration-200"></i>

                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
                    className="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                    required
                  />

                </div>


                {/* Email */}
                <div className="relative group">

                  <i className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors duration-200"></i>

                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                    required
                  />

                </div>


                {/* Password */}
                <div className="relative group">

                  <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors duration-200"></i>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-12 text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors duration-200"
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


                {/* Password Requirements */}
                {password && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                      Password Requirements
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2">

                      <p
                        className={
                          passwordChecks.length
                            ? "text-green-600"
                            : "text-slate-500"
                        }
                      >
                        <i
                          className={`fa-solid ${
                            passwordChecks.length
                              ? "fa-circle-check"
                              : "fa-circle"
                          } mr-2 text-xs`}
                        ></i>
                        Minimum 8 characters
                      </p>

                      <p
                        className={
                          passwordChecks.uppercase
                            ? "text-green-600"
                            : "text-slate-500"
                        }
                      >
                        <i
                          className={`fa-solid ${
                            passwordChecks.uppercase
                              ? "fa-circle-check"
                              : "fa-circle"
                          } mr-2 text-xs`}
                        ></i>
                        One uppercase letter
                      </p>

                      <p
                        className={
                          passwordChecks.lowercase
                            ? "text-green-600"
                            : "text-slate-500"
                        }
                      >
                        <i
                          className={`fa-solid ${
                            passwordChecks.lowercase
                              ? "fa-circle-check"
                              : "fa-circle"
                          } mr-2 text-xs`}
                        ></i>
                        One lowercase letter
                      </p>

                      <p
                        className={
                          passwordChecks.number
                            ? "text-green-600"
                            : "text-slate-500"
                        }
                      >
                        <i
                          className={`fa-solid ${
                            passwordChecks.number
                              ? "fa-circle-check"
                              : "fa-circle"
                          } mr-2 text-xs`}
                        ></i>
                        One number
                      </p>

                      <p
                        className={
                          passwordChecks.special
                            ? "text-green-600"
                            : "text-slate-500"
                        }
                      >
                        <i
                          className={`fa-solid ${
                            passwordChecks.special
                              ? "fa-circle-check"
                              : "fa-circle"
                          } mr-2 text-xs`}
                        ></i>
                        One special character
                      </p>

                    </div>


                    {/* Strength */}
                    <div className="pt-2">

                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">

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

                      <p className="text-xs text-slate-500 mt-2">
                        Password Strength:
                        <span
                          className={`ml-1 font-semibold ${
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

                  </div>
                )}


                {/* Confirm Password */}
                <div className="relative group">

                  <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors duration-200"></i>

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    className="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-12 text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors duration-200"
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


                {/* Password Match */}
                {confirmPassword && (
                  <p
                    className={`text-sm mt-1 px-1 ${
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


                {/* Enrollment Number */}
                <div className="relative group">

                  <i className="fa-solid fa-id-card absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors duration-200"></i>

                  <input
                    type="text"
                    placeholder="Enrollment Number"
                    value={enrollmentNumber}
                    onChange={(e) =>
                      setEnrollmentNumber(
                        e.target.value
                      )
                    }
                    className="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                    required
                  />

                </div>


                {/* Branch */}
                <div className="relative group">

                  <i className="fa-solid fa-building-columns absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors duration-200"></i>

                  <input
                    type="text"
                    placeholder="Branch"
                    value={branch}
                    onChange={(e) =>
                      setBranch(e.target.value)
                    }
                    className="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                    required
                  />

                </div>


                {/* Register Button */}
                <button
                  type="submit"
                  disabled={
                    !password ||
                    !confirmPassword ||
                    password !== confirmPassword
                  }
                  className={`w-full h-14 rounded-xl font-semibold text-base transition-all duration-300 ease-in-out ${
                    !password ||
                    !confirmPassword ||
                    password !== confirmPassword
                      ? "bg-slate-300 cursor-not-allowed text-white"
                      : "bg-orange-500 hover:bg-orange-600 text-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    Register
                    <i className="fa-solid fa-arrow-right text-sm"></i>
                  </span>
                </button>

              </form>


              {/* Login */}
              <p className="text-center mt-7 text-sm sm:text-base text-slate-500">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="text-[#1E3A8A] font-semibold hover:text-orange-500 transition-colors duration-200"
                >
                  Login
                </Link>

              </p>

            </div>

          </div>

        </div>
      </div>
    </PublicLayout>
  );
}

export default RegisterPage;