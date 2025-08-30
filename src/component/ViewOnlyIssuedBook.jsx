import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import viewonlyissuedbook from "../services/dataservice";
import "./ViewOnlyIssuedBook.css";
import AdminSidebar from "./adminslidebar";

export default function ViewOnlyIssuedBooks() {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchOnlyIssuedBooks(currentPage, limit);
    } else {
      searchIssuedBooks(searchTerm);
    }
  }, [currentPage, limit, searchTerm]);

  const fetchOnlyIssuedBooks = async (page, limit) => {
    setLoading(true);
    try {
      const res = await viewonlyissuedbook.getOnlyIssuedBooks(page, limit);
      const data = res.data;
      setIssuedBooks(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching only issued books:", err);
      setIssuedBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const searchIssuedBooks = async (studentName) => {
    setLoading(true);
    try {
      const res = await viewonlyissuedbook.searchOnlyIssuedBooksByStudentName(studentName);
      const data = res.data;

      setIssuedBooks(data.data || []);
      setTotalPages(1);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error searching issued books:", err);
      setIssuedBooks([]);
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // ✅ Toggle status from issued to returned
  const toggleToReturned = async (issue_id) => {
    try {
      const res = await viewonlyissuedbook.toggleStatus(issue_id);

      if (res.data?.status === "success" && res.data.newStatus === "returned") {
        const returnDate = new Date().toISOString().substring(0, 10);

        setIssuedBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.issue_id === issue_id
              ? {
                  ...book,
                  status: "returned",
                  return_date: returnDate,
                }
              : book
          )
        );
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Error updating book status.");
    }
  };

  return (
    <div className="main-issued">
      <AdminSidebar />
      <div className="issuedbook-wrapper">
        <div className="issuedbook-container">
          <h3 className="issuedbook-title">Issued Book List</h3>

          <div className="issuedbook-search">
            <input
              type="text"
              placeholder="Search issued books by student name..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select
              className="issuedbook-dropdown"
              onChange={handleFilterChange}
              value="issued"
            >
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
                        <td>
                          {book.status === "issued" ? (
                            <button onClick={() => toggleToReturned(book.issue_id)}>
                              Mark as Returned
                            </button>
                          ) : (
                            <span className="returned-label">Returned</span>
                          )}
                        </td>
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