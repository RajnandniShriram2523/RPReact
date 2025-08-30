import React from "react";
import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import "./home.css"
class Home extends React.Component {
    render() {
        return <>
            <div className="wall">
                <div className="headling">
                    <h1>Welcome to Library Hub</h1>
                    <h1>Your Gateway to Knowledge and Learning</h1>
                    <h1>Manage, Borrow, Explore – All in One Place</h1>
                    <div>
      <Link to="/login" className=" btn-primary">Login</Link>
    </div>
                </div>

                {
                    <div className="slide-track">
                        <div className="slide"><img src="public/Images/bg1.jpg" alt="1" /></div>
                        <div className="slide"><img src="public/Images/bg4.jpg" alt="1" /></div>
                        <div className="slide"><img src="public/Images/bg2.jpg" alt="1" /></div>
                        <div className="slide"><img src="public/Images/bg5.jpg" alt="1" /></div>
                        <div className="slide"><img src="public/Images/bg3.jpg" alt="1" /></div>
                        <div className="slide"><img src="public/Images/bg8.jpg" alt="1" /></div>
                        <div className="slide"><img src="public/Images/bg7.jpg" alt="2" /></div>
                        <div className="slide"><img src="public/Images/bg1.jpg" alt="2" /></div>
                        <div className="slide"><img src="public/Images/bg9.jpg" alt="2" /></div>

                    </div>}
                    

                <div className="images">

                    <div className="img1">
                        <img src="https://t4.ftcdn.net/jpg/02/84/78/47/360_F_284784701_qCQUW8mEhTF02C8c8W0J2W9zgNZh3PZj.jpg"></img>

                    </div>
                    <div className="img1">
                        <img src="https://ripsgroupjjn.org/ripsjjn/library1.jpg"></img>
                    </div>
                    <div className="img1">
                        <img src="https://img.freepik.com/premium-photo/adult-students-studying-together-library_13339-100475.jpg"></img>
                    </div>
                </div>




            </div>


        </>
    }
}
export default Home;