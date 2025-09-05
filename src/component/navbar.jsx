import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="custom-navbar">
      {/* Brand / Logo */}
      <NavLink className="custom-logo" to="/">
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/c46c7f62556223.5a945f059c90e.png"
          alt="Logo"
        />
      </NavLink>

      {/* Navigation Links */}
      <div className="custom-links">
        <ul>
          <li>
            <NavLink className="custom-link" exact="true" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="custom-link" to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink className="custom-link" to="/contact">
              Contact Us
            </NavLink>
          </li>
          {/* <li>
            <NavLink className="custom-link" to="/services">
              Services
            </NavLink>
          </li> */}
        </ul>
      </div>

      {/* Login Button */}
      {/* <div className="custom-login">
        <NavLink to="/login" className="login-btn">
          Login
        </NavLink>
      </div> */}
    </nav>
  );
}
