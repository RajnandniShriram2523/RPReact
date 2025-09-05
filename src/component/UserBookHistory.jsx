import React, { useEffect, useState } from "react";
import AuthService from "../services/authservice.js"; 
import "./UserBookHistory.css";
import Userpanel from "./userpanel.jsx";

export default function UserHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const studentId = AuthService.getstudent_id();
    console.log("📌 Student ID after login:", studentId);

    if (!studentId) {
      setError("No student ID found, please log in again.");
      setLoading(false);
      return;
    }

    AuthService.getMyHistory()
      .then((res) => {
        console.log("✅ History API response:", res);

        // ✅ Normalize history data
        let historyData = [];
        if (res?.history) {
          historyData = res.history;
        } else if (res?.data) {
          historyData = res.data;
        } else if (Array.isArray(res)) {
          historyData = res;
        }

        setHistory(historyData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching history:", err);
        setError(err.message || "Failed to fetch history");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading history...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="nav">
      <Userpanel />
      <div className="history-container">
        <h2>📖 My Book History</h2>

        {history.length === 0 ? (
          <p>No books issued yet.</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Author</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Return Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((book, index) => (
                <tr key={index}>
                  <td>{book.book_title || "-"}</td>
                  <td>{book.book_author || "-"}</td>
                  <td>{book.issue_date ? book.issue_date.slice(0, 10) : "-"}</td>
                  <td>{book.due_date ? book.due_date.slice(0, 10) : "-"}</td>
                  <td>{book.return_date ? book.return_date.slice(0, 10) : "-"}</td>
                  <td className={book.status?.toLowerCase() || "unknown"}>
                    {book.status || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
