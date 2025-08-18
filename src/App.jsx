import React from "react";
import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Slidelinging from "./slidelinging";
import Home from "./home";
import About from "./about";
import Contact from "./contact";
import Login from '../src/component/login';
import AdminSidebar from '../src/component/adminslidebar';
import AddCategory from '../src/component/addcategory';
// import viewcat from './component/ViewCategory';
import Addbook from "../src/component/addbook";
import AddStudent from "../src/component/addstudent";
import ViewCategory from "./component/viewcategory";
import ViewBook from "./component/viewbook";

class App extends React.Component{
  render() {
    return (
      <BrowserRouter>
      
        <nav className="navbar navbar-expand-lg ">
          <NavLink className="navbar-brand" to="/"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/c46c7f62556223.5a945f059c90e.png" /></NavLink>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/"></NavLink>
              </li> 
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="services"></NavLink>
              </li>
           </ul>
          </div>
          <div>
            <Link to="/login" className=" btn-primary">Login</Link> 
            {/* <a href="/login" className="login_btn">Login</a> */}
           </div>
        </nav>

        <Routes>
          <Route path="/" element={<Slidelinging />}/>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminsildebar" element={<AdminSidebar />} />
          <Route path="/addcategory" element={<AddCategory />} />
           <Route path="/viewcategory" element={<ViewCategory />} />
          <Route path="/addbook" element={<Addbook />} />
          <Route path="/viewbook" element={<ViewBook />} />
          <Route path="/addstudent" element={<AddStudent />} />

        </Routes>
      </BrowserRouter>
    );
  }
}




export default App;
