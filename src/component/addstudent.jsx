import React, { useState } from "react";
import "../component/addstudent.css";
import AdminSidebar from "./adminslidebar";
import authservice from "../services/authservice"; // <-- import service

export default function addstudent() {
  const [formData, setFormData] = useState({
    student_name: "",
    student_email: "",
    student_password: "",
    study_year: ""
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    const { student_name, student_email, student_password, study_year } = formData;
    const errors = {};

    if (!student_name.trim()) errors.student_name = "Name is required.";
    if (!student_email.trim()) errors.student_email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(student_email)) errors.student_email = "Email format is invalid.";
    if (!student_password.trim()) errors.student_password = "Password is required.";
    else if (student_password.length < 6) errors.student_password = "Password must be at least 6 characters.";
    if (!study_year.trim()) errors.study_year = "Study year is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit student to server using service
  const sendstudentToServer = () => {
    if (!validateForm()) return;

 authservice.register(formData)
      .then((result) => {
        setMsg(result.msg); // show server message
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
    setMsg("");
  };

  return (
    <div className="main4">
      <AdminSidebar />
      <div className="form3"><br />
        <h2 style={{ color: "yellow" }}>ADD STUDENT</h2><br />

        {msg && <div className="server-msg">{msg}</div>}

        <input
          type="text"
          name="student_name"
          placeholder="Enter Student Name"
          value={formData.student_name}
          onChange={handleChange}
        /><br />
        {errors.student_name && <div className="error">{errors.student_name}</div>}

        <input
          type="text"
          name="student_email"
          placeholder="Enter Student Email"
          value={formData.student_email}
          onChange={handleChange}
        /><br />
        {errors.student_email && <div className="error">{errors.student_email}</div>}

        <input
          type="password"
          name="student_password"
          placeholder="Enter Student Password"
          value={formData.student_password}
          onChange={handleChange}
        /><br />
        {errors.student_password && <div className="error">{errors.student_password}</div>}

        <input
          type="text"
          name="study_year"
          placeholder="Enter Student Study Year"
          value={formData.study_year}
          onChange={handleChange}
        /><br />
        {errors.study_year && <div className="error">{errors.study_year}</div>}

        <div className="buttons">
          <button className="btn" onClick={sendstudentToServer}>Add Student</button>
          <button className="btn" onClick={handleClear}>Clear</button>
        </div>
      </div>
    </div>
  );
}
