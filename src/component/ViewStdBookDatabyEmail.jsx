import React, { useEffect, useState } from "react";
import "./ViewStdBookDatabyEmail.css";
import AdminSidebar from "./adminslidebar";
import viewstdbookdataemail from "../services/dataservice"; // API methods

export default function ViewStdBookDatabyEmail() {
  const [searchInput, setSearchInput] = useState("");
  const [studentEmail, setStudentEmail] = useState(null);

  const [issuedBooks, setIssuedBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch books by student email
  const fetchStudentBooks = (student_email) => {
    if (!student_email) return;
    setLoading(true);

    viewstdbookdataemail
      .getstdBooksDataByEmail(student_email)
      .then((res) => {
        const allBooks = res.data.data || [];

        const issued = allBooks.filter((book) => book.status === "issued");
        const returned = allBooks.filter(
          (book) => book.status === "returned" || book.status === "overdue"
        );

        setIssuedBooks(issued);
        setReturnedBooks(returned);
      })
      .catch(() => {
        setIssuedBooks([]);
        setReturnedBooks([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (studentEmail) {
      fetchStudentBooks(studentEmail);
    }
  }, [studentEmail]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (!trimmed) return;

    setStudentEmail(trimmed);
  };

  const handleClear = () => {
    setSearchInput("");
    setStudentEmail(null);
    setIssuedBooks([]);
    setReturnedBooks([]);
  };

  // === New toggle function to mark issued book as returned ===
  const toggleToReturned = async (issue_id) => {
    try {
      const res = await viewstdbookdataemail.toggleStatus(issue_id); // Your API call

      if (res.data?.status === "success" && res.data.newStatus === "returned") {
        const returnDate = new Date().toISOString().substring(0, 10);

        // Remove from issuedBooks
        setIssuedBooks((prevBooks) =>
          prevBooks.filter((book) => book.issue_id !== issue_id)
        );

        // Find the toggled book from issuedBooks before filtering
        const returnedBook = issuedBooks.find((book) => book.issue_id === issue_id);
        if (returnedBook) {
          // Update status & return_date
          const updatedBook = {
            ...returnedBook,
            status: "returned",
            return_date: returnDate,
          };
          // Add to returnedBooks at the top
          setReturnedBooks((prevReturned) => [updatedBook, ...prevReturned]);
        }
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
          <h3 className="issuedbook-title">Search Student's Issued Books</h3>

          <form onSubmit={handleSearchSubmit} className="search-student-form">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Enter Student Email"
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
            <button type="submit" className="search-button">
              Search
            </button>
          </form>

          {loading ? (
            <p className="issuedbook-loading">Loading student books...</p>
          ) : studentEmail ? (
            <>
              <h4>Issued Books</h4>
              <BookTable books={issuedBooks} toggleToReturned={toggleToReturned} />

              <h4>Returned Books</h4>
              <BookTable books={returnedBooks} />
            </>
          ) : (
            <p className="issuedbook-loading">Enter a student email to view book data.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable Book Table Component with toggle button support
function BookTable({ books, toggleToReturned }) {
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
              <td>{index + 1}</td>
              <td>{book.student_name || "N/A"}</td>
              <td>{book.book_title || "N/A"}</td>
              <td>{book.issue_date?.substring(0, 10) || "N/A"}</td>
              <td>{book.due_date?.substring(0, 10) || "N/A"}</td>
              <td>{book.return_date?.substring(0, 10) || "N/A"}</td>
              <td>
                {book.status === "issued" && toggleToReturned ? (
                  <button
                    className="toggle-returned-btn"
                    onClick={() => toggleToReturned(book.issue_id)}
                  >
                    Mark as Returned
                  </button>
                ) : (
                  <span className="returned-label">{book.status || "N/A"}</span>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="issuedbook-nodata">
              No data found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}