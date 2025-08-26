import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminAuthService from "../services/authservice.js";
// new service for student login
import './login.css';

function login() {
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
        // Admin login
        const res = await AdminAuthService.login({ username, password, role });
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);
        localStorage.setItem("username", res.username);

        if (res.role === "admin") navigate("/admindashboard");
       // fallback
      } else {
        // Student login
        const res = await AdminAuthService.userlogin({ student_email: username, student_password: password });

        if (res.status === "success") {
     AdminAuthService.setUserData(res.data);
          setMsg(res.msg);
          navigate("/userpanel");
        } else {
          setError(res.msg || "Login failed");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || err.msg || "Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <h2>Welcome to LibraryHub</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3 text-start">
            <label>userma</label>
            <input
              type={role === "admin" ? "text" : "email"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && <p className="error-msg">{error}</p>}
          {msg && <p className="success-msg">{msg}</p>}

          <button type="submit" className="btn-login">Login</button>
        </form>

        {role === "student" && <Link to="/register" className="btn-std">Register as Student</Link>}
      </div>

      <div className="login-right">
        <img
          src="https://5.imimg.com/data5/SELLER/Default/2022/9/EL/GL/LK/53785480/college-software-500x500.png"
          alt="Library Software"
        />
      </div>
    </div>
  );
}

export default login;
