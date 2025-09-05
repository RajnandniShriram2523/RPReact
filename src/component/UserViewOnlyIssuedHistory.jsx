import React, { useEffect, useState } from "react";
import DataService from "../services/dataservice.js";
import Userpanel from "./userpanel.jsx";
import "./UserViewOnlyIssuedHistory.css"; // optional css

export default function UserIssuedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ always take student_id of logged in user
    const studentId = localStorage.getItem("student_id");

    if (!studentId) {
      setError("No student ID found. Please log in again.");
      setLoading(false);
      return;
    }

    // call API for issued books of this student
    DataService.getuserIssuedBooks(studentId)
      .then((res) => {
        if (res.status === "success") {
          setBooks(res.data || []);
        } else {
          setError("Failed to load issued books");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching issued books:", err);
        setError(err.message || "Failed to fetch issued books");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading issued books...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="nav">
        <Userpanel/>   
    <div className="history-container">
      <h2>📖 My Issued Books</h2>

      {books.length === 0 ? (
        <p>No issued books yet.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Author</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{book.book_title}</td>
                <td>{book.book_author}</td>
                <td>{book.issue_date?.slice(0, 10) || "-"}</td>
                <td>{book.due_date?.slice(0, 10) || "-"}</td>
                <td className={book.status?.toLowerCase()}>{book.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
     </div>
  );
}
