import React from 'react';
import { Link } from 'react-router-dom';
import './adminslidebar.css'; // Make sure file name is correct

const AdminSidebar = () => {
  return (
    <div>
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul className="sidebar-list">
          <li><Link className="sidebar-button" to="/addcategory">Add Category</Link></li>
          <li><Link className="sidebar-button" to="/viewcategory">View Category</Link></li>

          <li><Link className="sidebar-button" to="/addbook">Add Book</Link></li>
          <li><Link className="sidebar-button" to="/viewbook">View Book</Link></li>

          <li><Link className="sidebar-button" to="/addstudent">Add Student</Link></li>
          <li><Link className="sidebar-button" to="/viewstudent">View Student</Link></li>

          <li><Link className="sidebar-button" to="/about">View Issued Book</Link></li>
          <li><Link className="sidebar-button" to="/contact">View Returned Book</Link></li>
          
          <li><Link className="sidebar-button" to="/">Log Out</Link></li>
        </ul>
      </aside>
    </div>
  );
};

export default AdminSidebar;
