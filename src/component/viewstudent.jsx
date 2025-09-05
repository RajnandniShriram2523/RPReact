import React, { useEffect, useState} from "react";
import DataService from "../services/dataservice";
import { NavLink } from "react-router-dom";
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

  const PAGE_LIMIT = 5;

  // Show temporary messages
  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  // Fetch students from backend
  const fetchStudents = (page = 1) => {
    setLoading(true);
    DataService.saveviewStudent(page, PAGE_LIMIT)
      .then((res) => {
        const data = res.data;
        setStudents(data.studentList || []);
        setCurrentPage(data.currentPage || 1);
        setTotalPages(data.totalPages || 1);

        if (!data.studentList || data.studentList.length === 0) {
          showMessage("No students found", "info");
        }
      })
      .catch(() => showMessage("", "error"))
      .finally(() => setLoading(false));
  };

  // Search students by term
  const handleSearch = (term, page = 1) => {
    if (!term.trim()) {
      setIsSearching(false);
      fetchStudents(1);
      return;
    }

    setLoading(true);
    setIsSearching(true);

    DataService.searchStudent(term, page, PAGE_LIMIT)
      .then((res) => {
        const data = res.data;
        setStudents(data.studentList || []);
        setCurrentPage(data.currentPage || 1);
        setTotalPages(data.totalPages || 1);

        if (!data.studentList || data.studentList.length === 0) {
          showMessage("No students found", "info");
        }
      })
      .catch((error) => {
        console.error("Search error:", error);
        showMessage("Failed to search students", "error");
      })
      .finally(() => setLoading(false));
  };

  // Delete student
  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.student_id !== id));
    DataService.savedeletestudent(id)
      .then(() => {
        showMessage("Student deleted successfully!", "success");
        isSearching ? handleSearch(searchTerm, currentPage) : fetchStudents(currentPage);
      })
      .catch(() => {
        showMessage("Failed to delete student", "error");
        fetchStudents(currentPage);
      });
  };

  // Update student (stub)
  const handleUpdate = (id) => {
    console.log("Update student clicked, ID:", id);
  };

  // Pagination handlers
  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      isSearching ? handleSearch(searchTerm, newPage) : setCurrentPage(newPage);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      isSearching ? handleSearch(searchTerm, newPage) : setCurrentPage(newPage);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  // Auto search on typing with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(searchTerm, 1);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="main13">
      <AdminSidebar />
      <div className="student-container">
        <h3 className="student-title">Student List</h3>

        <div className="search-bar1">
          <input
            type="text"
            placeholder="Search by name or email..."
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
                      <td>{(currentPage - 1) * PAGE_LIMIT + index + 1}</td>
                      <td>{student.student_name}</td>
                      <td>{student.student_email}</td>
                      <td>{student.study_year}</td>
                      <td>{student.created_at?.substring(0, 10)}</td>
                      <td>
                        <button className="link-button" onClick={() => handleDelete(student.student_id)}>🗑️</button>
                      </td>
                      <td>
                         <NavLink
  to={`/updatestudent/${student.student_id}`}
  className="link-button"
>
  ✍️
</NavLink>
  </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination-boxed">
              <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => (isSearching ? handleSearch(searchTerm, page) : setCurrentPage(page))}
                    className={page === currentPage ? "active" : ""}
                  >
                    {page}
                  </button>
                );
              })}
              <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
            </div>

            {message && <div className={`custom-message12 ${messageType}`}>{message}</div>}
          </>
        )}
      </div>
    </div>
  );
}
