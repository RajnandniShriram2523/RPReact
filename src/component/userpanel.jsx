import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBook, FaHistory, FaSignOutAlt, FaExchangeAlt, FaCheck } from 'react-icons/fa';
import './userpanel.css';

const Userpanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
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
         <li>
          <Link className="sidebar-btn" to="/userdashboard">
            <FaUser className="sidebar-icon"/> Dashboard
          </Link>
        </li>
        <li>
          <Link className="sidebar-btn" to="/view-profile">
            <FaUser className="sidebar-icon"/> Profile
          </Link>
        </li>
        <li>
          <Link className="sidebar-btn" to="/userviewbook">
            <FaBook className="sidebar-icon"/> View Books
          </Link>
        </li>
        <li>
          <Link className="sidebar-btn" to="/userissued">
            <FaExchangeAlt className="sidebar-icon"/> Issue Books
          </Link>
        </li>
        <li>
          <Link className="sidebar-btn" to="/userreturned">
            <FaCheck className="sidebar-icon"/> Returned Books
          </Link>
        </li>
        <li>
          <Link className="sidebar-btn" to="/userhistory">
            <FaHistory className="sidebar-icon"/> History
          </Link>
        </li>
        <li>
          <button className="sidebar-btn logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="sidebar-icon"/> Logout
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Userpanel;
