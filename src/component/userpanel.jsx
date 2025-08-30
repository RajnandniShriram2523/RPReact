import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate hook
import './userpanel.css';

const Userpanel = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user"); // optional, if storing student data
    navigate("/login"); // Now this works
  };

  return (
    <aside className="user-panel">
      {/* User Info Section */}
      <div className="user-info">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw_JmAXuH2Myq0ah2g_5ioG6Ku7aR02-mcvimzwFXuD25p2bjx7zhaL34oJ7H9khuFx50&usqp=CAU" 
          alt="User Logo" 
          className="user-logo" 
        />
        <h2>User Panel</h2>
      </div>

      {/* Sidebar Links */}
      <ul className="data-list">
        <li><Link className="sidebar-btn" to="/view-profile">Profile</Link></li>
        <li><Link className="sidebar-btn" to="/userbook">View Books</Link></li>
        <li><Link className="sidebar-btn" to="*">Issue Books</Link></li>
        <li><Link className="sidebar-btn" to="*">Returned Books</Link></li>
        <li><Link className="sidebar-btn" to="*">History</Link></li>
        <li>
          <input type='button' onClick={handleLogout} value="Logout" />
        </li>
      </ul>
    </aside>
  );
};

export default Userpanel;
