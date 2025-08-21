import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import viewonlyissuedbook from "../services/dataservice";
import "./ViewOnlyIssuedBook.css";
import AdminSidebar from "./adminslidebar";

export default function ViewOnlyIssuedBooks() {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5); // I increased limit to 5 for consistency
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOnlyIssuedBooks(currentPage, limit);
  }, [currentPage, limit]);

  const fetchOnlyIssuedBooks = (page, limit) => {
    setLoading(true);
    viewonlyissuedbook
      .getOnlyIssuedBooks(page, limit)
      .then((res) => {
        const data = res.data;
        setIssuedBooks(data.BookList || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => {
        console.error("Error fetching only issued books:", err);
        setIssuedBooks([]);
      })
      .finally(() => setLoading(false));
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      navigate("/viewissuedbook"); // go back to full issued book list
    } else if (value === "issued") {
      navigate("/viewonlyissuedbook"); // stay here
    } else if (value === "returned") {
      navigate("/viewonlyreturnedbook"); // go to returned books page
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="main-issued">
      <AdminSidebar />
      <div className="issuedbook-wrapper">
        <div className="issuedbook-container">
          <h3 className="issuedbook-title">Issued Book List</h3>

          {/* Search and Filter */}
          <div className="issuedbook-search">
            <input type="text" placeholder="Search issued books..." />
            <select className="issuedbook-dropdown" onChange={handleFilterChange} value="issued">
              <option value="">Filter by status</option>
              <option value="issued">Issued</option>
              <option value="returned">Returned</option>
            </select>
          </div>

          {loading ? (
            <p className="issuedbook-loading">Loading issued books...</p>
          ) : (
            <>
              <table className="issuedbook-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Student Name</th>
                    <th>Book Title</th>
                    <th>Issue Date</th>
                    <th>Due Date</th>
                    <th>Return Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {issuedBooks.length > 0 ? (
                    issuedBooks.map((book, index) => (
                      <tr key={book.issue_id}>
                        <td>{(currentPage - 1) * limit + index + 1}</td>
                        <td>{book.student_name}</td>
                        <td>{book.book_title}</td>
                        <td>{book.issue_date?.substring(0, 10) || "N/A"}</td>
                        <td>{book.due_date?.substring(0, 10) || "N/A"}</td>
                        <td>{book.return_date?.substring(0, 10) || "N/A"}</td>
                        <td>{book.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="issuedbook-nodata">
                        No issued books found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="pagination-controls">
                <button onClick={handlePrev} disabled={currentPage === 1}>
                  Prev
                </button>
                <span style={{ margin: "0 10px" }}>
                  Page {currentPage} of {totalPages}
                </span>
                <button onClick={handleNext} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}