import React from "react";
import "./about.css";
import Navbar from "./component/navbar";

class About extends React.Component {
  render() {
    return (
      <>
      <div className="navbar1234">
        <Navbar/>
      </div>
      <div >
        <h1 className="heading123">About</h1>
        </div>
        <div className="box">
        
          
          <div className="box1">
            <h2>📚 Store All Resource Information</h2>
            <p>
              Whether it's a book, journal, newspaper, or magazine, just scan
              the ISBN barcode and enter details like the title, author,
              language, publisher’s name, and year of publication to add the
              resource to a central database.
            </p>
          </div>

          <div className="box1">
            <h2>👥 Streamline Membership Management</h2>
            <p>
              Need to enroll a new member? Just fill in their name, mobile
              number, and email address, then upload a picture. With our
              powerful reporting feature, librarians can easily manage member
              details, keep track of borrowed books, and filter data by due
              dates or visit frequency.
            </p>
          </div>

          <div className="box1">
            <h2>🔄 One-Click Borrow & Renewal Requests</h2>
            <p>
              Members can use the app to request new books or extend due dates.
              Requests are categorized and tracked in individual reports.
              Librarians can then approve or reject requests based on book
              availability.
            </p>
          </div>

          <div className="box1">
            <h2>📊 Powerful Analytics & Reports</h2>
            <p>
              Get real-time insights into circulation stats, overdue books,
              popular titles, and member engagement. Admins can generate and
              export detailed reports for audits and planning.
            </p>
          </div>

          <div className="box1">
            <h2>🖥️ Admin Dashboard</h2>
            <p>
              A central dashboard for managing users, books, categories, and
              transactions. Easily navigate through all modules with
              user-friendly interfaces and secure login access.
            </p>
          </div>

          <div className="box1">
            <h2>📦 Inventory & Stock Management</h2>
            <p>
              Track total stock, available copies, and missing/damaged books.
              Automated alerts notify admins when stock is low or when books
              need replacement.
            </p>
          </div>
        </div>

        {/* Mission Statement Section */}
        <div className="mission-section">
          <h2>🌟 Our Mission</h2>
          <p>
            At LibraryHub, our mission is to empower educational institutions and
            communities with powerful digital tools to efficiently manage
            resources, promote reading, and enhance the learning experience for all
            ages.
          </p>
        </div>

        {/* Footer */}
        <footer className="footer2">

           <p>© 2025 Library Hub. All Rights Reserved.</p>
            <p>📧 libraryhub@gmail.com | ☎ +91-1919191919</p>

        </footer>
      </>
    );
  }
}

export default About;