import React from 'react';
import AdminSidebar from './adminslidebar';
import './admindashboard.css'; // Import CSS file

const AdminDashboard = () => {
  return (
    <div className='dashboard-container'>
      <AdminSidebar />
      <div className='dashboard-content'>
        <h1>Welcome to Admin Dashboard</h1>
        <p>This is a basic functional component structure.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
