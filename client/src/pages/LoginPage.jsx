import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import { loginUser } from "../services/authService";
import { useContext } from "react";
import {
  AuthContext,
} from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
      console.log("BUTTON CLICKED");
    try {
      const data = await loginUser(
        email,
        password
      );

      login(data.token);

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <PublicLayout>
      <div
        style={{
          maxWidth: "400px",
          margin: "50px auto",
        }}
      >
        <h1>Login CampusIQ</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <br />

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <br />

          <div>
            <label>Password</label>
            <br />

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <br />

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </PublicLayout>
  );
}

export default LoginPage;