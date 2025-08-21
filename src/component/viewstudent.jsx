import React, { useEffect, useState } from "react";
import DataService from "../services/dataservice";
import "./viewstudent.css";
import AdminSidebar from "./adminslidebar";

export default function Viewstudent() {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isSearching, setIsSearching] = useState(false);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  // Fetch all students
  const fetchStudents = (page) => {
    setLoading(true);
    DataService.saveviewStudent(page, 1)
      .then((res) => {
        const data = res.data;
        setStudents(data.studentList || []);
        setCurrentPage(data.currentPage || 1);
        setTotalPages(data.totalPages || 1);
      })
      .catch((error) => {
        console.error("Failed to fetch students:", error);
        showMessage("Failed to fetch students", "error");
      })
      .finally(() => setLoading(false));
  };

  // Search students
  const handleSearch = (term, page = 1) => {
    if (!term.trim()) {
      setIsSearching(false);
      fetchStudents(page);
      return;
    }

    setLoading(true);
    setIsSearching(true);

    DataService.searchStudent(term, page, 6)
      .then((res) => {
        const data = res.data;
        setStudents(data.studentList || []);
        setCurrentPage(data.currentPage || 1);
        setTotalPages(data.totalPages || 1);
      })
      .catch((error) => {
        console.error("Failed to search students:", error);
        showMessage("Failed to search students", "error");
      })
      .finally(() => setLoading(false));
  };

  // Initial load
  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  // Auto search when typing
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(searchTerm, 1); // reset to first page when typing
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // Delete student
  const handleDelete = (id) => {
    setLoading(true);
    DataService.savedeletestudent(id)
      .then(() => {
        showMessage("Student deleted successfully!", "success");
        if (isSearching) {
          handleSearch(searchTerm, currentPage);
        } else {
          fetchStudents(currentPage);
        }
      })
      .catch((error) => {
        console.error("Failed to delete student:", error);
        showMessage("Failed to delete student", "error");
      })
      .finally(() => setLoading(false));
  };

  const handleUpdate = (id) => {
    console.log("Update student with id:", id);
    // Add your update logic here
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      if (isSearching) {
        handleSearch(searchTerm, currentPage - 1);
      } else {
        setCurrentPage((prev) => prev - 1);
      }
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      if (isSearching) {
        handleSearch(searchTerm, currentPage + 1);
      } else {
        setCurrentPage((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="main13">
      <AdminSidebar />
      <div className="student-container">
        <h3 className="student-title">Student List</h3>

        {/* 🔎 Search bar with Clear button inside */}
        <div className="search-bar1">
          <input
            type="text"
            placeholder="Search by name, email, or year..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              className="clear-btn"
              onClick={() => {
                setSearchTerm("");
                setIsSearching(false);
                fetchStudents(1);
              }}
            >
               ×
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-center">Loading students...</p>
        ) : (
          <>
            <table className="student-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Study Year</th>
                  <th>Created At</th>
                  <th>Delete</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <tr key={student.student_id}>
                      <td>{(currentPage - 1) * 6 + index + 1}</td>
                      <td>{student.student_name}</td>
                      <td>{student.student_email}</td>
                      <td>{student.student_password}</td>
                      <td>{student.study_year}</td>
                      <td>{student.created_at?.substring(0, 10)}</td>
                      <td>
                        <button
                          className="link-button"
                          onClick={() => handleDelete(student.student_id)}
                        >
                          🗑️
                        </button>
                      </td>
                      <td>
                        <button
                          className="link-button"
                          onClick={() => handleUpdate(student.student_id)}
                        >
                          ✍️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination-boxed">
              <button onClick={handlePrev} disabled={currentPage === 1}>
                Prev
              </button>
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() =>
                      isSearching
                        ? handleSearch(searchTerm, page)
                        : setCurrentPage(page)
                    }
                    className={page === currentPage ? "active" : ""}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>

            {message && (
              <div className={`custom-message1 ${messageType}`}>{message}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
