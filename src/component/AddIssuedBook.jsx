import React, { useState, useEffect } from "react";
import AdminSidebar from "./adminslidebar";
import "../component/AddIssuedBook.css";
import BookService from "../services/dataservice";

const AddIssuedBook = () => {
  const [bookId, setBookId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    BookService.saveviewBook()
      .then((res) => {
        if (Array.isArray(res.data.BookList)) {
          setBooks(res.data.BookList);
        } else {
          setBooks([]);
        }
      })
      .catch((err) => {
        console.error("❌ Failed to load books:", err);
        setMsg("❗ Failed to load books.");
        setMsgType("error");
      });

    refreshStudents();
  }, []);

  const refreshStudents = () => {
    BookService.saveviewStudent()
      .then((res) => {
        if (Array.isArray(res.data.studentList)) {
          setStudents(res.data.studentList);
        } else {
          setStudents([]);
          setMsg("❗ Student list is empty or unexpected format.");
          setMsgType("error");
        }
      })
      .catch((err) => {
        console.error("❌ Failed to refresh students:", err);
        setMsg("❗ Failed to refresh students.");
        setMsgType("error");
      });
  };

  const handleBookSelect = (e) => {
    setBookId(e.target.value);
  };

  const handleStudentSelect = (e) => {
    setStudentId(e.target.value);
  };

  const validateForm = () => {
    if (!bookId.trim() || !studentId.trim() || !status.trim()) {
      setMsg("❗ All required fields must be filled.");
      setMsgType("error");
      return false;
    }
    return true;
  };

  const handleIssue = () => {
    if (!validateForm()) return;

    BookService.saveIssuedBook({
      book_id: bookId,
      student_id: studentId,
      return_date: returnDate,
      status,
    })
      .then(() => {
        setMsg("✅ Book issued successfully!");
        setMsgType("success");
        setBookId("");
        setStudentId("");
        setReturnDate("");
        setStatus("");
      })
      .catch((err) => {
        console.error(err);
        setMsg(err.message || "❗ Error issuing book.");
        setMsgType("error");
      });
  };

  const handleClear = () => {
    setBookId("");
    setStudentId("");
    setReturnDate("");
    setStatus("");
    setMsg("✅ Form cleared.");
    setMsgType("success");
  };

  return (
    <div className="issue-book-container">
      <AdminSidebar />
      <div className="issue-book-form">
        <h2>Add Issue Book</h2>
        <br />

        {/* Book Dropdown */}
        <label>Select Book:</label>
        <div className="select-wrapper book-select">
          <select value={bookId} onChange={handleBookSelect}>
            <option value="">Select Book</option>
            {books.map((book) => (
              <option key={book.book_id} value={book.book_id}>
                {book.book_title}
              </option>
            ))}
          </select>
        </div>
        <br />

        {/* Student Dropdown */}
        <label>Select Student:</label>
        <div className="select-wrapper student-select">
          <select value={studentId} onChange={handleStudentSelect}>
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.student_id} value={student.student_id}>
                {student.student_name}
              </option>
            ))}
          </select>
        </div>
        <br />

        {/* Return Date */}
        <label>Return Date:</label>
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
        <br />

        {/* Status Dropdown */}
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="issued">Issued</option>
          <option value="returned">Returned</option>
        </select>
        <br />

        {/* Buttons */}
        <div className="buttons">
          <button className="bttn" onClick={handleIssue}>
            Issue Book
          </button>
          <button className="btnn" onClick={handleClear}>
            Clear
          </button>
        </div>

        {/* Message */}
        {msg && (
          <div className={`message ${msgType === "error" ? "error" : "success"}`}>
            <p>{msg}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddIssuedBook;