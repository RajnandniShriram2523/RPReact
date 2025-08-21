import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import viewreturnbooks from "../services/dataservice";
import "./ViewOnlyReturnedBook.css";
import AdminSidebar from "./adminslidebar";

export default function ViewOnlyReturnedBook() {
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("returned");

  const navigate = useNavigate();

  useEffect(() => {
    fetchReturnedBooks(currentPage, limit);
  }, [currentPage]);

  const fetchReturnedBooks = (page, limit) => {
    setLoading(true);
    viewreturnbooks
      .getReturnedBooks(page, limit)
      .then((res) => {
        const books = res.data?.data;
        setReturnedBooks(Array.isArray(books) ? books : []);
        // Optional: set totalPages if API provides total count
        // setTotalPages(Math.ceil(res.data.totalCount / limit));
      })
      .catch((err) => {
        console.error("Error fetching returned books:", err);
        setReturnedBooks([]);
      })
      .finally(() => setLoading(false));
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1); // Adjust if totalPages is implemented
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);

    if (value === "") {
      navigate("/viewissuedbook");
    } else if (value === "issued") {
      navigate("/viewonlyissuedbook");
    }
    // "returned" is current page, so no need to navigate
  };

  const filteredBooks = returnedBooks.filter((book) => {
    const studentName = book.student_name?.toLowerCase() || "";
    const bookTitle = book.book_title?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      studentName.includes(search) || bookTitle.includes(search);

    const matchesStatus = statusFilter ? book.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="main-issued">
      <AdminSidebar />
      <div className="issuedbook-wrapper">
        <div className="issuedbook-container">
          <h3 className="issuedbook-title">Returned Books</h3>

          <div className="issuedbook-search">
            <input
              type="text"
              placeholder="Search returned books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="issuedbook-dropdown"
              value={statusFilter}
              onChange={handleFilterChange}
            >
              <option value="">Filter by status</option>
              <option value="issued">Issued</option>
              <option value="returned">Returned</option>
            </select>
          </div>

          {loading ? (
            <p className="issuedbook-loading">Loading returned books...</p>
          ) : !filteredBooks.length ? (
            <p className="issuedbook-nodata">No returned books found</p>
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
                  {filteredBooks.map((book, index) => (
                    <tr key={book.issue_id || index}>
                      <td>{(currentPage - 1) * limit + index + 1}</td>
                      <td>{book.student_name || "N/A"}</td>
                      <td>{book.book_title || "N/A"}</td>
                      <td>{book.issue_date?.substring(0, 10) || "N/A"}</td>
                      <td>{book.due_date?.substring(0, 10) || "N/A"}</td>
                      <td>{book.return_date?.substring(0, 10) || "N/A"}</td>
                      <td>{book.status || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination-controls">
                <button onClick={handlePrev} disabled={currentPage === 1}>
                  Prev
                </button>
                <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
                <button onClick={handleNext}>Next</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}