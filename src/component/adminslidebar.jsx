import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
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
    <div className='main10'>
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul className="sidebar-list">
          <li>
            <Link className="sidebar-button" to="/admindashboard">Dashboard</Link>
          </li>

          <li>
            <div className="sidebar-button" onClick={() => toggleMenu("category")}>
              Category
            </div>
            {openMenu === "category" && (
              <ul className="submenu">
                <li><Link className="sidebar-button" to="/addcategory">Add Category</Link></li>
                <li><Link className="sidebar-button" to="/viewcategory">View Category</Link></li>
              </ul>
            )}
          </li>

          <li>
            <div className="sidebar-button" onClick={() => toggleMenu("book")}>
              Book
            </div>
            {openMenu === "book" && (
              <ul className="submenu">
                <li><Link className="sidebar-button" to="/addbook">Add Book</Link></li>
                <li><Link className="sidebar-button" to="/viewbook">View Book</Link></li>
              </ul>
            )}
          </li>

          <li>
            <div className="sidebar-button" onClick={() => toggleMenu("student")}>
              Student
            </div>
            {openMenu === "student" && (
              <ul className="submenu">
                <li><Link className="sidebar-button" to="/addstudent">Add Student</Link></li>
                <li><Link className="sidebar-button" to="/viewstudent">View Student</Link></li>
              </ul>
            )}
          </li>

          <li>
            <div className="sidebar-button" onClick={() => toggleMenu("issued")}>
              Issued Book
            </div>
            {openMenu === "issued" && (
              <ul className="submenu">
                <li><Link className="sidebar-button" to="/AddIssuedBook">Add Issuedbook</Link></li>
                <li><Link className="sidebar-button" to="/viewissuedbook">View All Issued Book</Link></li>
              </ul>
            )}
          </li>

          <li>
            <div className="sidebar-button" onClick={() => toggleMenu("studentData")}>
              Student Data
            </div>
            {openMenu === "studentData" && (
              <ul className="submenu">
                <li><Link className="sidebar-button" to="/viewstudentbookdatabyid">View by ID</Link></li>
                <li><Link className="sidebar-button" to="/viewstdbookdatabyuseremail">View by Email</Link></li>
              </ul>
            )}
          </li>

          <li>
            <input type='button' onClick={handleLogout} value="Logout" />
          </li>
        </ul>
      </aside>

      {/* <div className='dashboard'>
        <h1>Welcome to Admin Dashboard</h1>
      </div> */}
    </div>
  );
};

export default AdminSidebar;
