import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Navbar from "./component/navbar";

class Home extends React.Component {
  render() {
    return (
      <>
        <div className="wall">
          <Navbar />
          {/* Hero Section with background image animation */}
          <div className="headling hero-slideshow">
            <div className="overlay">
              <h1>📚 Welcome to Library Hub</h1>
              <h2>Your Gateway to Knowledge and Learning</h2>
              <p>Manage, Borrow, Explore – All in One Place</p>
              <div className="btn-group">
                <Link to="/login" className="btn-primary">Login</Link>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="features">
            <h1>✨ What You Can Do</h1><br /><br />
            <div className="feature-list">
              <div className="feature">
                <h4>🔍 Search Books</h4>
                <p>Find books instantly with our smart search.</p>
              </div>
              <div className="feature">
                <h4>📖 Borrow & Return</h4>
                <p>Easily borrow and return books online.</p>
              </div>
              <div className="feature">
                <h4>👤 Manage Accounts</h4>
                <p>Track your history and manage your profile.</p>
              </div>
              <div className="feature">
                <h4>🌐 Explore Categories</h4>
                <p>Discover books across all subjects & genres.</p>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="why-us">
            <h2>💡 Why Choose Library Hub?</h2><br /><br />
            <div className="why-list">
              <div className="why-card">
                <h4>📘 Huge Collection</h4>
                <p>Thousands of books across genres and subjects.</p>
              </div>
              <div className="why-card">
                <h4>⚡ Easy Access</h4>
                <p>Access library anytime, anywhere with just a click.</p>
              </div>
              <div className="why-card">
                <h4>🤝 Community</h4>
                <p>Connect with learners and share knowledge.</p>
              </div>
              <div className="why-card">
                <h4>🎯 Smart Tools</h4>
                <p>Track due dates, manage borrowing, and stay organized.</p>
              </div>
            </div>
          </div>

          {/* Sliding Images */}
          <div className="slider">
            <h2>📸 Library Moments</h2>
            <div className="slide-track">
              <div className="slide"><img src="/Images/bg1.jpg" alt="Library" /></div>
              <div className="slide"><img src="/Images/bg4.jpg" alt="Books" /></div>
              <div className="slide"><img src="/Images/bg2.jpg" alt="Reading" /></div>
              <div className="slide"><img src="/Images/bg5.jpg" alt="Library" /></div>
              <div className="slide"><img src="/Images/bg3.jpg" alt="Study" /></div>

              {/* duplicate for smooth infinite loop */}
              <div className="slide"><img src="/Images/bg1.jpg" alt="Library" /></div>
              <div className="slide"><img src="/Images/bg4.jpg" alt="Books" /></div>
              <div className="slide"><img src="/Images/bg2.jpg" alt="Reading" /></div>
              <div className="slide"><img src="/Images/bg5.jpg" alt="Library" /></div>
              <div className="slide"><img src="/Images/bg3.jpg" alt="Study" /></div>
            </div>
          </div>

          {/* About Section */}
          <div className="about">
            <h2>📖 About Library Hub</h2><br></br>
            <p>
              Whether you are a student, teacher, or researcher, Library Hub 
              helps you save time, stay organized, and enjoy seamless access 
              to the world of knowledge.
            </p>
            <p>
              Library Hub is your one-stop solution for managing books,
              borrowing, and exploring a wide variety of resources.<br />
              Our mission is to make learning accessible and enjoyable for everyone.
            </p>
         <br></br>
          {/* Gallery */}
          <div className="images">
            <div className="img1">
              <img src="https://t4.ftcdn.net/jpg/02/84/78/47/360_F_284784701_qCQUW8mEhTF02C8c8W0J2W9zgNZh3PZj.jpg" alt="Library" />
            </div>
            <div className="img1">
              <img src="https://ripsgroupjjn.org/ripsjjn/library1.jpg" alt="Bookshelves" />
            </div>
            <div className="img1">
              <img src="https://img.freepik.com/premium-photo/adult-students-studying-together-library_13339-100475.jpg" alt="Students" />
            </div>
          </div>
 </div>
          {/* Footer */}
          <footer className="footer1">
            <p>© 2025 Library Hub. All Rights Reserved.</p>
            <p>📧 libraryhub@gmail.com | ☎ +91-1919191919</p>

            {/* Social Media Icons */}
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" />
              </a>
            </div>
          </footer>
        </div>
      </>
    );
  }
}

export default Home;
