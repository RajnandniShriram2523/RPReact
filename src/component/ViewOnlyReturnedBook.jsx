import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import viewreturnbooks from "../services/dataservice";
import "./ViewOnlyReturnedBook.css";
import AdminSidebar from "./adminslidebar";

export default function ViewOnlyReturnedBook() {
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // added search term

  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchReturnedBooks(currentPage, limit);
    } else {
      searchReturnedBooks(searchTerm);
    }
  }, [currentPage, limit, searchTerm]);

  const fetchReturnedBooks = async (page, limit) => {
    setLoading(true);

    try {
      const res = await viewreturnbooks.getReturnedBooks(page, limit);
      const responseData = res.data;

      setReturnedBooks(responseData.data || []);
      setTotalPages(responseData.totalPages || 1);
      setCurrentPage(responseData.currentPage || 1);
    } catch (err) {
      console.error("Error fetching returned books:", err);
      setReturnedBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // Updated: search API call to use 'data.data' as per backend response
  const searchReturnedBooks = async (studentName) => {
    setLoading(true);
    try {
      const res = await viewreturnbooks.searchReturnedBooksByStudentName(studentName);
      const data = res.data;

      setReturnedBooks(data.data || []);  // <-- Updated line here
      setTotalPages(1);  // disable pagination when searching
      setCurrentPage(1);
    } catch (err) {
      console.error("Error searching returned books:", err);
      setReturnedBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      navigate("/viewissuedbook");
    } else if (value === "issued") {
      navigate("/viewonlyissuedbook");
    } else if (value === "returned") {
      navigate("/viewonlyreturnedbook");
    }
  };

  // New: handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
          <h3 className="issuedbook-title">Returned Book List</h3>

          {/* Filter Dropdown + Search input enabled */}
          <div className="issuedbook-search">
            <input
              type="text"
              placeholder="Search returned books..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select
              className="issuedbook-dropdown"
              onChange={handleFilterChange}
              value="returned"
            >
              <option value="">Filter by status</option>
              <option value="issued">Issued</option>
              <option value="returned">Returned</option>
            </select>
          </div>

          {loading ? (
            <p className="issuedbook-loading">Loading returned books...</p>
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
                  {returnedBooks.length > 0 ? (
                    returnedBooks.map((book, index) => (
                      <tr key={book.issue_id}>
                        <td>{(currentPage - 1) * limit + index + 1}</td>
                        <td>{book.student_name || "N/A"}</td>
                        <td>{book.book_title || "N/A"}</td>
                        <td>{book.issue_date?.substring(0, 10) || "N/A"}</td>
                        <td>{book.due_date?.substring(0, 10) || "N/A"}</td>
                        <td>{book.return_date?.substring(0, 10) || "N/A"}</td>
                        <td>{book.status || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="issuedbook-nodata">
                        No returned books found
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