import React, { useEffect, useState } from "react";
import AuthService from "../services/authservice";
import "./viewprofile.css";
import Userpanel from "./userpanel";

export default function ViewProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      AuthService.getProfile()
        .then(data => {
          console.log("✅ Profile data:", data);
          setProfile(data);
        })
        .catch(err => {
          console.error("❌ Profile fetch error:", err.response?.data || err.message);
        });
    } else {
      console.warn("⚠️ No token found, user not logged in.");
    }
  }, []);

  if (!profile) return <p className="loading-text">Loading...</p>;

  const userData = profile.profile;

  return (
   
    <div className="profile-container">
   <Userpanel />
   <div className="profilemain">
      <div className="profile-card">
        {/* Left side - Avatar */}
        <div className="profile-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile avatar"
            className="profile-avatar"
          />
          <h3>{userData.student_name}</h3>
          <p>{userData.student_email}</p>
        </div>

        {/* Right side - Info */}
        <div className="profile-right">
          <h2>Profile Information</h2>
          <div className="info-grid">
            <p><span>Student ID:</span> {userData.student_id}</p>
            <p><span>Study Year:</span> {userData.study_year}</p>
            <p><span>Created At:</span> {new Date(userData.created_at).toLocaleDateString()}</p>
            <p><span>Role:</span> {localStorage.getItem("role") || "Student"}</p>
          </div>

          {/* <button
            onClick={() => AuthService.logout()}
            className="logout-btn"
          >
            Logout
          </button> */}
        </div>
      </div>
      </div>
    </div>
   
  );
}
