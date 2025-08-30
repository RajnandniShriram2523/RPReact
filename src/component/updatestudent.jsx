import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataService from "../services/dataservice";
import AdminSidebar from "./adminslidebar";
import "./updatestudent.css";   // new design css

export default function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    student_name: "",
    student_email: "",
    study_year: ""
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch student by ID
  useEffect(() => {
    DataService.getStudentById(id)
      .then((res) => {
        setFormData({
          student_name: res.data.student_name,
          student_email: res.data.student_email,
          study_year: res.data.study_year,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching student:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    DataService.updateStudent(id, formData)
      .then(() => {
        setMessage("✅ Student updated successfully!");
        setTimeout(() => navigate("/viewstudent"), 1500);
      })
      .catch((err) => {
        console.error("❌ Update failed:", err);
        setMessage("❌ Update failed!");
      });
  };

  if (loading) return <h3 className="loading">Loading student data...</h3>;

  return (
    <div className="main1000">
      
      <div className="update-wrapper">
        <AdminSidebar />
        <div className="update-card">
          <div className="update-header">
            <h2>Update Student</h2>
          </div>
          <form onSubmit={handleSubmit} className="update-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="student_name"
                value={formData.student_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="student_email"
                value={formData.student_email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Study Year</label>
              <input
                type="number"
                name="study_year"
                value={formData.study_year}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="update-btn">Update</button>
          </form>

          {message && (
            <div className={`message ${message.includes("❌") ? "error" : "success"}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
