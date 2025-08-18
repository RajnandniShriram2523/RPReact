// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import './login.css';



function Login() {
  // const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

  };

  return (
    <div className="login-container">
      
      {/* Book Logo */}
      <div className="logo">
        <img
          src="https://thumbs.dreamstime.com/b/hand-book-logo-illustration-art-background-43965136.jpg"
          alt="Book Logo"
        />
      </div>

      {/* Login Form */}
      <div className="login-box">
        <form onSubmit={handleLogin}>
          <div className="mb-3 text-start">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

         <Link to="/adminsildebar" className=" btn-login">Login</Link>
                  
        </form>
      </div>
    </div>
  );
}

export default Login;
