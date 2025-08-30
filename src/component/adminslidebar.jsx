import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBook,
  FaUserGraduate,
  FaClipboardList,
  FaFolderPlus,
  FaListAlt,
  FaBookOpen,
  FaUserPlus,
  FaBookReader,
  FaEnvelope,
  FaSignOutAlt,
  FaUserCircle
} from "react-icons/fa";
import "./adminslidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="sidebar-main">
      <aside className="sidebar">
        {/* Admin Profile */}
        <div className="admin-profile">
          <FaUserCircle className="profile-icon" />
          <div className="admin-info">
            <span className="admin-name">Admin Panel</span>
            <span className="admin-role">Administrator</span>
          </div>
        </div>

        {/* Sidebar Menu */}
        <ul className="sidebar-list">
          <li>
            <Link className="sidebar-button" to="/admindashboard">
              <FaTachometerAlt className="icon" /> Dashboard
            </Link>
          </li>

          <li>
            <div className="sidebar-button" onClick={() => toggleMenu("category")}>
              <FaFolderPlus className="icon" /> Category
            </div>
            {openMenu === "category" && (
              <ul className="submenu">
                <li><Link className="sidebar-button" to="/addcategory"><FaFolderPlus className="sub-icon" /> Add Category</Link></li>
                <li><Link className="sidebar-button" to="/viewcategory"><FaListAlt className="sub-icon" /> View Category</Link></li>
              </ul>
            )}
          </li>

          <li>
            <div className="sidebar-button" onClick={() => toggleMenu("book")}>
              <FaBook className="icon" /> Book
            </div>
            {openMenu === "book" && (
              <ul className="submenu">
                <li><Link className="sidebar-button" to="/addbook"><FaBookOpen className="sub-icon" /> Add Book</Link></li>
                <li><Link className="sidebar-button" to="/viewbook"><FaListAlt className="sub-icon" /> View Book</Link></li>
              </ul>
            )}
          </li>

          <li>
            <div className="sidebar-button" onClick={() => toggleMenu("student")}>
              <FaUserGraduate className="icon" /> Student
            </div>
            {openMenu === "student" && (
              <ul className="submenu">
                <li><Link className="sidebar-button" to="/addstudent"><FaUserPlus className="sub-icon" /> Add Student</Link></li>
                <li><Link className="sidebar-button" to="/viewstudent"><FaListAlt className="sub-icon" /> View Student</Link></li>
              </ul>
            )}
          </li>

          <li>
            <div className="sidebar-button" onClick={() => toggleMenu("issued")}>
              <FaClipboardList className="icon" /> Issued Book
            </div>
            {openMenu === "issued" && (
              <ul className="submenu">
                <li><Link className="sidebar-button" to="/AddIssuedBook"><FaBookReader className="sub-icon" /> Add Issued Book</Link></li>
                <li><Link className="sidebar-button" to="/viewissuedbook"><FaListAlt className="sub-icon" /> View Issued Books</Link></li>
              </ul>
            )}
          </li>

          <li>
            <div className="sidebar-button" onClick={() => toggleMenu("studentData")}>
              <FaEnvelope className="icon" /> Student Data
            </div>
            {openMenu === "studentData" && (
              <ul className="submenu">
                <li><Link className="sidebar-button" to="/viewstudentbookdatabyid"><FaUserGraduate className="sub-icon" /> View by ID</Link></li>
                <li><Link className="sidebar-button" to="/viewstdbookdatabyuseremail"><FaEnvelope className="sub-icon" /> View by Email</Link></li>
              </ul>
            )}
          </li>

          <li>
            <div className="sidebar-button logout" onClick={handleLogout}>
              <FaSignOutAlt className="icon" /> Logout
            </div>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default AdminSidebar;
