import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from "./home";
import About from "./about";
import Contact from "./contact";
import Login from "./component/login";

import AdminSidebar from "./component/adminslidebar";
import AddCategory from "./component/addcategory";
import Addbook from "./component/addbook";
import AddStudent from "./component/addstudent";
import ViewCategory from "./component/viewcategory";
import ViewBook from "./component/viewbook";
import Viewstudent from "./component/viewstudent";
import AddIssuedBook from "./component/AddIssuedBook";
import Viewissuedbook from "./component/viewissuedbook";
import ViewOnlyIssuedBooks from "./component/ViewOnlyIssuedBook";
import ViewOnlyReturnedBook from "./component/ViewOnlyReturnedBook";
import ViewStudentBookData from "./component/ViewStudentBookData";
import ViewStdBookDatabyEmail from "./component/ViewStdBookDatabyEmail";
import UpdateCategory from "./component/updatecategory";
import UpdateBook from "./component/updatebook";
import AdminDashboard from "./component/admindashboard";

import UserViewBooks from "./component/UserViewBook";
import ViewProfile from "./component/viewprofile.jsx";
import Userpanel from "./component/userpanel";
import UpdateStudent from "./component/updatestudent.jsx";
import UserBookHistory from "./component/UserBookHistory.jsx";
import UserReturnedBooks from "./component/UserViewOnlyReturnedHistory.jsx";
import UserIssuedBooks from "./component/UserViewOnlyIssuedHistory.jsx";

import PrivateRoute from "./component/PrivateRoute"; // ✅ role-based wrapper
import Userdashboard from "./component/Userdashboard.jsx";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          {/* Admin routes (protected) */}
          <Route path="/adminsildebar" element={<PrivateRoute role="admin"><AdminSidebar /></PrivateRoute>} />
          <Route path="/admindashboard" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
          <Route path="/addcategory" element={<PrivateRoute role="admin"><AddCategory /></PrivateRoute>} />
          <Route path="/viewcategory" element={<PrivateRoute role="admin"><ViewCategory /></PrivateRoute>} />
          <Route path="/updatecategory/:id" element={<PrivateRoute role="admin"><UpdateCategory /></PrivateRoute>} />
          <Route path="/addbook" element={<PrivateRoute role="admin"><Addbook /></PrivateRoute>} />
          <Route path="/viewbook" element={<PrivateRoute role="admin"><ViewBook /></PrivateRoute>} />
          <Route path="/updatebook/:id" element={<PrivateRoute role="admin"><UpdateBook /></PrivateRoute>} />
          <Route path="/addstudent" element={<PrivateRoute role="admin"><AddStudent /></PrivateRoute>} />
          <Route path="/viewstudent" element={<PrivateRoute role="admin"><Viewstudent /></PrivateRoute>} />
          <Route path="/updatestudent/:id" element={<PrivateRoute role="admin"><UpdateStudent /></PrivateRoute>} />
          <Route path="/AddIssuedBook" element={<PrivateRoute role="admin"><AddIssuedBook /></PrivateRoute>} />
          <Route path="/viewissuedbook" element={<PrivateRoute role="admin"><Viewissuedbook /></PrivateRoute>} />
          <Route path="/viewonlyissuedbook" element={<PrivateRoute role="admin"><ViewOnlyIssuedBooks /></PrivateRoute>} />
          <Route path="/viewonlyreturnedbook" element={<PrivateRoute role="admin"><ViewOnlyReturnedBook /></PrivateRoute>} />
          <Route path="/viewstudentbookdatabyid" element={<PrivateRoute role="admin"><ViewStudentBookData /></PrivateRoute>} />
          <Route path="/viewstdbookdatabyuseremail" element={<PrivateRoute role="admin"><ViewStdBookDatabyEmail /></PrivateRoute>} />

          {/* Student/User routes (protected) */}
          <Route path="/userpanel" element={<PrivateRoute role="student"><Userpanel /></PrivateRoute>} />
         <Route path="/userdashboard" element={<PrivateRoute role="student"><Userdashboard /></PrivateRoute>} />

          <Route path="/view-profile" element={<PrivateRoute role="student"><ViewProfile /></PrivateRoute>} />
          <Route path="/userviewbook" element={<PrivateRoute role="student"><UserViewBooks /></PrivateRoute>} />
          <Route path="/userhistory" element={<PrivateRoute role="student"><UserBookHistory /></PrivateRoute>} />
          <Route path="/userissued" element={<PrivateRoute role="student"><UserIssuedBooks /></PrivateRoute>} />
          <Route path="/userreturned" element={<PrivateRoute role="student"><UserReturnedBooks /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
