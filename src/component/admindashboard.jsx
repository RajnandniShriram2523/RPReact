import React from 'react';
import AdminSidebar from './adminslidebar';
import './admindashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <AdminSidebar />
      <div className="dashboard-content">
        <div className="welcome-card">
          <h1 className="welcome-text">Welcome to Admin Dashboard</h1>
          {/* <p className="subtitle">Manage your system with ease and clarity</p> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
