import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminAuthService from "../services/authservice.js";
import "./login.css";
import Navbar from "./navbar.jsx";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // default role
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    try {
      if (role === "admin") {
        // 🔑 Admin login
        const res = await AdminAuthService.login({
          username,
          password,
        });

        if (res?.token) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("role", "admin");
          localStorage.setItem("username", res.username);

          setMsg("✅ Admin login successful");
          navigate("/admindashboard");
        } else {
          setError(res?.message || "❌ Admin login failed");
        }
      } else {
        // 🔑 Student login
        const res = await AdminAuthService.userlogin({
          student_email: username,
          student_password: password,
        });

        // Check status from backend
        if (res?.status === "success" && res?.token) {
          // Store token, role, and student_id (already done in service)
          setMsg("✅ Student login successful");
          navigate("/userdashboard");
        } else {
          setError(res?.msg || "❌ Invalid email or password");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.msg || "❌ Login failed");
    }
  };

  return (
    <div className="n1">
      <Navbar />

      <div className="login-wrapper">
        <div className="login-left">
          <h2>Welcome to LibraryHub</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-3 text-start">
              <label>{role === "admin" ? " Username" : "Username"}</label>
              <input
                type={role === "admin" ? "text" : "email"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-2 text-start">
              <label>Role:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {error && <p className="error-msg">{error}</p>}
            {msg && <p className="success-msg">{msg}</p>}

            <button type="submit" className="btn-login">
              Login
            </button>
          </form>
        </div>

        <div className="login-right">
          <img
            src="https://5.imimg.com/data5/SELLER/Default/2022/9/EL/GL/LK/53785480/college-software-500x500.png"
            alt="Library Software"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
