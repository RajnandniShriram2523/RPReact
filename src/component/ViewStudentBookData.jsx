import React, { useEffect, useState } from "react";
import "./ViewStudentBookData.css";
import AdminSidebar from "./adminslidebar";
import viewstdbookdata from "../services/dataservice"; // API methods

export default function ViewStudentBookData() {
  const [searchInput, setSearchInput] = useState("");
  const [studentId, setStudentId] = useState(null);

  const [issuedBooks, setIssuedBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(2);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStudentBooks = (student_id, page, limit) => {
    if (!student_id) return;

    setLoading(true);

    viewstdbookdata
      .getIssuedBooksByStudent(student_id, page, limit)
      .then((res) => {
        const data = res.data.data || res.data;

        const issued = Array.isArray(data.issued) ? data.issued : [];
        const returned = Array.isArray(data.returned) ? data.returned : [];

        setIssuedBooks(issued);
        setReturnedBooks(returned);

        const totalPagesFromResponse = res.data.totalPages || data.totalPages || 1;
        setTotalPages(totalPagesFromResponse);
      })
      .catch(() => {
        setIssuedBooks([]);
        setReturnedBooks([]);
        setTotalPages(1);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (studentId) {
      fetchStudentBooks(studentId, currentPage, limit);
    }
  }, [studentId, currentPage]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = searchInput.trim();
    if (!trimmedInput) return;

    setStudentId(trimmedInput);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearchInput("");
    setStudentId(null);
    setIssuedBooks([]);
    setReturnedBooks([]);
    setTotalPages(1);
    setCurrentPage(1);
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
          <h3 className="issuedbook-title">Search Student's Issued Books</h3>

          <form onSubmit={handleSearchSubmit} className="search-student-form">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Enter Student ID"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="search-input"
              />
              {searchInput && (
                <button
                  type="button"
                  className="clear-input-btn"
                  onClick={handleClear}
                  title="Clear"
                >
                  &times;
                </button>
              )}
            </div>
            <button type="submit" className="search-button">Search</button>
          </form>

          {loading ? (
            <p className="issuedbook-loading">Loading student books...</p>
          ) : studentId ? (
            <>
              <h4>Issued Books</h4>
              <BookTable books={issuedBooks} currentPage={currentPage} limit={limit} />

              <h4>Returned Books</h4>
              <BookTable books={returnedBooks} currentPage={currentPage} limit={limit} />

              {totalPages > 1 && (
                <div className="pagination-controls" style={{ textAlign: "center", marginTop: "20px" }}>
                  <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
                  <span style={{ margin: "0 10px" }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
                </div>
              )}
            </>
          ) : (
            <p className="issuedbook-loading">Enter a student ID to view book data.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Table component
function BookTable({ books, currentPage, limit }) {
  return (
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
        {books.length > 0 ? (
          books.map((book, index) => (
            <tr key={book.issue_id || index}>
              <td>{(currentPage - 1) * limit + index + 1}</td>
              <td>{book.student_name || "N/A"}</td>
              <td>{book.book_title || "N/A"}</td>
              <td>{book.issue_date ? book.issue_date.substring(0, 10) : "N/A"}</td>
              <td>{book.due_date ? book.due_date.substring(0, 10) : "N/A"}</td>
              <td>{book.return_date ? book.return_date.substring(0, 10) : "N/A"}</td>
              <td>{book.status || "N/A"}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="issuedbook-nodata">No issue Book found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}