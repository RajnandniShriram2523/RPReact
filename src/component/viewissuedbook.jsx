import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import viewissuedbook from "../services/dataservice";
import "./viewissuedbook.css";
import AdminSidebar from "./adminslidebar";

export default function Viewissuedbook() {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [searchName, setSearchName] = useState("");

  const navigate = useNavigate();

  const fetchIssuedBooks = (page, limit, student_name = "") => {
    setLoading(true);

    const fetchMethod = student_name
      ? viewissuedbook.searchIssuedBooksByStudentName
      : viewissuedbook.getIssuedBooks;

    const args = student_name ? [student_name] : [page, limit];

    fetchMethod(...args)
      .then((res) => {
        const data = res.data;
        setIssuedBooks(data.BookList || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => {
        console.error("Error fetching issued books:", err);
        setIssuedBooks([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!searchName.trim()) {
      fetchIssuedBooks(currentPage, limit);
    }
  }, [currentPage]);

  const handleFilterChange = (e) => {
    const value = e.target.value;

    if (value === "issued") {
      navigate("/viewonlyissuedbook");
    } else if (value === "returned") {
      navigate("/viewonlyreturnedbook");
    }
  };

  const handleSearch = (e) => {
    const name = e.target.value;
    setSearchName(name);
    setCurrentPage(1);
    if (name.trim() === "") {
      fetchIssuedBooks(1, limit);
    } else {
      fetchIssuedBooks(null, null, name.trim());
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const toggleToReturned = async (issue_id) => {
    try {
      const res = await viewissuedbook.toggleStatus(issue_id);

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
          <h3 className="issuedbook-title">Book List</h3>

          {/* Search and Filter */}
          <div className="issuedbook-search">
            <input
              type="text"
              placeholder="Search issued books by student name..."
              value={searchName}
              onChange={handleSearch}
            />
            <select className="issuedbook-dropdown" onChange={handleFilterChange}>
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

              {/* Show pagination only when not searching */}
              {searchName.trim() === "" && (
                <div className="pagination-controls" style={{ textAlign: "center", marginTop: "20px" }}>
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
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}