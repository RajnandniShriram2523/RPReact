import React, { useState } from "react";
import "../component/addstudent.css";
import AdminSidebar from "./adminslidebar";
import authservice from "../services/authservice"; // API service

export default function AddStudent() {
  const [formData, setFormData] = useState({
    student_name: "",
    student_email: "",
    student_password: "",
    study_year: ""
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // ✅ success or error

  // Convert name to Title Case and remove starting spaces
  const formatName = (name) => {
    return name
      .replace(/^\s+/g, "")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Handle input changes
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "student_name") {
      value = formatName(value);
    }
    setFormData({ ...formData, [name]: value });
  };

  // Form validation
  const validateForm = () => {
    const { student_name, student_email, student_password, study_year } = formData;
    const errors = {};

    if (!student_name.trim()) errors.student_name = "Name is required.";
    if (!student_email.trim()) errors.student_email = "Email is required.";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(student_email))
      errors.student_email = "Invalid email format.";

    if (!student_password.trim()) errors.student_password = "Password is required.";
    else if (student_password.length < 6)
      errors.student_password = "Password must be at least 6 characters.";

    if (!study_year.trim()) errors.study_year = "Study year is required.";
    else if (!/^[0-9]+$/.test(study_year))
      errors.study_year = "Study year must be numeric.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit student to server
  const sendStudentToServer = () => {
    if (!validateForm()) {
      // setMsg("Please fix validation errors before submitting.");
      setMsgType("error");
      return;
    }

    authservice
      .register(formData)
      .then((result) => {
        setMsg(result.msg || "Student added successfully!");
        setMsgType("success");
        setFormData({
          student_name: "",
          student_email: "",
          student_password: "",
          study_year: ""
        });
        setErrors({});
      })
      .catch((err) => {
        setMsg(err.msg || "Something went wrong");
        setMsgType("error");
      });
  };

  // Clear form
  const handleClear = () => {
    setFormData({
      student_name: "",
      student_email: "",
      student_password: "",
      study_year: ""
    });
    setErrors({});
    setMsg("Form cleared!");
    setMsgType("success");
  };

  return (
    <div className="addstudent-container">
      <AdminSidebar />
      <div className="addstudent-form">
        <h2 className="addstudent-title">ADD STUDENT</h2>

        <input
          type="text"
          name="student_name"
          placeholder="Enter Student Name"
          value={formData.student_name}
          onChange={handleChange}
          className="addstudent-input"
        />
        {errors.student_name && <div className="addstudent-error">{errors.student_name}</div>}

        <input
          type="text"
          name="student_email"
          placeholder="Enter Student Email"
          value={formData.student_email}
          onChange={handleChange}
          className="addstudent-input"
        />
        {errors.student_email && <div className="addstudent-error">{errors.student_email}</div>}

        <input
          type="password"
          name="student_password"
          placeholder="Enter Student Password"
          value={formData.student_password}
          onChange={handleChange}
          className="addstudent-input"
        />
        {errors.student_password && <div className="addstudent-error">{errors.student_password}</div>}

        <input
          type="text"
          name="study_year"
          placeholder="Enter Study Year (e.g., 1, 2, 3, 4)"
          value={formData.study_year}
          onChange={handleChange}
          className="addstudent-input"
        />
        {errors.study_year && <div className="addstudent-error">{errors.study_year}</div>}

        <div className="addstudent-buttons">
          <button className="addstudent-btn addstudent-btn-submit" onClick={sendStudentToServer}>
            Add Student
          </button>
          <button className="addstudent-btn addstudent-btn-clear" onClick={handleClear}>
            Clear
          </button>
        </div>

        {/* ✅ Show message below buttons */}
        {msg && (
          <div
            className={`addstudent-servermsg ${
              msgType === "success" ? "success" : "error"
            }`}
          >
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
